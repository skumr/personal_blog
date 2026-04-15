import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { NavBar } from './components/NavBar.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Posts } from './pages/Posts.jsx';
import './styles/global.css';

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}