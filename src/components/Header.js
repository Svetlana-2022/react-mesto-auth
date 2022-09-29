import React from "react";
import logo from '../images/Vector(1).svg';

function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={logo} alt="логотип"/>
        </div>
    );
}

export default Header;