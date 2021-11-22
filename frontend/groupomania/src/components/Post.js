import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddComment from './AddComment';
import AllComments from './AllComments';

const Post = (props) => {
    
    const {post} = props;
    
    //gestion utilisateur connecté
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));

    //---------------------------------------------------------
    // Gestion des likes---------------------------------------
    //---------------------------------------------------------
    let initialLike;
    useEffect(() => { 
        console.log(loggedUser);
        const checkedLikes = post.Likes;
        initialLike = checkedLikes.some(like => like.UserId === loggedUser)
        console.log(initialLike);
    }, []);

    const [mylikes, setLikes] = useState();



    return (
        <div className="post">
            <div className="authorship">
                <div className="author-info"> 
                    <div className="profile-pic"></div>
                    <div className="author-name">{post.User.firstName} {post.User.lastName}</div>
                </div>
                <div className="post-delete">
                    {post.UserId === loggedUser && 
                        <button className="delete-button">Supprimer</button>
                    }
                </div>                   
            </div>
            <div className="post-image"></div>
            <p className="post-description">{post.description}</p>
            <div className="likes">
                <div className="likes-counter">{post.Likes.length}</div>
                
                    <button>J'ai déjà liké cela</button>
                
            </div>
            <div className="AllComments">
                <AllComments />
            </div>
        </div>
    );
};

export default Post;