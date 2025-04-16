import Header from "./Components/header";
import Welcome from "./Components/welcome/welcome";

import "./Styles/App.css";
import "./Styles/Board.css";
import "./Styles/Header.css";
import "./Styles/Dashboard.css";
import "./Styles/Welcome.css";
import "./Styles/PieceSelector.css";

export default function App() {
  return (
    <>
      <Header />
      <Welcome />
      {/* <Board /> */}
      {/* <Footer /> */}
    </>
  );
}
