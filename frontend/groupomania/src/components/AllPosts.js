import axios from "axios";
import { useEffect, useState } from "react";

const AllPosts = () => {
    
    const { posts, setPosts} = useState([]);
    
    
    useEffect(() => {
        axios({
            method: 'get',
            url : '/post/',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token")
            }

        })
            .then((res)=> {
                console.log(res)
            })
            .catch()
    }, []);
    
    return (
        <div className="conteneur-posts">
            
        </div>
    );

};

export default AllPosts;
