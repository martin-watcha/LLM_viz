# src/config/

## models.js
Single source of truth for all model metadata displayed on HomeScreen.

```js
export const MODELS = [
  {
    id: 'rnn',           // matches folder name under src/models/ and route key in App.jsx
    name: 'Vanilla RNN',
    desc: '...',
    icon: <Activity />,  // lucide-react, 24px
    ready: true,         // false → PlaceholderView; true → full model view
  },
];
```

- `id` must match the `src/models/{id}/` folder name exactly
- Keep `ready: false` during development; flip to `true` only when the view is complete
- No model data (params, step arrays) here — metadata only
