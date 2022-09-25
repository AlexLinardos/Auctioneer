// import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/ItemScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              {" "}
              <Route path='/' element={<HomeScreen/>} />
              <Route path='/welcome' element={<WelcomeScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/items/:id' element ={<ItemScreen />}/>
            </Routes>
          </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
