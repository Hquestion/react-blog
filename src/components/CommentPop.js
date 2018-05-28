import React, {Component} from 'react';
import {Input, Button} from 'antd';
import './comment-pop.less';

export default class CommentPop extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: '',
            commentContent: '',
            visible: this.props.visible,
            animate: false,
        };

        this.doComment = this.doComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            }, ()=>{
                if(this.state.visible) {
                    setTimeout(()=>{
                        this.setState({
                            animate: true
                        });
                    }, 0)
                }
            });
        }
    }

    cancelComment(){
        this.setState({
            animate: false
        }, ()=>{
            setTimeout(()=>{
                this.setState({
                    visible: false
                });
            }, 300);
        });
    }

    doComment(){
        this.props.onComment(this.state.nickname, this.state.commentContent);
        this.setState({
            animate: false
        }, ()=>{
            setTimeout(()=>{
                this.setState({
                    visible: false
                });
            }, 300);
        });
    }

    render(){
        const ele = (
            <div className={`${this.state.visible ? 'visible' : ''} comment-pop-container`}>
                <div className="comment-pop-mask" onClick={this.cancelComment}/>
                <div className={`comment-pop ${this.state.visible ? 'visible' : ''} ${this.state.animate? 'animate': ''}`}>
                    <div className="comment-pop-form">
                        <div className="comment-title">请告诉我你的看法</div>
                        <Input className="nick-name-input" type="text" placeholder="昵称" onBlur={(e) => this.setState({nickname: e.target.value})}/>
                        <Input.TextArea className="comment-input"
                                        placeholder="你想说什么？"
                                        autosize={{minRows:3}}
                                        onBlur={(e) => this.setState({commentContent: e.target.value})}/>
                        <Button className="comment-btn" type="primary" size="large" onClick={this.doComment}>发表</Button>
                    </div>
                </div>
            </div>
        );
        return ele;
    }
}