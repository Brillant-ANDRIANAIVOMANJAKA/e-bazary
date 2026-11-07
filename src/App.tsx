import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SearchProvider } from "@/context/SearchContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { ScrollManager } from "@/components/common/ScrollManager";
import { AppLayout } from "@/components/layout/PageShell";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import TrackOrder from "./pages/TrackOrder";
import InfoPage from "./pages/InfoPage";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    // Fondu d'entree court sur le contenu uniquement : pas d'animation de sortie,
    // donc la nouvelle page s'affiche immediatement, sans "flash" du footer.
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/page/:slug" element={<InfoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner position="top-center" richColors closeButton />
                <MotionConfig reducedMotion="user">
                <BrowserRouter>
                  <ScrollManager />
                  <AppLayout>
                    <AnimatedRoutes />
                  </AppLayout>
                </BrowserRouter>
                </MotionConfig>
              </TooltipProvider>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
