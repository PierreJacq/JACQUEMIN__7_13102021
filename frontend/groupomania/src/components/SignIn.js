import {useForm} from "react-hook-form";
import axios from "axios";

const SignIn = () => {

    const { register, handleSubmit, formState :{errors}} = useForm({criteriaMode:"all"});

    const onSubmit = (formData) => {
        axios({
            method: 'post',
            url : '/user/signup',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Content-type' : "application/json"
            },
            data: {
                login : formData.login,
                password : formData.password,
                firstName: formData.firstName,
                lastName : formData.lastName,
                birthDate : formData.birthDate 
            }
        })
        .then((res) => {
            alert("Utilisateur créé avec succès !")
        })
        .catch(() =>{
            alert("Ce login est déjà utilisé !")
        })
    };

    return (
        <div className="signin">
            <h1> Inscription </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Prénom" {...register("firstName", { 
                    required : {value :true , message: "Veuillez renseigner votre prénom" },
                    minLength : {value :3, message : "Votre prénom doit contenir au moins trois lettres"},
                    maxLength : {value :44, message : "Votre prénom ne peut excéder 44 caractères"},
                    pattern : {value : /^[a-zA-ZÀ-ÿ-. ]*$/, message : "Votre prénom ne peut contenir que des lettres"}})} />                
                {errors.firstName && <p className="message-erreur"> {errors.firstName.message} </p>}                
                
                <input type="text" placeholder="Nom" {...register("lastName", {
                    required : {value : true, message :"Veuillez renseigner votre nom"},
                    minLength : {value: 3, message : "Votre nom doit contenir au moins trois lettres"},
                    maxLength : {value: 44, message : "Votre nom ne peut contenir plus de 44 lettres"},
                    pattern : {value : /^[a-zA-ZÀ-ÿ-. ]*$/, message : "Votre nom ne peut contenir que des lettres"}
                })} />
                {errors.lastName && <p className="message-erreur"> {errors.lastName.message} </p>}

                <input type="text" placeholder="Login" {...register("login", {
                    required : {value: true, message : "Veillez créer login"},
                    minLength : {value :3, message : "Votre login doit contenir 3 caractères au moins"},
                    maxLength : {value :44, message : "Votre login ne peut excéder 44 caractères"}
                })} />                
                {errors.login && <p className="message-erreur"> {errors.login.message} </p>}

                
                <input type="password" placeholder="Mot de passe" {...register("password", {
                    required : {value : true, message : "Veuillez créer un mot de passe"},
                    minLength : {value : 8, message :"Votre mot de passe doit contenir au moins 8 caractères"},
                    maxLength : {value :44, message : "Votre mot de passe ne peut excéder 44 caractères"}
                })}/>
                {errors.password && <p className="message-erreur"> {errors.password.message} </p>}

                <label>Date de naissance
                <input type="date" placeholder="Date de naissance" {...register("birthDate", {
                    required : { value : true, message: "Veuillez renseigner votre date de naissance"}
                })} />
                {errors.birthDate && <p className="message-erreur"> {errors.birthDate.message} </p>}
                </label>
                <input type="submit" />
            </form>
        </div>
    );
};

export default SignIn;
