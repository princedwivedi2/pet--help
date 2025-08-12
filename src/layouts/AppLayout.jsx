import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define navigation pages
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Symptoms', path: '/symptoms' },
    { name: 'Vet Finder', path: '/vets' },
    { name: 'Files', path: '/files' }
  ];
  
  // Determine active page based on current location
  const activePage = pages.findIndex(p => p.path === location.pathname);
  
  // Handle page navigation
  const handlePageChange = (index) => {
    navigate(pages[index].path);
  };
  
  // Handle emergency button click
  const handleEmergencyClick = () => {
    // If you have an emergency page, navigate to it
    navigate('/emergency');
  };

  return (
    <div className="relative min-h-screen">
      {/* Decorative background – no interactions */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* gradient/paw layers live here */}
      </div>

      <Header 
        pages={pages} 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        onEmergencyClick={handleEmergencyClick}
        className="relative z-50" 
      />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
