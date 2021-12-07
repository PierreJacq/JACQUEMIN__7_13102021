import AllPosts from "../components/AllPosts";
import Navigation from "../layout/Navigation";

const Home = () => {
    return (
        <>
        <Navigation />
            <div className="conteneur-home">
                <AllPosts />
            </div>
        </>
    )
}

export default Home;