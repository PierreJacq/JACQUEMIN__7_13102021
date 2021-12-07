import { NavLink } from "react-router-dom";

const Navigation = () => {
    const emptyStorage = () => {
        localStorage.clear();
    }

    return (
        <div className="navigation">
            <NavLink to="/home" className="navigation__logo">
                <i class="fas fa-globe"></i>
                <h1>Groupomania</h1>            
            </NavLink>

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
                <NavLink exact to="/" onClick={emptyStorage}>
                    Déconnexion
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;