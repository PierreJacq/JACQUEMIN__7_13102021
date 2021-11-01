const Connexion = () => {
    return (
        <div className="connexion">
            <h1> Connexion </h1>
            <form>
                <input type="text" placeholder="Login" name="login" />
                <input type="password" placeholder="Mot de passe" name="password" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Connexion;