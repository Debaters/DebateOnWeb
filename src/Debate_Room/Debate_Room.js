import React from 'react';
import SingleReply from './SingleReply';
import BrowerCheck from './BrowserCheck';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';
import axios from "axios";

// const data = {
//     input_content : 'input_content',
//     input_writer : 'input_writer'
// }

class Debate_Room extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            // replys : [
            //     {
            //         id : 1,
            //         writer : "test",
            //         content : "리액트 처음입니다."
            //     }
            // ]
            replys : [],
            input_content : '',
            input_writer : ''
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
       // cors issue로 인해 작동 X
        axios.post("http://debaters.world:8080/graphql",
                    {
                        query: 
                            `mutation{
                                addComment(
                                    debateId:"id",
                                    comment:{
                                        content:${this.state.input_content},
                                        writerName:${this.state.input_writer}
                                    }
                                )
                            }`
                    },
                    {
                        variables: {
                            input_content : this.state.input_content,
                            input_writer : this.state.input_writer
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
        // this.setState({replys: [...this.state.replys, {
        //     id : this.state.replys.length + 1,
        //     writer: <BrowerCheck />,
        //     content : value
        // }]})
        this.setState({
            input_writer : <BrowerCheck />,
            input_content : value
        })
        console.log(this.state.input_content, this.state.input_writer);
        this.addComment();
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