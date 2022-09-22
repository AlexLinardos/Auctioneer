// import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {" "}
            <Route exact path='/' element={<h1>HOME</h1>} />
            <Route path='/welcome' element={<WelcomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
