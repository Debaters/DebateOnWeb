import React from 'react';
import './Debate_Room.css'

export default function SingleReply ({reply}){
    return(
        <div className='reply' className='container'>
            <div className='writer'>{reply.writerName}</div>
            <div className='content'>{reply.content}</div>
        </div>
    )
}
