import React from "react";
import './Header.css';
import logo from '../../assets/26084912_topo_anima.png.png';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container-Header">
      <img src={logo} alt="Logomarca da ânima" />
      <Link to="/" className='logo'>Gerenciamento de Produtos</Link>
      <Link to="/criar-produto">
        <button className='favoritos'>Criar novo Produto</button>
      </Link>
    </header>
  );
};

export default Header;