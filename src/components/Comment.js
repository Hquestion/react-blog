import React, {Component} from 'react';
import {Button, Avatar, Pagination} from 'antd';
import CommentPop from './CommentPop';
import './comment.less';
import api from '../api';
import dayjs from 'dayjs';

const pageSize = 10;
export default class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            commentList: this.props.list || [],
            nickName: '',
            commentContent: '',
            commentVisible: false,
            articleId: this.props.articleId,
            current: 1,
            total: this.props.total
        };
        this.sendComment = this.sendComment.bind(this);
        this.doComment = this.doComment.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.list) {
            this.setState({
                commentList: nextProps.list,
                total: nextProps.total
            });
        }
    }

    sendComment(){
        this.setState({
            commentVisible: true
        });
    }

    doComment(nickname, content){
        api.comment({
            article_id: this.state.articleId,
            comment_id: '',
            nickname: nickname,
            content: content
        }).then(res => {
            this.setState({
                commentList: [res, ...this.state.commentList],
                nickname: '',
                commentContent: '',
                commentVisible: false
            });
        });
    }

    onPageChange(pageIndex, pageSize){
        api.getCommentsByPage(this.state.articleId, pageIndex, pageSize).then(res => {
            this.setState({
                commentList: [...res.list],
                current: pageIndex
            });
        })
    }
    
    render(){
        return(
            <div className="comment">
                <div className="comment-header">
                    <div>大家说</div>
                    <Button type="primary" size="large" onClick={this.sendComment}>我想说两句</Button>
                </div>
                <ul className="comment-content-container">
                    {this.state.commentList.map((item, index) => {
                        const time = dayjs(item.create_time);
                        const timeStr = time.format('YYYY年MM月DD日 HH:mm');
                        const name = item.user_name.slice(0, 1);
                        return (
                            <li key={index}>
                                <Avatar size='large' style={{background: '#00b0e8'}}>{name}</Avatar>
                                <div className="comment-detail">
                                    <div className="user-name">
                                        <span>{item.user_name}</span>
                                        <span>{timeStr}</span>
                                    </div>
                                    <div className="comment-text" dangerouslySetInnerHTML={{__html: item.content}}/>
                                </div>
                            </li>
                        )
                    })}
                    {this.state.commentList.length === 0 && (
                        <div style={{textAlign: 'center',padding: "20px", color: "#ccc"}}>还没有看官想说点什么~~</div>
                    )}
                </ul>
                <Pagination onChange={this.onPageChange}
                            hideOnSinglePage={true}
                            current={this.state.current}
                            pageSize={pageSize}
                            total={this.state.total}/>
                <CommentPop visible={this.state.commentVisible} onComment={this.doComment}/>
            </div>
        );
    }
}