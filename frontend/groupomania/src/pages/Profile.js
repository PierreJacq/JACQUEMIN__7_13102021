import MyProfile from "../components/MyProfile";
import Navigation from "../layout/Navigation";

const Profile = () => {

    return (
        <div className="conteneur-profile">
            <Navigation/>
            <p>Je suis une page permettant de paramétrer les éléments de mon profil</p>
            <MyProfile/>
        </div>
    );
};

export default Profile;