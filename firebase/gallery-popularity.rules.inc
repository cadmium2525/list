    // Gallery-only aggregate counters. Existing game rules stay unchanged.
    match /galleryPopularity/v1 {
      function galleryProject(slug) {
        return slug in [
          'sumaraku', '-mic', 'rakugaction', 'punching', 'tomoshibi',
          'aurapuzzle_-adventure', 'monster_collection', 'sumamama',
          'endless_monsters', 'infographic', 'giftntool', 'C_tools',
          'souiuimi', 'kanji-tower', 'leaf-stream-race', 'guchitter', 'mato',
          'BOUNCEPARADE', 'garbage-truck', 'senju-otedama'
        ];
      }

      // Shift UTC by nine hours before taking the calendar date (Japan time).
      function galleryDay() {
        return string((request.time + duration.value(9, 'h')).date().toMillis());
      }

      function galleryCounterPath(slug) {
        return /databases/$(database)/documents/galleryPopularity/v1/projects/$(slug);
      }

      function galleryReceiptPath(slug) {
        let day = galleryDay();
        let openId = slug + '_' + request.auth.uid;
        return /databases/$(database)/documents/galleryPopularity/v1/receipts/$(day)/opens/$(openId);
      }

      function galleryOwnReceipt(openId) {
        let uid = request.auth.uid;
        return openId in [
          'sumaraku_' + uid, '-mic_' + uid, 'rakugaction_' + uid,
          'punching_' + uid, 'tomoshibi_' + uid, 'aurapuzzle_-adventure_' + uid,
          'monster_collection_' + uid, 'sumamama_' + uid,
          'endless_monsters_' + uid, 'infographic_' + uid,
          'giftntool_' + uid, 'C_tools_' + uid,
          'souiuimi_' + uid, 'kanji-tower_' + uid, 'leaf-stream-race_' + uid,
          'guchitter_' + uid, 'mato_' + uid, 'BOUNCEPARADE_' + uid,
          'garbage-truck_' + uid, 'senju-otedama_' + uid
        ];
      }

      function galleryFreshReceipt(slug) {
        let receipt = galleryReceiptPath(slug);
        return !exists(receipt)
          && existsAfter(receipt)
          && getAfter(receipt).data.keys().hasOnly(['slug', 'uid', 'openedAt'])
          && getAfter(receipt).data.slug == slug
          && getAfter(receipt).data.uid == request.auth.uid
          && getAfter(receipt).data.openedAt == request.time;
      }

      function galleryValidCounter(slug) {
        return request.auth != null
          && galleryProject(slug)
          && request.resource.data.keys().hasOnly(['count', 'updatedAt'])
          && request.resource.data.count is int
          && request.resource.data.count >= 1
          && request.resource.data.count <= 9007199254740991
          && request.resource.data.updatedAt == request.time
          && galleryFreshReceipt(slug);
      }

      match /projects/{slug} {
        allow get, list: if true;
        allow create: if galleryValidCounter(slug)
          && request.resource.data.count == 1;
        allow update: if galleryValidCounter(slug)
          && request.resource.data.count == resource.data.count + 1;
        allow delete: if false;
      }

      match /receipts/{day}/opens/{openId} {
        // An absent document can also be checked by its own deterministic ID.
        allow get: if request.auth != null && galleryOwnReceipt(openId);
        allow list, update, delete: if false;
        allow create: if request.auth != null
          && day == galleryDay()
          && request.resource.data.keys().hasOnly(['slug', 'uid', 'openedAt'])
          && galleryProject(request.resource.data.slug)
          && request.resource.data.uid == request.auth.uid
          && openId == request.resource.data.slug + '_' + request.auth.uid
          && request.resource.data.openedAt == request.time
          && getAfter(galleryCounterPath(request.resource.data.slug)).data.updatedAt == request.time
          && getAfter(galleryCounterPath(request.resource.data.slug)).data.count
            == (exists(galleryCounterPath(request.resource.data.slug))
              ? get(galleryCounterPath(request.resource.data.slug)).data.count + 1
              : 1);
      }
    }
