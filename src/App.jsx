import { useState } from 'react';
import { MODELS } from './config/models';
import HomeScreen from './components/HomeScreen';
import PlaceholderView from './components/PlaceholderView';
import RNNView from './models/rnn/index';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleBackToHome = () => setCurrentView('home');

  if (currentView === 'home') return <HomeScreen onSelect={setCurrentView} />;
  if (currentView === 'rnn')  return <RNNView onBack={handleBackToHome} />;

  const selectedModel = MODELS.find(m => m.id === currentView);
  return <PlaceholderView model={selectedModel} onBack={handleBackToHome} />;
}
