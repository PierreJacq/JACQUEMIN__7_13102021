import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';

const Post = (props) => {
    
    const {post} = props;
    
    //gestion utilisateur connecté
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));

    //---------------------------------------------------------
    // Gestion des likes---------------------------------------
    //---------------------------------------------------------
    const checkedLikes = post.Likes;
    const initialLike = checkedLikes.some(like => like.UserId === loggedUser)
    
    const [likeCount, setLikeCount] = useState(post.Likes.length);
    const [iLikeIt, setLike] = useState(initialLike);
    
    const handleDislike = () => {
        axios({
            method : "DELETE",
            url : '/like/',
            baseURL :'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
                'content-type' : 'application/json'
            },
            data : {
                UserId : loggedUser,
                PostId : post.id
            }
        })
            .then(() => {
                setLike(false);
                setLikeCount(likeCount - 1);
                console.log("Like retiré avec succès")
            })
            .catch(() => {
                alert("Cela n'a pas fonctionné")
            })
    };
    const handleAddLike = () => {
        axios({
            method : "POST",
            url : '/like/',
            baseURL :'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
                'content-type' : 'application/json'
            },
            data : {
                UserId : loggedUser,
                PostId : post.id
            }
        })
            .then(() => {
                setLike(true);
                setLikeCount(likeCount + 1);
                console.log("Like ajouté avec succès")
            })
            .catch(() => {
                alert("Cela n'a pas fonctionné")
            })                
};

//---------------------------------------------------------
// Gestion des Commentaires--------------------------------
//---------------------------------------------------------
    const  [AllComments, setAllComments] = useState([]);
    
    const addComment = (e) => {
        const commentaire =         
        axios({
            method : 'post',
            url : '/comment/',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
            },
            data : {
                UserId : loggedUser,
                PostId : post.id,
                commentText : ?????????????????????????
            }
        })
            .then()
            .catch()
    }

    useEffect(() => {
        console.log(post.id);
        console.log(AllComments);
        
        axios({
            method : 'get',
            url : '/comment/'+ post.id,
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
            }
        })
            .then((res)=> {
                setAllComments(res.data);

            })
            .catch(() => {
                console.log("Nope")

            })
    }, []); 

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
                <div className="likes-counter">{likeCount}</div>
                {iLikeIt
                    ? <button onClick={handleDislike}>Je n'aime plus</button>
                    : <button onClick={handleAddLike}> J'aime </button>
                }              
            </div>

            <div className="allComments">
                {AllComments.map((comment) => (
                    <div className="conteneurComment">
                        <div className="commentAuthor">{comment.User.firstName} {comment.User.lastName}</div>
                        <div>{comment.commentText}</div>
                    </div>
                ))}
            </div>
            <div className="addComment">
                <form onSubmit={addComment}>
                    <input type="text" value="Ajouter un commentaire"></input>
                    <input type="submit" value="Commenter"></input>
                </form>
            </div>
        </div>
    );
};

export default Post;