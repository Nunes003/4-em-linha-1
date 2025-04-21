import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
