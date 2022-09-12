// import logo from './logo.svg';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>LEZ FKING GOOO</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
