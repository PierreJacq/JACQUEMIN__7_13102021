import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
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
    );
};

export default Navigation;