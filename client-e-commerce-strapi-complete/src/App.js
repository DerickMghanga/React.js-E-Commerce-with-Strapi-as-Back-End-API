import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from "./scenes/home/Home";
import ItemsDetails from "./scenes/itemsDetails/ItemsDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";

//makes us to start at the top of a page if we go to another page using a Route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/item/:itemId" element={ <ItemsDetails /> }/>
          <Route path="checkout" element={ <Checkout /> }/>
          <Route path="checkout/success" element={ <Confirmation /> }/>
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
