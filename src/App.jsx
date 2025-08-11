import './App.css';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import SymptomChecker from './pages/SymptomChecker';
import VetFinder from './pages/VetFinder';
import FileUpload from './pages/FileUpload';
import AlertOverlay from './components/AlertOverlay';
import Header from './components/Header';
import { useState } from 'react';

const pages = [
  { name: 'Home', component: Landing },
  { name: 'Chat', component: Chat },
  { name: 'Symptoms', component: SymptomChecker },
  { name: 'Vet Finder', component: VetFinder },
  { name: 'Upload', component: FileUpload },
];

export default function App() {
  const [page, setPage] = useState(0);
  const [alert, setAlert] = useState(false);
  const PageComponent = pages[page].component;

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Header 
        pages={pages} 
        activePage={page} 
        onPageChange={setPage} 
        onEmergencyClick={() => setAlert(true)} 
      />
      <main className="pt-24">
        <PageComponent />
      </main>
      <AlertOverlay show={alert} onClose={() => setAlert(false)} />
    </div>
  );
}
