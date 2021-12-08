import MyProfile from "../components/MyProfile";
import Navigation from "../layout/Navigation";

const Profile = () => {

    return (
        <>
        <Navigation/>
            <div className="conteneur-profile">
                <MyProfile/>
            </div>
        </>
    );
};

export default Profile;