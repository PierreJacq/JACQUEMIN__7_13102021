import {useForm} from "react-hook-form";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
    //---------------------------------------------------------
    // Gestion de l'affichage----------------------------------
    //---------------------------------------------------------

    const [profileData, setProfileData] = useState([]);
    const [firstNameActive, setFirstNameActive] = useState(false);
    const [lastNameActive, setLastNameActive] = useState(false);
    const [birthDateActive, setBirthDatedActive] = useState(false);
    const [imageActive, setImageActive] = useState(false);
    
    const toggleFirstName = () => {
        setFirstNameActive(!firstNameActive)
    };
    const toggleLastName = () => {
        setLastNameActive(!lastNameActive)
    };
    const toggleBirthDate = () => {
        setBirthDatedActive(!birthDateActive)
    };
    const toggleImage = () => {
        setImageActive(!imageActive)
    };


    //---------------------------------------------------------
    // Gestion des requêtes------------------------------------
    //---------------------------------------------------------
    const { register, handleSubmit, formState :{errors}} = useForm({criteriaMode:"all"});
    const loggedUser = parseInt(localStorage.getItem('idUser'));

    const onSubmit = (userInfo) => { //retravailler la requête ci-dessous, c'est pas dingo
        const bodyFormData = new FormData();
        if(userInfo.login){
            bodyFormData.append('login', userInfo.login);
        }
        if(userInfo.firstName){
            bodyFormData.append('firstName', userInfo.firstName);
        }
        if(userInfo.lastName){
            bodyFormData.append('lastName', userInfo.lastName);
        }
        if(userInfo.birthDate){
            bodyFormData.append('birthDate', userInfo.birthDate);
        }
        if (userInfo.image) {
            bodyFormData.append('image', userInfo.image[0]);
        }
        
        axios({
            method: 'put',
            url : '/user/'+ loggedUser,
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Content-type' : "multipart/form-data",
                'Authorization' : localStorage.getItem('token')
            },
            data: bodyFormData
        })
        .then((res) => {
            setFirstNameActive(false);
            setLastNameActive(false);
            setBirthDatedActive(false);
            setImageActive(false);
        })
        .catch(() =>{
            alert("Les infos n'ont pas pu être mises à jour!")
        })
    };

    //---------------------------------------------------------
    // Gestion du render et useEffect      --------------------
    //---------------------------------------------------------

    useEffect(() => {
        axios({
            method: 'GET',
            url : '/user/'+ loggedUser,
            baseURL: "http://localhost:3000/api",
            headers : {
                'Authorization' : localStorage.getItem("token"),
            }
        })
            .then((res) => {
                console.log('User infos found');
                setProfileData(res.data);
            })
            .catch(() => {
                console.log('User infos could not be fetched')
            })
    },[firstNameActive, lastNameActive, birthDateActive, imageActive])


    return (
        <div className="card__profile">
            <div className="card__photo">
                <div className="profile__picture"></div>
                {imageActive 
                    ?
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="file" placeholder="Photo de profil" {...register("image", {
                            required : { value : true, message: "Veuillez ajouter une photo de profil"}})} />
                            {errors.image && <p className="message-erreur"> {errors.image.message} </p>}
                                <input type="submit"/>
                                <button onClick={toggleImage}>Annuler</button>
                            </form>
                        </>
                    : 
                        <div className="card__firs">
                            <p>Image de profil</p>
                            <button onClick={toggleImage}>Modifier</button>
                        </div>
                }
            </div>
            <div className="card__infos">
                {firstNameActive 
                    ?
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" defaultValue={profileData.firstName}{...register("firstName", { 
                                required : {value :true , message: "Veuillez renseigner votre prénom" },
                                minLength : {value :3, message : "Votre prénom doit contenir au moins trois lettres"},
                                maxLength : {value :44, message : "Votre prénom ne peut excéder 44 caractères"},
                                pattern : {value : /^[a-zA-ZÀ-ÿ-. ]*$/, message : "Votre prénom ne peut contenir que des lettres"}})} />                
                                {errors.firstName && <p className="message-erreur"> {errors.firstName.message} </p>}
                                <input type="submit"/>
                                <button onClick={toggleFirstName}>Annuler</button>
                            </form>
                        </>
                    : 
                        <div className="card__firstName">
                            <p>Prénom</p>
                            <p>{profileData.firstName}</p>
                            <button onClick={toggleFirstName}>Modifier</button>
                        </div>
                }
                {lastNameActive 
                    ?
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" defaultValue={profileData.lastName}{...register("lastName", {
                                required : {value : true, message :"Veuillez renseigner votre nom"},
                                minLength : {value: 3, message : "Votre nom doit contenir au moins trois lettres"},
                                maxLength : {value: 44, message : "Votre nom ne peut contenir plus de 44 lettres"},
                                pattern : {value : /^[a-zA-ZÀ-ÿ-. ]*$/, message : "Votre nom ne peut contenir que des lettres"}})} />                
                                {errors.lastName && <p className="message-erreur"> {errors.lastName.message} </p>}
                                <input type="submit"/>
                                <button onClick={toggleLastName}>Annuler</button>
                            </form>
                        </>
                    : 
                        <div className="card__lastName">
                            <p>Nom</p>
                            <p>{profileData.lastName}</p>
                            <button onClick={toggleLastName}>Modifier</button>
                        </div>
                }
                {birthDateActive 
                    ?
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="date" placeholder="Date de naissance" {...register("birthDate", {
                            required : { value : true, message: "Veuillez renseigner votre date de naissance"}})} />
                            {errors.birthDate && <p className="message-erreur"> {errors.birthDate.message} </p>}
                            <input type="submit"/>
                            <button onClick={toggleBirthDate}>Annuler</button>
                            </form>
                        </>
                    : 
                        <div className="card__Password">
                            <p>Date de naissance</p>
                            <button onClick={toggleBirthDate}>Modifier</button>
                        </div>
                }
            </div>
            
            
        </div>
    );
};

export default MyProfile;