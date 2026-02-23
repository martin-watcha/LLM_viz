# src/

## App.jsx — Routing Only
Holds `currentView` state and renders the correct view. No business logic, no data.

```jsx
if (currentView === 'home') return <HomeScreen onSelect={setCurrentView} />;
if (currentView === 'rnn')  return <RNNView onBack={handleBackToHome} />;
// unfinished models:
const model = MODELS.find(m => m.id === currentView);
return <PlaceholderView model={model} onBack={handleBackToHome} />;
```

## Structure
```
src/
├── App.jsx
├── config/          # models.js — model metadata
├── components/      # shared UI primitives + model-agnostic screens
└── models/          # feature-based: one folder per model
```

## Adding a Route
1. Import the View from `models/{name}/index.jsx`
2. Add one `if (currentView === '{name}')` block
3. Set `ready: true` in `config/models.js`
