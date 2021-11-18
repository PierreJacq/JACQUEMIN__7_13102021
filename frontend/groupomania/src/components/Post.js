import React from 'react';
import AddComment from './AddComment';
import AddLike from './AddLike';
import AllComments from './AllComments';

const Post = (props) => {
    
    const {post} = props;
    
    //gestion droits de suppression
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));

    //décompte des likes 

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
            <div className="likes-counter">{post.Likes.length}</div>           
            <div className="like-or-comment">
                <AddLike />
                <AddComment />
            </div>
            <div className="AllComments">
                <AllComments />
            </div>
        </div>
    );
};

export default Post;