import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const Home = lazy(() => import('./pages/Home'))
const Discover = lazy(() => import('./pages/Discover'))
const HimachalPage = lazy(() => import('./pages/HimachalPage'))
const BaliPage = lazy(() => import('./pages/BaliPage'))
const BackupHome = lazy(() => import('./pages/BackupHome'))
const TripDetails = lazy(() => import('./pages/TripDetails'))
const About = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.About })))
const Community = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.Community })))
const Wishlist = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.Wishlist })))
const CruisePage = lazy(() => import('./pages/CruisePage'))
const CustomizeTrip = lazy(() => import('./pages/CustomizeTrip'))
const CorporateTours = lazy(() => import('./pages/CorporateTours'))
const UserDashboard = lazy(() => import('./pages/UserDashboard'))
const Login = lazy(() => import('./pages/Login'))
const Credits = lazy(() => import('./pages/Credits'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const EditTrip = lazy(() => import('./pages/admin/EditTrip'))
const EditHero = lazy(() => import('./pages/admin/EditHero'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))

const RouteFallback = () => (
  <div className="flex min-h-[60svh] items-center justify-center bg-charcoal px-5 text-center text-sm font-medium text-white/60" role="status">
    Loading your next journey...
  </div>
)

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen selection:bg-secondary/30 w-full overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <main className="flex-grow w-full">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/packages" element={<Discover />} />
            <Route path="/cruise" element={<CruisePage />} />
            <Route path="/cruises" element={<CruisePage />} />
            <Route path="/cruises/:id" element={<TripDetails />} />
            <Route path="/customize" element={<CustomizeTrip />} />
            <Route path="/corporate" element={<CorporateTours />} />
            <Route path="/himachal" element={<HimachalPage />} />
            <Route path="/bali" element={<BaliPage />} />
            <Route path="/backup" element={<BackupHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/hero" element={<EditHero />} />
            <Route path="/admin/edit/:id" element={<EditTrip />} />
            <Route path="/admin/new" element={<EditTrip />} />
          </Routes>
        </main>
        <WhatsAppButton />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
