import axios from 'axios';
import moment from 'moment';
import {React, useState, useEffect} from 'react';

const AllMembers = () => {


    //---------------------------------------------------------
    // Gestion du render---------------------------------------
    //---------------------------------------------------------
    const [members, setMembers] = useState([]);
    const [reload, setReload] = useState(false);
    const userIsAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    
    useEffect(() => { 
        axios({
            method : "GET",
            url : "/user/",
            baseURL : 'http://localhost:3000/api',
            headers : {
                'authorization' : localStorage.getItem('token')
            }
        })
            .then((res)=> {
                setMembers(res.data);
                console.log('Users were fetched')
            })
            .catch(() => {
                console.log('Users could not be fetched')
            })
    },[reload]);

    //---------------------------------------------------------
    // Gestion de la suppression-------------------------------
    //---------------------------------------------------------
    const deleteThisUserAccount = (userToDelete) => {
        axios({
            method : 'DELETE',
            url: '/user/' + userToDelete,
            baseURL : 'http://localhost:3000/api',
            headers : {
                'authorization' : localStorage.getItem('token')
            }
        })
            .then(() => {
                setReload(!reload);
                console.log('User deleted')
            })
            .catch(() => {
                console.log('User could not be deleted')
            })
    }
//                    <img  className="card__photo" src={member.URLprofile}/>


    return (
        <div className="cont__members">
            {members.map((member) => (
                <div className="card__member" key={member.id}>
                    <div className="card__photo" style={{
                        backgroundImage:`url(${member.URLprofile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',                        backgroundRepeat: 'no-repeat',
                    }}>
                    </div>
                    <div className="card__infos">
                        <div className="card__text">
                            <p className="card__name">{member.firstName} {member.lastName}</p>
                            <p className="birthdate">{moment(member.birthDate).format('L')}</p>
                        </div>
                        {(userIsAdmin === true && member.isAdmin == false) &&
                        <button onClick={() => deleteThisUserAccount(member.id)} className="Bouton__suppression">Supprimer</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllMembers;