import { BrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import AppLoader from './components/AppLoader';
import Router from './Router'; // Import the new Router

function App() {
    useTheme();

    return (
        <BrowserRouter>
            <AppLoader>
                <Router />
            </AppLoader>
        </BrowserRouter>
    );
}

export default App;