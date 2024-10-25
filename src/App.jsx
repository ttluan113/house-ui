import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div>
            <header>
                <Header />
            </header>

            <main>
                <Main />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
