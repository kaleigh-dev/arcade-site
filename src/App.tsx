import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-bgPrimary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              Business
            </Link>
            <div className="flex gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Local Business. Built with Vite, React Router & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
