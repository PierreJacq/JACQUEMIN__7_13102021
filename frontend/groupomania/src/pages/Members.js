import AllMembers from "../components/AllMembers";
import Navigation from "../layout/Navigation";

const Members = () => {
    return (
        <div className="conteneur-members">
            <Navigation/>
            <p>Je suis une page qui affiche tous les membres de l'entreprise</p>
            <AllMembers/>
        </div>
    );
};

export default Members;