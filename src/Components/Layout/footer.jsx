import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Conect 4 - Desenvolvido por: </p>
      <p> João Nunes (2022122159) & Miguel Marques (2022127235)</p>
      <p>
        <a
          href="https://github.com/Nunes003/4-em-linha-1.git"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Ver código no GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
