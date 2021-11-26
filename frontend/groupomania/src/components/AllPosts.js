import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

const AllPosts = () => {
    
    const [posts, setPosts] = useState([]);
    
    
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
    }, []);

    return (
        <div className="conteneur__posts">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );

};

export default AllPosts;
