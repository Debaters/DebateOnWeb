import React from 'react';
import SingleReply from './SingleReply';
import BrowserCheck from './BrowserCheck';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';
import axios from "axios";
import BrowerCheck from './BrowserCheck';

class Debate_Room extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            replys : [],
            content:'',
            writerName:''
        }
        
        this.addReply = this.addReply.bind(this);
    }
    
    loadComment = async() => {
        axios.post("/graphql",
                       {
                           query: `{debate(id:"id"){comments{content writerName}}}`
                       },
                       {
                           headers: {
                           "Accept": "application/json",
                           "Api-Key": "demoKeyOfApi",
                           "Content-Type": "application/json"
                           }
                       }
       ).then(({ data }) => {
           this.setState({
               replys: data.data.debate.comments
           })
       });
   };

   componentDidMount(){
       this.loadComment();
   }

   addComment = async() => {
        axios.post("/graphql",
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
                                debateId : "id",
                                content : this.state.content,
                                writerName : this.state.writerName
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

    addReply(){
        let value = document.querySelector('#new-reply-content').value;
        this.setState({replys: [...this.state.replys, {
            // id : this.state.replys.length + 1, 추후 ID값 추가되면 넣을자리
            writerName : BrowerCheck(),
            content : value
        }],
        content : value,
        writerName : BrowerCheck()
        }, () => { this.addComment(); console.log(this.state.writerName, this.state.content); })
        this.remove_text();
    }

    render(){
        const { replys } = this.state;
        console.log(replys);

        return (
            <div id="root">
                <div>
                    <Debate_title />
                    <Debate_Subject />
                    <div id="replys">
                        {
                            this.state.replys.map(replys => {
                                return <SingleReply key={replys.id} reply={replys}/>
                            })
                        }
                    </div>
                    <div id="writing-area">
                        <textarea id="new-reply-content"></textarea>
                        <button id="submit-new-reply" onClick={this.addReply}>입력</button>
                    </div>
                </div>
            </div>
        )
    }

    remove_text(){
        var clear_area = document.getElementById('new-reply-content');
        clear_area.value = ' ';
    }
    
}

export default Debate_Room;