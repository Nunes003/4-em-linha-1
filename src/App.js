import Layout from './Components/Layout/layout';
import './Styles/App.css';
import './Styles/Responsive.css';
import './Styles/Board/Board.css';
import './Styles/Layout/Header.css';
import './Styles/WelcomePage/Welcome.css';
import './Styles/WelcomePage/PieceSelector.css';
import './Styles/WelcomePage/Tips.css';
import './Styles/PopUp/PopUp.css';
import './Styles/WelcomePage/GameModeSelector.css';
import './Styles/Layout/Footer.css';
import './Styles/Board/FloatingPiece.css';
import './Styles/Layout/Layout.css';
import Routes from './routes';

export default function App() {
  return (
    <Layout>
      <Routes />
    </Layout>
  );
}
