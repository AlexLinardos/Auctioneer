// import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {" "}
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
