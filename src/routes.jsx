import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from './layouts/AppLayout';
import ScrollToTop from './components/ScrollToTop';
import PawLoader from './components/PawLoader';

// Lazy load page components for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Chat = lazy(() => import('./pages/Chat'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const VetFinder = lazy(() => import('./pages/VetFinder'));
const FileUpload = lazy(() => import('./pages/FileUpload'));

export default function AppRoutes() {
  // Create a router with data router capabilities
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <AppLayout />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PawLoader message="Loading paw-some content..." size="lg" />}>
              <Landing />
            </Suspense>
          )
        },
        {
          path: "chat",
          element: (
            <Suspense fallback={<PawLoader message="Preparing chat..." size="lg" />}>
              <Chat />
            </Suspense>
          )
        },
        {
          path: "symptoms",
          element: (
            <Suspense fallback={<PawLoader message="Loading symptom checker..." size="lg" />}>
              <SymptomChecker />
            </Suspense>
          )
        },
        {
          path: "vets",
          element: (
            <Suspense fallback={<PawLoader message="Finding vets near you..." size="lg" />}>
              <VetFinder />
            </Suspense>
          )
        },
        {
          path: "files",
          element: (
            <Suspense fallback={<PawLoader message="Loading file uploader..." size="lg" />}>
              <FileUpload />
            </Suspense>
          )
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
