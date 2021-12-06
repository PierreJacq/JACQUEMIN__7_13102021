import Login from "../components/Login";
import SignIn from "../components/SignIn";

const Authentification = () => {
    return (
        <div className="authentification">
            <div className="authentification__titre">
                <i class="fas fa-globe"></i>
                <h1>Groupomania</h1>
            </div>
            <div className="forms__container">
                <Login />
                <SignIn />
            </div>
        </div>

    );
};

export default Authentification;