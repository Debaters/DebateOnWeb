import React from 'react';
import SingleReply from './SingleReply';
import BrowerCheck from './BrowserCheck';
import Debate_Subject from './Debate_Subject';
import Debate_title from './Debate_title';

class Debate_Room extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            replys : [
                {
                    id : 1,
                    writer : "test",
                    date : "2020-10-10",
                    content : "리액트 처음입니다."
                },
                {
                    id : 2,
                    writer : "test2",
                    date : "2021-08-19",
                    content : "리액트 처음이라고"
                }
            ]
        }
        //지금 당장은 바로 내용이 갱신되도록 한다. 추후 DB에 값을 저장하면서 갱신을 동시에 하도록 하면 될듯.
        this.addReply = this.addReply.bind(this);
    }

    addReply(){
        let value = document.querySelector('#new-reply-content').value;
        this.setState({replys: [...this.state.replys, {
            id : this.state.replys.length + 1,
            writer: <BrowerCheck />,
            date : new Date().toISOString().slice(0, 10),
            content : value
        }]})
        this.remove_text();
    }

    render(){
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