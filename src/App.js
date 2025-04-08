import Board from "./Components/Board/board";
import Header from "./Components/header";
import Footer from "./Components/footer";
import "./Styles/App.css";
import "./Styles/Board.css";
import "./Styles/Header.css";
import "./Styles/Dashboard.css";

export default function App() {
  return (
    <>
      <Header />
      <Board />
      <Footer />
    </>
  );
}
