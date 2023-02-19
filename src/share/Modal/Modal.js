import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import ModalDetails from './ModalDetails';
import { MdScheduleSend } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';

import { useNavigate } from 'react-router-dom';
const Modal = ({ writecomment }) => {
    const navigate = useNavigate()

    const { user } = useContext(AuthContext);
    console.log()
    const { profile, photo, name, user_email, _id, } = writecomment

    const { data: comments, refetch } = useQuery({
        queryKey: ['comment', _id],
        queryFn: () => fetch(`https://friends-media-server.vercel.app/comment?id=${_id}`)
            .then(res => res.json())
            .catch(console.error())
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm()


    const commnetHandelr = data => {


        if (user?.uid) {
            const postComment = {
                post_id: _id,
                content_uploader: user_email,
                comment: data.comment,
                comment_writer: user?.displayName,
                photo_URL: user?.photoURL

            }

            fetch('https://friends-media-server.vercel.app/comment', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postComment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        reset()
                        refetch()
                    }

                })
        }
        else {
            return navigate('login')

        }



    }

    return (
        <div>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className='flex justify-center'>
                        <div className=''>
                            <div className="avatar">
                                <div className="w-24 rounded block">
                                    <img src={profile} className='' alt='' />

                                </div>
                            </div>
                            <br />
                            <div className='text-center'>
                                <b>{name}</b>
                            </div>
                        </div>
                    </div>
                    <div className="divider">OR</div>
                    <form onSubmit={handleSubmit(commnetHandelr)} action="">
                        <textarea {...register('comment', { required: 'write somthing and then send' })} className="textarea block border-[#3333FF] w-[300px] h-[50px]" placeholder="comment here "></textarea>
                        <button type='submit' className=' text-[#3333FF] mt-2'><MdScheduleSend /></button>
                        {errors?.comment && <small>{errors?.comment}</small>}
                    </form>
                    <div>
                        <div>
                            {
                                comments &&
                                comments?.map(cm => <ModalDetails key={cm._id} cm={cm}></ModalDetails>)
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Modal;