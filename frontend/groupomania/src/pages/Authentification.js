import Login from "../components/Login";
import SignIn from "../components/SignIn";

const Authentification = () => {
    return (
        <div className="authentification">
            <img src="./img/icon-redim.png" alt="Logo Groupomania"/>
            <div className="formulaires">
                <Login />
                <div className="auth__separateur"></div>
                <SignIn />
            </div>
        </div>

    );
};

export default Authentification;