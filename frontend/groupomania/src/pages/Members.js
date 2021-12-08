import AllMembers from "../components/AllMembers";
import Navigation from "../layout/Navigation";

const Members = () => {
    return (
        <>    
        <Navigation/>
        <div className="conteneur-members">
            <AllMembers/>
        </div>
        </>
    );
};

export default Members;