import AllPosts from "../components/AllPosts";
import Navigation from "../layout/Navigation";

const Home = () => {
    return (
        <div className="conteneur-home">
        <Navigation />
        <p> Je suis la page d'accueil sur laquelle on voit les posts etc.</p>
        <AllPosts />
        </div>
    )
}

export default Home;