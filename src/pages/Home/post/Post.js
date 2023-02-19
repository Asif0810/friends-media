import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { json } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Post = () => {
    const { user } = useContext(AuthContext)
    const imghostkey = process.env.REACT_APP_imghost_key;

    const { register, handleSubmit, reset } = useForm()
    const uploadHandler = data => {

        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {

                if (imgdata.success) {

                    const post = {
                        text: data.content,
                        photo: imgdata.data.url,
                        user_email: user.email,
                        name: user.displayName,
                        profile: user.photoURL

                    }
                    fetch('https://friends-media-server.vercel.app/post', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast('upload successfully complete!',
                                    {
                                        icon: '👏',
                                        style: {
                                            borderRadius: '10px',
                                            background: '#333',
                                            color: '#fff',
                                        },
                                    }
                                );
                                reset()
                            }
                        })
                }
            })
    }
    return (
        <div className=''>
            <div className='flex justify-center   mt-24'>
                <form onSubmit={handleSubmit(uploadHandler)} action="">
                    <textarea {...register('content')} placeholder="your First Message !! Express your Thoughts" className=" text-2xl border-[#3333FF] textarea border-4  w-[650px] h-[300px] textarea-bordered textarea-lg  " ></textarea> <br />
                    <input {...register('image')} type="file" className="file-input file-input-bordered " />
                    <button type='submit' style={{ background: '#3333FF' }} className="btn ml-7 btn-wide">upload</button>
                </form>
            </div>
        </div>
    );
};

export default Post;