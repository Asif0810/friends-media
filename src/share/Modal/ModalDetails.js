import React from 'react';

const ModalDetails = ({ cm }) => {
    const { comment, comment_writer, photo_URL } = cm

    return (
        <div className='mt-5 '>
            <div className='flex items-center'>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={photo_URL} alt='' />
                    </div>
                </div>
                <div className='border-2 ml-4 rounded-lg p-1 pr-3'>
                    <small className='ml-2 block'><b>{comment_writer}</b></small>
                    <small className='ml-2'>{comment}</small>
                </div>

            </div>

        </div>
    );
};

export default ModalDetails;