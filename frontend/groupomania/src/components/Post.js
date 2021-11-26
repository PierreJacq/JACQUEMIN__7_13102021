import axios, { Axios } from 'axios';
import {set, useForm} from "react-hook-form";
import React, { useEffect, useState } from 'react';

const Post = (props) => {
    
    const {post} = props;
    
    //gestion utilisateur connecté
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));


    //---------------------------------------------------------
    // Gestion des posts---------------------------------------
    //---------------------------------------------------------

    const deletePost = (postToDelete) => {
        console.log(postToDelete)
        axios({
            method : 'DELETE',
            url : '/post/' + postToDelete,
            baseURL :'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
            }
        })
            .then(()=> {
                console.log('Post supprimé')
                window.location.reload();
            })
            .catch(() => {
                console.log("Le post n'a pas pu être supprimé")
            })
    }

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
    const { register, handleSubmit, formState :{errors}} = useForm({criteriaMode:"all"});
    const  [AllComments, setAllComments] = useState([]);
    
    const addComment = (e) => {
        const commentaire = e.commentaire;
        
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
                commentText : commentaire
            }
        })
            .then(() => {
                console.log('Commentaire ajouté');
                setReload(!reload)       
            })
            .catch(() => {
                console.log("Le commentaire n'a pas pu être ajouté")
            })
    }

    const deleteComment = (goodId) => {
        console.log(goodId);
        axios({
            method: 'delete',
            url : '/comment/'+ goodId,
            baseURL: 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token")
            }
        })
            .then(() => {
                console.log("Commentaire supprimé");
                setReload(!reload);
            })
            .catch(()=> {
                console.log("Le commentaire n'a pas pu être supprimé")
            })
    }

    //---------------------------------------------------------
    // Gestion du useEffect------------------------------------
    //---------------------------------------------------------
    const [reload, setReload] = useState(false);
    
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
            .catch((err) => {
                console.log(err);
            })
    },[reload]); 



    return (
        <div className="post">
            <div className="authorship">
                <div className="author-info"> 
                    <div className="profile-pic"></div>
                    <div className="author-name">{post.User.firstName} {post.User.lastName}</div>
                </div>
                <div className="post-delete">
                    {post.UserId === loggedUser && 
                        <button onClick={() => deletePost(post.id)} className="delete-button">Supprimer</button>
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
                {AllComments.map(comment => (
                    <div key= {comment.id} className="conteneurComment">
                        <div className="commentAuthor">{comment.User.firstName} {comment.User.lastName}</div>
                        <div>{comment.commentText}</div>
                        {loggedUser === comment.User.id &&
                            <button onClick={() => deleteComment(comment.id)}>Del{comment.id}</button>
                        }
                    </div>
                ))}
            </div>
            <div className="addComment">
                <form onSubmit={handleSubmit(addComment)}>
                    <input type="text" defaultValue="" placeholder="Ajouter un commentaire"{...register("commentaire", {
                        minLength : {value : 1, message :"Votre commentaire ne peut pas être vide"}
                    })}/>
                    {errors.commentaire && <p className="message-erreur"> {errors.commentaire.message} </p>}
                    <input type="submit" value="Commenter"/>
                </form>
            </div>
        </div>
    );
};

export default Post;