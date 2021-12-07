import moment from 'moment';
import axios from 'axios';
import {useForm} from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    
    const {post} = props;
    const refresh = props.refresh
    
    //---------------------------------------------------------
    // Gestion utilisateur connecté----------------------------
    //---------------------------------------------------------
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));
    const userIsAdmin = JSON.parse(localStorage.getItem('isAdmin'));



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
                refresh();
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
    },[reload, post.id]); // a voir si l'ajout de post.id comme dependency pose problème ou bien non
    


    return (
        <div className="post">
            <div className="post__authorship">
                <div className="author-info"> 
                    <img className="profile-pic" src= {post.User.URLprofile}/>
                    <div className="name&date">
                        <div className="author-name">{post.User.firstName} {post.User.lastName}</div>
                        <div className="post-creation-date">{moment(post.creationDate).format('lll')}</div>
                    </div>
                </div>
                <div className="post-alter">
                    {post.UserId === loggedUser &&
                    <>
                        <Link to={`/modifypost/${post.id}`}><i class="fas fa-edit"></i></Link> 
                    </>
                    }
                    {(post.UserId === loggedUser || userIsAdmin === true  )&&
                        <i onClick={() => deletePost(post.id)}  className="fas fa-trash-alt"></i>
                    }
                </div>                   
            </div>
            <h2 className="post__title">{post.title}</h2>
            <img className="post__image" src= {post.URLimage}/>
            <p className="post__description">{post.description}</p>
            <div className="likes">
                <div className="likes--counter">{likeCount} likes</div>
                {iLikeIt
                    ? <div className="likes--button" onClick={handleDislike}><i class="fas fa-thumbs-down"></i>Je n'aime plus</div>
                    : <div className="likes--button" onClick={handleAddLike}><i class="fas fa-thumbs-up"></i>J'aime </div>
                }              
            </div>

            <div className="allComments">
                {AllComments.map(comment => (
                    <div key= {comment.id} className="comment">
                        <div className="comment--infos">
                            <img className="comment--AuthorImg" src={comment.User.URLprofile}/>
                            <div className="comment--authorDelete">
                                <div className="comment--Author"><strong>{comment.User.firstName} {comment.User.lastName}</strong> a commenté :</div>
                                {loggedUser === comment.User.id &&
                                    <i onClick={() => deleteComment(comment.id)} className="fas fa-trash-alt"></i>
                                }
                            </div>
                        </div>
                        <div className="comment--text">{comment.commentText}</div>
                        
                    </div>
                ))}
            </div>
                <form className="addComment" onSubmit={handleSubmit(addComment)}>
                    <input className="comment--input" type="text" defaultValue="" placeholder="Ajouter un commentaire"{...register("commentaire", {
                        minLength : {value : 1, message :"Votre commentaire ne peut pas être vide"}
                    })}/>
                    {errors.commentaire && <p className="message-erreur"> {errors.commentaire.message} </p>}
                    <input  className="comment--button" type="submit" value="Commenter"/>
                </form>
        </div>
    );
};

export default Post;