import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import SymptomChecker from './pages/SymptomChecker';
import VetFinder from './pages/VetFinder';
import FileUpload from './pages/FileUpload';
import ScrollToTop from './components/ScrollToTop';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/vets" element={<VetFinder />} />
        <Route path="/files" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
