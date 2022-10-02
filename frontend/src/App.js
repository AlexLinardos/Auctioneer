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
import ItemEditScreen from './screens/ItemEditScreen';
import ItemScreen from './screens/ItemScreen';
import SellScreen from './screens/SellScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AdminItemsScreen from './screens/AdminItemsScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {" "}
            <Route path='/' element={<HomeScreen />} />
            <Route path='/welcome' element={<WelcomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/items/:id' element={<ItemScreen />} />
            <Route path='/items/:id/edit' element={<ItemEditScreen />} />
            <Route path='/watchlist/:id' element={<WatchlistScreen />} />
            <Route path='/sell' element={<SellScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/itemslist' element={<AdminItemsScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
