import { FaComment } from "react-icons/fa";
import { LikeButton, Provider, UpdownButton } from '@lyket/react';
import React from 'react';
import { Link } from "react-router-dom";
import Modal from "../../share/Modal/Modal";
import { useQuery } from "@tanstack/react-query";

const MediaDetails = ({ post, comment }) => {

    const { text, photo, name, profile, _id } = post
    const { data: comments } = useQuery({
        queryKey: ['comment', _id],
        queryFn: () => fetch(`https://friends-media-server.vercel.app/comment?id=${_id}`)
            .then(res => res.json())
            .catch(console.error())
    })
    
    return (
        <div className='w-full mt-16'>
            <div className='flex align-middle mb-2'>
                <div className="avatar mr-5">
                    <div className="w-12 rounded-full ring ring-[#3333FF] ring-offset-base-100 ring-offset-2">
                        <img src={profile} alt='' />
                    </div>
                </div>
                <div className=''>
                    <b className='mb-6'>{name}</b><br />
                    {/* <small>{profession}</small> */}
                </div>

            </div>
            <p>{text}</p>
            <img className='w-full ' src={photo} alt="" />
            <div className='mt-6 flex items-center'>
                <Provider apiKey="acc0dbccce8e557db5ebbe6d605aaa">
                    <LikeButton
                        namespace="testing-react"
                        id="everybody-like-now"
                    />
                </Provider>
                <Link></Link>

                <label onClick={() => comment(post)} htmlFor="my-modal-3" className=""><FaComment className="ml-16 text-2xl" /></label>
                <p className="ml-3">{comments?.length}</p>
            </div>

        </div>
    );
};

export default MediaDetails;