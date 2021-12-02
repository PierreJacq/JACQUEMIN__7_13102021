import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navigation from "../layout/Navigation";
import axios from 'axios';


const ModifyPost = () => {
    //---------------------------------------------------------
    // Gestion de la requête put-------------------------------
    //---------------------------------------------------------
    const {register, handleSubmit, formState: {errors}} = useForm({criteriaMode: "all"});
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));
    let history = useHistory();

    const onSubmit= (newPostData) => {
        const bodyFormData = new FormData();
        bodyFormData.append('title', newPostData.title);
        bodyFormData.append('description', newPostData.description);
        bodyFormData.append('image', newPostData.image)
        bodyFormData.append('authorId', loggedUser)
        

        axios({
            method: 'put',
            url : '/post/' + param.id,
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' :localStorage.getItem("token"),
                'Content-type' : "multipart/form-data"
            },
            data: bodyFormData
        })
            .then(()=> {
                console.log("Post updated !");
                history.push('/home')
            })
            .catch(() => {
                console.log('Post could not be updated !')
            })
    }
    
    
    
    //---------------------------------------------------------
    // Gestion du useEffect------------------------------------
    //---------------------------------------------------------

    const param = useParams();
    const [ModifiedpostData, setModifiedPostData] = useState([]);    
    useEffect(() => {
        axios({
            method:'GET',
            url : '/post/'+ param.id,
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' : localStorage.getItem("token"),
            }
        })
            .then((res)=> {
                setModifiedPostData(res.data);
            })
            .catch(() => {
                alert('Could not fetch this post')
            })
    },[]) 

    
    return (
        <>
            <Navigation />
            <div className="conteneur-modify" >
            <h1>Modifier votre post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" defaultValue={ModifiedpostData.title} {...register("title",{
                    maxLength : {value: 50, message:"Le titre ne peut pas contenir plus de cinquante caractères"}})}/>
                {errors.title &&<p className="message-erreur"> {errors.title.message} </p>}

                <input type="text" defaultValue={ModifiedpostData.description}{...register("description",{
                    maxLength : {value: 250, message:"Le titre ne peut pas contenir plus de 250 caractères"}})}/>
                {errors.description &&<p className="message-erreur"> {errors.description.message} </p>}

                <label>Modifier votre image
                <div className="conteneur-image-post"></div>
                <input type="file" placeholder="Ajouter une image" {...register("image")} />
                {errors.image && <p className="message-erreur"> {errors.image.message} </p>}
                </label>

                <input type="submit"/>

            </form>
            </div>
        </>
    )
};

export default ModifyPost;