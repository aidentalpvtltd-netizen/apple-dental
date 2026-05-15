# Lenis Smooth Scrolling

This project uses Lenis through `src/hooks/useLenisSmoothScroll.js`.

## Integration

The hook is mounted once from `src/App.jsx`:

```jsx
useLenisSmoothScroll({ enabled: !isAdminPath })
```

The admin dashboard keeps native scrolling because it contains dense forms, tables, and nested support-chat panels. Public pages use Lenis for subtle smooth wheel and anchor scrolling.

## Behavior

- Uses Lenis with a short `0.9s` duration and cubic easing for natural motion.
- Keeps anchor links working through Lenis `anchors`.
- Respects `prefers-reduced-motion: reduce` by not starting Lenis.
- Cleans up the animation frame and destroys the Lenis instance on unmount.
- Leaves nested interactive regions native through the hook's `prevent` callback.

## Native Scroll Escape Hatch

Add `data-lenis-prevent` to any future scrollable panel that should remain fully native:

```jsx
<div data-lenis-prevent>...</div>
```

Use this for modals, chat panels, custom scroll containers, or complex form regions.

## Notes

This repository is a Vite React app. If this same hook is moved into a Next.js App Router project, keep it in a client component and call it from a client wrapper mounted inside `app/layout.jsx`.
