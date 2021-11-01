import Connexion from "../components/Connexion";
import Inscription from "../components/Inscription";

const Authentification = () => {
    return (
        <div className="authentification">
            <img src="./img/icon-redim.png" alt="Logo Groupomania"/>
            <div className="formulaires">
                <Connexion />
                <div className="auth__separateur"></div>
                <Inscription />
            </div>
        </div>

    );
};

export default Authentification;