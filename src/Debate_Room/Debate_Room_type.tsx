import React, { useState, useEffect } from 'react';
import SingleReply from './SingleReply';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';
import axios from "axios";
import { useLocation  } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { stringify } from 'querystring';


interface IdData{
    debaterId : string;
}

interface Comment{
    writerName : string;
    content : string;
}

interface NickNameVar{
    nickName : string;
}

interface CommentVars{
    id : string;
}

const LOAD_COMMENT = gql`
    query ($id:String!){
        getComments(debateId:$id, offset:0, size:20){
            content
            writerName
            debateId
        }
    }
`;

// function LoadComment(){
//     const { loading, error, data } = useQuery<CommentVars>(LOAD_COMMENT, {
//         variables: { id },
//     });
  
//     if (loading) return null;
//     if (error) return `Error! ${error}`;
  
//     return (

//     );
// }


const Debate_Room = () => {
    const [reply, setReply] = useState<Comment[]>([]);
    const [NickName, setNick] = useState<NickNameVar>({nickName : ""});
    const location = useLocation<IdData>();
    const id_data = location.state.debaterId;

    const remove_text = () => {
        const clear_area = document.getElementById('new-reply-content') as HTMLInputElement;
        clear_area.value = ' ';
    }

    useEffect(() => {
        loadComment(id_data);
        getNickName();
    }, []);

    const loadComment = async(id:string) => {
        const { data: response } = await axios.post("/graphql",
                    {
                        query: ` 
                            query ($id:String!){
                                getComments(debateId:$id, offset:0, size:20){
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

    const addComment = async(id:string, content:string, writerName:string) => {
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

   const getNickName = async() => {
        const { data: response } = await axios.post("/graphql",
            {
                query: 
                    `
                    query{
                        getNickname
                    }
                    `,
            },
            {
                headers: {
                "Accept": "application/json",
                "Api-Key": "demoKeyOfApi",
                "Content-Type": "application/json"
                }
            }
        )
        setNick(response.data);
   }

   const addReply = () => {
        let value = (document.querySelector('#new-reply-content') as HTMLInputElement).value;
        setReply([...reply, {
            writerName : NickName.nickName,
            content : value
        }]);
        addComment(id_data, value, NickName.nickName);
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