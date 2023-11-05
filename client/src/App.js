import logo from './logo.svg';
import './App.css';
import {Route , Routes} from 'react-router-dom'
import {Home, Goa, Kerala, Binsara , Hoteldetail, PaymentPage} from './components'
import Explore from './components/explore';
import Gulmarg from './components/Gulmarg';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/goa" element={<Goa />} />
      <Route path="/binsara" element={<Binsara />} />
      <Route path="/gulmarg" element={<Gulmarg />} />
      <Route path="/kerala" element={<Kerala />} />
      <Route path="/hotel" element={<Hoteldetail />} />
      <Route path="/payment" element={<PaymentPage />} />
      

    </Routes>
  );
}

export default App;
