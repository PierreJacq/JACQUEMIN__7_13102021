import axios from "axios";
import { useEffect, useState } from "react";

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
                <div className="post">
                    <div className="authorship">
                        <div className="author-info">
                            <div className="profile-pic"></div>
                            <div className="author-name">{post.User.firstName} {post.User.lastName}</div>
                        </div>

                        <div className="author-privileges">
                        </div>                  
                    </div>
                </div>
            ))}
        </div>
    );

};

export default AllPosts;
