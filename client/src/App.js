import logo from './logo.svg';
import './App.css';
import {Route , Routes} from 'react-router-dom'
import {Home, Goa, Kerala, Binsara} from './components'
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
    </Routes>
  );
}

export default App;
