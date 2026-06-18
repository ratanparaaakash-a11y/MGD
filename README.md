# Cinematic 3D Model Showcase

This is a Next.js and Three.js cinematic character showcase using the provided GLB model:

```text
public/models/pixellabs-robot-3332.glb
```

The original model file remains untouched at:

```text
Assets/Models/pixellabs-robot-3332.glb
```

## Run The Site

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL printed by Next.js, usually:

```text
http://localhost:3000
```

## Controls

- Drag with mouse or touch to rotate the model.
- Use the mouse wheel to zoom.
- Use **Rotate On/Off** to toggle automatic rotation.
- Use **Zoom In** and **Zoom Out** for controlled camera distance changes.
- Use **Idle Pose** and **Action Pose** to trigger matching animation clips if the GLB contains them.

If the model has no animation clips, the buttons remain safe and do not break the scene.

## Replacing The Model

To use a different legally owned model, place it in:

```text
public/models/
```

Then update `MODEL_PATH` in:

```text
components/ShowcaseScene.tsx
```

For example:

```ts
const MODEL_PATH = "/models/my-character.glb";
```

## Project Notes

- This is a website project, not Unity.
- The WhatsApp video was treated as a style reference only and is not embedded.
- No external copyrighted model assets are downloaded by this project.
- The page is designed as the first-screen experience: a full cinematic 3D showcase rather than a landing page.
