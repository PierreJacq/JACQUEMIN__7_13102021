import axios from 'axios';
import {React, useState, useEffect} from 'react';

const AllMembers = () => {
    
    const [members, setMembers] = useState([]);
    
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
    },[]);

    return (
        <div className="cont__members">
            {members.map((member) => (
                <div className="card__member" key={member.id}>
                    <div className="card__photo"></div>
                    <div className="card__infos">
                        <p className="card__name">{member.firstName} {member.lastName}</p>
                        <p className="birthdate">{member.birthDate}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllMembers;