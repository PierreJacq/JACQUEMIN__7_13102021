import {useForm} from "react-hook-form";
import axios from "axios";

const Login = () => {
    
    const { register, handleSubmit, formState :{errors}} = useForm();
    
    const onSubmit = (formData) => {
        axios({
            method: 'post',
            url : '/user/login',
            baseURL : 'http://localhost:3000/api',
            headers : {
                'Content-type' : "application/json"
            },
            data: {
                login : formData.login,
                password : formData.password
            }
        })
        .then((res) => {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("idUser", res.data.id);
            window.localStorage.setItem("isAdmin", res.data.isAdmin);
            window.location = "/home";        
        })
        .catch(() => {
            alert("Mot de passe ou identifiant incorrects"); 
        })
    };

    return (
        <div className="formStyle">
            <h2> Connexion </h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="Login" {...register("login", { required: true})}/>
                {errors.login &&  <p className="message-erreur">Veuillez donner votre login</p>}

                <input type="password" placeholder="Mot de passe" {...register("password", { required : true})} />
                {errors.password && <p className="message-erreur"> Veuillez donner votre mot de passe</p>}

                <input type="submit" className="button-auth" value="Se connecter" />
            </form>
        </div>
    );
};

export default Login;



