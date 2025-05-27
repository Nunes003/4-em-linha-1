import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Components/welcome/WelcomePage.jsx';
import GameMenu from './Components/welcome/GameManager.jsx';

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/game-menu" element={<GameMenu />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesComponent;