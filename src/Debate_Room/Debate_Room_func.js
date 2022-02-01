import React, { useState, useEffect } from 'react';
import SingleReply from './SingleReply';
import BrowserCheck from './BrowserCheck';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';
import axios from "axios";
import { useLocation  } from "react-router-dom";
import { getDefaultNormalizer } from '@testing-library/dom';

const Debate_Room = () => {
    const [reply, setReply] = useState([]);
    const location = useLocation();
    const id_data = location.state.debaterId;

    const remove_text = () => {
        var clear_area = document.getElementById('new-reply-content');
        clear_area.value = ' ';
    }

    useEffect(() => {
        loadComment(id_data).then().catch();
    }, []);

    const loadComment = async(id) => {
        const { data: response } = await axios.post("/graphql",
                    {
                        query: ` 
                            query ($id:String!){
                                getComments(debateId:$id, offset:0, size:5){
                                    content
                                    writerName
                                    debateId
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
        if(response.data.getComments.content != null || response.data.getComments.content != "undefined" || response.data.getComments.content != ""){
            setReply(response.data.getComments);
        }
    }

    const addComment = async(id, content, writerName) => {
        await axios.post("/graphql",
                    {
                        query: 
                            `mutation addComment($debateId:String!, $content:String!, $writerName:String!){
                                addComment(
                                    debateId:$debateId,
                                    comment:{
                                        debateId:$debateId,
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
        setReply([...reply, {
            writerName : <BrowserCheck />,
            content : value
        }]);
        addComment(id_data, value, BrowserCheck());
        remove_text();
    }

    return (
        <div id="Debate_Room">
            <div>
                <div id="titleBox">
                    <Debate_title roomId={id_data} />
                    <Debate_Subject roomId={id_data} />
                </div>
                <div id="replys">
                    {
                        reply.length > 0?
                        reply.map((replys)=> { 
                            return <SingleReply reply={replys}/>
                        })
                        :<h1 id="noneReply">등록된 글이 없습니다.</h1>
                    }    
                </div>
                <div id="writing-area">
                    <textarea id="new-reply-content"></textarea>
                    <button id="submit-new-reply" onClick={function(e){
                        addReply();
                    }}>입력</button>
                </div>
            </div>
        </div>
    )
}

export default Debate_Room;