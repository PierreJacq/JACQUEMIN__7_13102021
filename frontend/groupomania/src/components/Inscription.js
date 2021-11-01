const Inscription = () => {
    return (
        <div className="inscription">
            <h1> Inscription </h1>
            <form>
                <input type="text" placeholder="Prénom" name="firstName" />
                <input type="text" placeholder="Nom" name="lastName" />
                <input type="text" placeholder="Login" name="login" />
                <input type="password" placeholder="Mot de passe" name="password"/>
                <input type="date" placeholder="Date de naissance" name="birthDate" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Inscription;