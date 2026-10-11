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
