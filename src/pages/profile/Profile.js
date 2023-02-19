import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Profile = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const infoHandler = data => {
        const information = {
            name: data.name,
            address: data.address,
            email: data.email,
            university: data.university,
            user_email: user?.email,
        }

        fetch('https://friends-media-server.vercel.app/user-information', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(information)
        })
            .then(res => res.json(information))
            .then(data => {
                reset()
                console.log(data)
                navigate('/about')
            })
            .catch(console.error())
    }
    return (
        <div className='ml-16'>
            <h2 className='text-3xl'>Add your information</h2>
            <div className='border-2 w-72'>
                <div className='flex justify-center items-center p-10'>

                    <form onSubmit={handleSubmit(infoHandler)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register('name')} type="text" placeholder="Type here" className="input input-bordered w-60" />

                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email')} type="text" placeholder="Type here" className="input input-bordered w-60" />

                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">University</span>
                            </label>
                            <input {...register('university')} placeholder="Type here" className="input input-bordered w-60" />

                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input {...register('address')} type="text" placeholder="Type here" className="input input-bordered w-60" />

                        </div>
                        <button type='submit' className="btn btn-sm mt-6">submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;