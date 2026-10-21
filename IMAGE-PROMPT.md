# Hero illustration generation

Mode: Built-in image_gen tool (single generation, no reference images).

Generated as PNG; optimised deployment asset: `dist/assets/atelier-hero.webp`.

## Final prompt

Use case: stylized-concept
Asset type: landscape 3:2 website hero illustration for a Japanese creative browser games and tools portfolio, “CADMIUM あそびのアトリエ”. The name is context only and must NOT appear in the image.
Primary request: a premium playful sculptural 3D game diorama arranged as a thoughtfully composed asymmetrical still life.
Scene/backdrop: seamless warm ivory background #f5f3ec and an ivory floor, with cream geometric display plinths of varied heights.
Subject: a chunky matte blue-lavender game controller, a bright yellow pencil, one tiny friendly mint blob creature with a simple face, a red-orange softly glowing crystal, and violet rounded puzzle blocks, balanced and arranged on the cream geometric plinths. This is an original symbolic representation of creative browser games and tools, not a scene from an existing game.
Style/medium: high-end tactile 3D illustration; premium ceramic and clay materials, subtly textured matte surfaces, beautifully rounded edges.
Composition/framing: landscape 3:2. Elevated three-quarter camera view. Asymmetrical but balanced still-life composition, all objects completely visible with generous breathing room around the scene; do not crop objects.
Lighting/mood: warm soft studio lighting, realistic soft shadows, sophisticated yet friendly and imaginative.
Color palette: warm ivory, blue-lavender, mint green, yellow, violet and red-orange.
Constraints: single image. No text, typography, lettering, logos, watermark or user interface.

## ラクガキ大乱闘 cover

Mode: Built-in image_gen tool (single generation, no reference images).

Generated as PNG; optimised deployment asset: `dist/assets/sumaraku-cover.webp`.

### Final prompt

Use case: stylized-concept
Asset type: original landscape 3:2 raster card cover for a Japanese browser game, ラクガキ大乱闘, where hand-drawn doodles become 3D fighters and battle a CPU. Game title is context only; no lettering appears in the art.
Primary request: a playful premium clay 3D arena with two charming child-drawn doodle fighters facing off: one blue round scribbly horned blob, and one yellow box-shaped quirky pencil-sketch robot.
Subject details: thick irregular doodle strokes are visibly incorporated into their sculptural bodies, including confident childlike sketch contours and scribbly surface lines. Friendly exaggerated poses suggest a lively CPU battle; a small energetic combat spark floats between them. Both fighters are distinctly original and adorable.
Scene/backdrop: a low simple rounded cream arena platform against a warm pastel mint background. Minimal props, clean visual storytelling.
Style/medium: high-end tactile clay and ceramic 3D illustration, rounded edges, subtly textured matte materials, visibly artistic thick doodle lines. Visually consistent with a sophisticated creative atelier portfolio.
Composition/framing: landscape 3:2, bold lively asymmetrical composition, elevated three-quarter camera, two fighters clearly readable and completely visible with breathing room.
Lighting/mood: soft warm studio lighting and realistic soft shadows; playful and artistic combat energy.
Color palette: blue, yellow, warm pastel mint, cream, with a tiny orange combat spark.
Constraints: single image. No text, lettering, logo, watermark or user interface. No weapons or gore.

## Replacement card covers — 2026-10-11

Deployment assets: `dist/assets/sumamama-cover.webp`, `dist/assets/giftntool-cover.webp`, `dist/assets/c-tools-cover-v2.webp`. Each resized to 960 × 640 and compressed as WebP quality 83.

# Replacement card cover prompts

Mode: Built-in image_gen tool. Three independent single-image generation calls, run in parallel. No references, no CLI and no image edits.

All selected outputs: 1536 × 1024 pixels (landscape 3:2). Main objects visually checked for a centered 1.7:1 card crop.

## sumamama

Saved image: `artifacts/generated/sumamama-cover.png`

### Exact final prompt

```text
Use case: stylized-concept
Asset type: original landscape 3:2 illustration for a polished Japanese creative atelier portfolio card.
Style/medium: premium tactile clay and ceramic 3D illustration, matte subtly textured surfaces and softly rounded edges; sophisticated playful still-life styling consistent with an ivory atelier diorama.
Lighting/mood: warm soft studio light, beautiful realistic soft shadows, calm clean refined atmosphere.
Composition/framing: landscape 3:2. Elevated three-quarter camera. Keep EVERY main object, its silhouette and the cream stage or tabletop entirely within the central 80% of the image width and the central 70% of the image height. Leave generous unobstructed background at top and bottom so a centered 1.7:1 website card crop will not cut off any important object. No close-up, no cropped silhouettes.
Constraints: an original symbolic illustration, clearly illustration rather than a screenshot. No text, letters, digits, logos, watermarks or fake user interfaces. No brand characters.
Primary request: a delightful miniature scene symbolizing a browser 3D fighting game. An original cute purple fighter with two long rounded upright ears faces an original round yellow robot on a small cream arena stage, both in playful energetic fighting poses.
Subject details: the purple character has a compact soft round body, tiny mitten fists and short feet, with a friendly determined expression. The robot has a spherical yellow body, small rounded arms and legs and a simple charming face; no display or screen. Their fists are lifted but their bodies remain separated, with a tiny coral-orange cartoon combat spark floating between them. Make them feel like handmade ceramic collectibles. Both full figures including ears and feet are clearly visible.
Scene/backdrop: a low rounded cream circular stage, seamless pale mint studio backdrop and floor. Very minimal scene with no extra props.
Color palette: warm ivory and pale mint, lavender-purple, buttery yellow and a tiny coral-orange spark.
Avoid: weapons, gore, aggression or scary expressions, cropped ears or feet.
```

## giftntool

Saved image: `artifacts/generated/giftntool-cover.png`

### Exact final prompt

```text
Use case: stylized-concept
Asset type: original landscape 3:2 illustration for a polished Japanese creative atelier portfolio card.
Style/medium: premium tactile clay and ceramic 3D illustration, matte subtly textured surfaces and softly rounded edges; sophisticated playful still-life styling consistent with an ivory atelier diorama.
Lighting/mood: warm soft studio light, beautiful realistic soft shadows, calm clean refined atmosphere.
Composition/framing: landscape 3:2. Elevated three-quarter camera. Keep EVERY main object, its silhouette and the cream stage or tabletop entirely within the central 80% of the image width and the central 70% of the image height. Leave generous unobstructed background at top and bottom so a centered 1.7:1 website card crop will not cut off any important object. No close-up, no cropped silhouettes.
Constraints: an original symbolic illustration, clearly illustration rather than a screenshot. No text, letters, digits, logos, watermarks or fake user interfaces. No brand characters.
Primary request: a charming miniature symbolic scene for a monster raising ancestor-combination and compatibility calculation tool. One small friendly red dragon and one golden star stand beside three rounded ancestry medallions connected by soft curved raised clay lines.
Subject details: an original adorable red-orange baby dragon with rounded small horns, tiny soft wings, short tail and friendly face sits on a cream miniature plinth. Beside it a chunky golden five-point star rests upright. Three cream round medallions with simple sculpted original creature symbols (tiny paw, gentle dragon silhouette, small leaf) form a loose flowing lineage arrangement, connected by smooth thin mint clay curves like a family tree. These are physical ceramic objects rather than an interface or chart; use no written labels. Every object including the tail and connecting lines is clearly visible.
Scene/backdrop: warm pale lavender seamless studio background with cream floor and minimal low cream plinths.
Color palette: warm ivory, pale lavender, soft mint, red-orange dragon and warm golden yellow.
Avoid: busy diagram, screens, technical widgets, any written symbols or game screenshots.
```

## c-tools

Saved image: `artifacts/generated/c-tools-cover.png`

### Exact final prompt

```text
Use case: stylized-concept
Asset type: original landscape 3:2 illustration for a polished Japanese creative atelier portfolio card.
Style/medium: premium tactile clay and ceramic 3D illustration, matte subtly textured surfaces and softly rounded edges; sophisticated playful still-life styling consistent with an ivory atelier diorama.
Lighting/mood: warm soft studio light, beautiful realistic soft shadows, calm clean refined atmosphere.
Composition/framing: landscape 3:2. Elevated three-quarter camera. Keep EVERY main object, its silhouette and the cream stage or tabletop entirely within the central 80% of the image width and the central 70% of the image height. Leave generous unobstructed background at top and bottom so a centered 1.7:1 website card crop will not cut off any important object. No close-up, no cropped silhouettes.
Constraints: an original symbolic illustration, clearly illustration rather than a screenshot. No text, letters, digits, logos, watermarks or fake user interfaces. No brand characters.
Primary request: an elegant organized still-life of creative monster-raising support tools, symbolizing inheritance records, calculation and image analysis.
Subject details: a closed matte lavender notebook with one simple embossed golden star on the cover; a cute rounded mint physical calculator with tactile rounded blank cream buttons and a simple unmarked recessed dark display; a chunky cream-and-lavender magnifying glass with a transparent glass lens; several thick golden star-shaped tokens. Arrange these objects neatly on low cream geometric tabletop plinths, with harmonious spacing and a slightly playful asymmetry. Notebook, calculator, magnifying glass and all tokens are entirely visible. It should feel like a handmade clay desktop tool collection. The physical calculator buttons and display contain NO numbers, letters or interface graphics.
Scene/backdrop: seamless warm ivory studio backdrop and cream tabletop, with subtle pale mint geometric accents.
Color palette: warm ivory, mint, lavender and golden yellow.
Avoid: screens with interface graphics, writing on the notebook, numbers on calculator buttons, clutter.
```


## 2026-10-21 追加作品のイメージイラスト

Mode: built-in image_gen。既存のアトリエのマットな粘土・陶器のミニチュア表現に合わせて新規生成。横長3:2のPNG原本をワークスペースに保存し、960×640・quality82のWebPに軽量化しました。

### kanji-tower

配信用: `dist/assets/kanji-tower-cover.webp`

PNG原本: `artifacts/generated-2026-10-21/kanji-tower-cover.png`

最終プロンプト:

```text
Use case: stylized-concept
Asset type: editorial artwork for a Japanese indie-game gallery card, landscape 3:2.
Primary request: a refined playful miniature still life illustrating a physics puzzle where actual solid kanji letters are stacked.
Scene/backdrop: matte pastel sky-blue seamless studio background, warm cream circular ceramic plinth.
Subject: an unstable small tower built from thick extruded navy-blue kanji glyph-shaped sculptures, with exactly these recognizable Japanese characters: 「口」「田」「山」. Beside the top, one separate 「日」 glyph sculpture is just about to fall into the tower. Each glyph is a physical cut-out silhouette with true hollow openings, not a character printed on a cube. Use simple accurate block-style kanji forms so they remain legible, especially 田 with its cross and 山 with its three vertical strokes and bottom join.
Style/medium: premium handcrafted matte clay/ceramic miniature 3D, softly rounded edges, fine subtle tactile texture, tasteful whimsical still life.
Composition/framing: centered, fully visible subject and plinth. All important objects fit inside the central 80% of the frame width and central 70% of frame height, with generous empty margin at the top, bottom and sides, suitable for a centered 1.7:1 crop. Small three-quarter viewing angle that preserves the kanji front faces.
Lighting/mood: soft studio daylight, gentle grounded shadows, calm airy cheerful mood.
Color palette: deep navy glyphs, pastel sky blue background, cream plinth, one tiny restrained buttery-yellow accent.
Constraints: only kanji-shaped sculptures and plinth, no screenshots, no interface, no title, no additional text, no logos, no watermark, no humans.
```

### leaf-stream

配信用: `dist/assets/leaf-stream-cover.webp`

PNG原本: `artifacts/generated-2026-10-21/leaf-stream-cover.png`

最終プロンプト:

```text
Use case: stylized-concept
Asset type: editorial artwork for a Japanese indie-game gallery card, landscape 3:2.
Primary request: a quiet rural miniature illustrating a 3D leaf race, with real natural leaves floating together in a narrow water channel.
Scene/backdrop: generous pale mint and warm cream seamless studio space, a short carefully crafted concrete irrigation channel in a small countryside diorama.
Subject: one small green leaf and one small orange leaf floating side by side, each clearly a natural leaf with a stem and subtle veins, on clear translucent pale-blue flowing water. Gentle visible stream lines around the leaves. A few small stones and restrained tufts of grass around the little channel; keep leaves as the focus.
Style/medium: refined handmade matte clay/ceramic miniature 3D, rounded concrete edges, softly tactile surfaces, water clean and slightly translucent, premium airy craft still life.
Composition/framing: all important subjects entirely in the central 80% width and central 70% height, centered composition and generous uncluttered background margins suitable for a centered 1.7:1 crop. Slight elevated three-quarter view lets us see leaves and stream clearly. The whole small channel segment stays inside the frame.
Lighting/mood: soft studio daylight and delicate shadows, serene pastoral atmosphere.
Color palette: pastel mint, warm cream, pale blue water, natural soft green and orange leaves.
Constraints: no birds, no boats, no people, no lettering, no logos, no watermark, no screenshots or interface. Do not stylize the leaves into boats or characters.
```

### mato

配信用: `dist/assets/mato-cover.webp`

PNG原本: `artifacts/generated-2026-10-21/mato-cover.png`

最終プロンプト:

```text
Use case: stylized-concept
Asset type: editorial artwork for a Japanese indie-game gallery card, landscape 3:2.
Primary request: a tasteful cute miniature illustration for a comic action game about a little target moving inside a urinal.
Scene/backdrop: a tiny wall section of pale-blue and white tiles on a warm cream studio stage, generous soft pale-blue/cream negative space.
Subject: a clean white miniature wall-mounted urinal, fully visible and centered. A small circular red-and-white bullseye target sits low on the INNER back wall of the bowl. The target tilts slightly as though dodging sideways, suggested by just two restrained curved motion marks. Target is distinct and easy to see inside the bowl.
Style/medium: premium handmade matte clay/ceramic miniature 3D, smooth rounded white ceramic, fine tactile miniature quality, charming restrained humor, polished editorial artwork.
Composition/framing: the urinal and complete target fit inside central 80% of image width and central 70% of image height. Fully visible miniature wall and cream base with generous margins for centered 1.7:1 crop. Front three-quarter view that shows inner bowl clearly.
Lighting/mood: soft bright studio lighting and gentle shadows, pristine welcoming playful atmosphere.
Color palette: white and pale blue with cream, a single small red-and-white target.
Constraints: no people, no body parts, no bodily fluids, no stains or dirt, no text, no title, no logos, no watermarks, no screenshots, no pseudo-UI. No visible stream or liquid. Entire image clean and understated.
```
