import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../share/loader/Loader';

const About = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    console.log(user)
    const { data: info = [], isLoading } = useQuery({
        queryKey: ['user-information', user?.email],
        queryFn: () => fetch(`https://friends-media-server.vercel.app/information?email=${user?.email}`)
            .then(res => res.json())
            .catch(console.error())
    })


    if (isLoading) {
        return <Loader></Loader>
    }
    const { address, email, name, university, _id } = info;
    console.log(_id)
    if (user.email === info.user_email) {
        return <div className='p-6'>
            <h2>About me</h2>
            <div className='w-48'>
                <img src={user?.photoURL} alt="" />
            </div>

            <p className='mt-2'><b>name : </b>{name}</p>
            <p className='mt-2'><b>address : </b>{address}</p>
            <p className='mt-2'><b>university : </b>{university}</p>
            <p className='mt-2'><b>email : </b>{email}</p>
            <Link to={`/update-info/${_id}`} type='submit' className="btn btn-sm mt-6">update info</Link>
        </div>
    }
    return <div>
        <p className='text-3xl'>you did not add any information yet</p>
        <button className='btn btn-sm mt-6'><Link to={'/profile'}>add information</Link></button>
    </div>



};

export default About;