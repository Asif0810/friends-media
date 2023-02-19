import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { } from '../../context/AuthProvider';
import Loader from '../../share/loader/Loader';
import Modal from '../../share/Modal/Modal';

import MediaDetails from './MediaDetails';

const Media = () => {
    const [writecomment, setcomment] = useState({})
    const comment = (comment) => {
        setcomment(comment)
    }

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: () => fetch('https://friends-media-server.vercel.app/post')
            .then(res => res.json())
            .catch(console.error())
    })


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='w-[520px] mx-auto'>
            {
                posts.map(post => <MediaDetails comment={comment} key={post._id} post={post}></MediaDetails>)
            }

            {
                writecomment &&
                < Modal writecomment={writecomment}></Modal>
            }
        </div >
    );
};

export default Media;