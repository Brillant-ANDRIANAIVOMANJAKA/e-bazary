import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

const NotFound = () => (
  <>
    <main className="container-x py-24 text-center">
      <p className="text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary btn-md"><Home className="h-4 w-4" /> Back to home</Link>
        <Link to="/shop" className="btn btn-outline btn-md">Browse products <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </main>
  </>
);

export default NotFound;
