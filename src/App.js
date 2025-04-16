import Layout from './Components/Layout/layout';
import Welcome from './Components/welcome/welcome';

import './Styles/App.css';
import './Styles/Board.css';
import './Styles/Header.css';
import './Styles/Dashboard.css';
import './Styles/Welcome.css';
import './Styles/PieceSelector.css';
import './Styles/PopUp.css';
import './Styles/GameModeSelector.css';

export default function App() {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}
