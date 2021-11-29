import axios from "axios";
import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

const AllPosts = () => {
    
    const [posts, setPosts] = useState([]);
    const [postsReload, setPostsReload] = useState(false);
    
    const refreshPosts = () => {
        setPostsReload(!postsReload);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url : '/post/',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token")
            }
        })
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                throw err
            })
    }, [postsReload]);

    return (
        <div className="conteneur__posts">
            <NewPost refresh={refreshPosts}/>
            {posts.map((post) => (
                <Post post={post} key={post.id} refresh={refreshPosts} />
            ))}
        </div>
    );

};

export default AllPosts;
