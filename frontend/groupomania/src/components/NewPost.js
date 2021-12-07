import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const NewPost = (props) => {
    const refresh = props.refresh;
    
    const {register, handleSubmit, formState: {errors}} = useForm({criteriaMode: "all"});
    const loggedUser =  parseInt(window.localStorage.getItem("idUser"));

    const onSubmit= (newPostData) => {
        
        const bodyFormData = new FormData();
        bodyFormData.append('title', newPostData.title);
        bodyFormData.append('description', newPostData.description);
        bodyFormData.append('authorId', loggedUser);
        bodyFormData.append('image', newPostData.image[0])

        
        axios({
            method: 'POST',
            url : '/post/',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Authorization' :localStorage.getItem("token"),
                'Content-type' : "multipart/form-data"
            },
            data: bodyFormData
        })
            .then(()=> {
                console.log("Post created !");
                refresh();
            })
            .catch(() => {
                console.log('Post could not be created !')
            })
    }
    
    return (
        <div className="newPostCard">
            <h1>Créer un nouveau post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="newPost--title" type="text" placeholder="Donnez un titre à votre post (50 caractères max)" {...register("title",{
                    required : {value: true, message: "Veuillez donner un titre à votre post"},
                    maxLength : {value: 50, message:"Le titre ne peut pas contenir plus de cinquante caractères"}})}/>
                {errors.title &&<p className="message-erreur"> {errors.title.message} </p>}

                <input className="newPost--description" type="text" placeholder="Ajoutez une description (250 caractères max)"{...register("description",{
                    required : {value: true, message: "Veuillez décrire votre post"},
                    maxLength : {value: 250, message:"Le titre ne peut pas contenir plus de 250 caractères"}})}/>
                {errors.description &&<p className="message-erreur"> {errors.description.message} </p>}

                <label>Ajouter une image
                <input type="file" placeholder="Ajouter une image" {...register("image", {
                    required : { value : true, message: "Veuillez ajouter une image"}
                })} />
                {errors.image && <p className="message-erreur"> {errors.image.message} </p>}
                </label>

                <input type="submit"/>

            </form>
        </div>
    );
};

export default NewPost;