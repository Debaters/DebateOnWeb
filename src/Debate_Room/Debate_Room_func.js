import React, { useState, useEffect } from 'react';
import SingleReply from './SingleReply';
import BrowserCheck from './BrowserCheck';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';
import axios from "axios";
import BrowerCheck from './BrowserCheck';
import { useLocation  } from "react-router-dom";
import { getDefaultNormalizer } from '@testing-library/dom';

const Debate_Room = () => {
    const [data, setData] = useState("");
    const location = useLocation();
    const id_data = location.state.debaterId;
    // console.log(id_data);

    const remove_text = () => {
        var clear_area = document.getElementById('new-reply-content');
        clear_area.value = ' ';
    }

    useEffect(() => {
        loadComment(id_data);
    }, []);

    const loadComment = async(id) => {
        const { data: response } = await axios.post("/graphql",
                    {
                        query: ` 
                            query ($id:String!){
                                debate(id:$id){
                                    comments{
                                        content
                                        writerName
                                    }
                            }
                        }`,
                        variables: { 
                            id : id
                        }
                    },
                    {
                        headers: {
                        "Accept": "application/json",
                        "Api-Key": "demoKeyOfApi",
                        "Content-Type": "application/json"
                        }
                    }
        );
    setData(response.data.debate.comments);
    }

    const addComment = async(id, content, writerName) => {
        await axios.post("/graphql",
                    {
                        query: 
                            `mutation addComment($debateId:String!, $content:String!, $writerName:String!){
                                addComment(
                                    debateId:$debateId,
                                    comment:{
                                        content:$content,
                                        writerName:$writerName
                                    }
                                )
                            }`,
                        
                            variables: {
                                debateId : id,
                                content : content,
                                writerName : writerName
                            } 
                                    
                    },
                    {
                        headers: {
                        "Accept": "application/json",
                        "Api-Key": "demoKeyOfApi",
                        "Content-Type": "application/json"
                        }
                    }
        )
    }

   const addReply = () => {
        let value = document.querySelector('#new-reply-content').value;
        addComment(id_data, value, BrowerCheck());
        remove_text();
        
    }

    return (
        <div id="Debate_Room">
            <div>
                <Debate_title roomId={id_data} />
                <Debate_Subject roomId={id_data} />
                <div id="replys">
                    {
                        data && data.map((replys)=> {
                            return( 
                                <div className='reply' className='container'>
                                    <h5>{replys.writerName}</h5>
                                    <p>{replys.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div id="writing-area">
                    <textarea id="new-reply-content"></textarea>
                    <button id="submit-new-reply" onClick={function(e){
                        addReply();
                        window.location.reload();
                    }}>입력</button>
                </div>
            </div>
        </div>
    )
    

    
    
}

export default Debate_Room;