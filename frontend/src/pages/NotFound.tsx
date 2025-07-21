import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <a href="/" className="text-coral hover:text-coral-dark font-medium transition-colors">
          Return to Home
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
