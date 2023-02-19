import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateInfo = () => {
    const navigate = useNavigate()
    const userInfo = useLoaderData();
    const { address, email, name, university, _id } = userInfo
    const { register, handleSubmit, reset } = useForm()
    const updateHandler = (data) => {
        const update = {
            name: data.name,
            address: data.address,
            email: data.email,
            university: data.university
        }
        console.log(update)
        fetch(`https://friends-media-server.vercel.app/update-info/${userInfo._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    navigate('/about')
                }
            })
            .catch(console.error())
    }
    return (
        <div className='p-10'>
            <h3 className='text-3xl'>Update your Information</h3>
            <form onSubmit={handleSubmit(updateHandler)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register('name')} type="text" defaultValue={name} className="input input-bordered w-60" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register('email')} type="text" defaultValue={email} className="input input-bordered w-60" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">University</span>
                    </label>
                    <input {...register('university')} defaultValue={university} className="input input-bordered w-60" />

                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input {...register('address')} type="text" defaultValue={address} className="input input-bordered w-60" />

                </div>
                <button type='submit' className="btn btn-sm mt-6">update</button>
            </form>
        </div>
    );
};

export default UpdateInfo;