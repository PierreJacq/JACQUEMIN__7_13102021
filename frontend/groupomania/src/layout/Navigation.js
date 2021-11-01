import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navigation = () => {
    return (
        <div className="navigation">
            <Logo/>
            
            <div className="navigation__menu">
                <NavLink exact to="/home" activeClassName="nav-active">
                    Accueil
                </NavLink>
                <NavLink exact to="/members" activeClassName="nav-active">
                    Membres
                </NavLink>
                <NavLink exact to="/profile" activeClassName="nav-active">
                    Mon profil
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;