import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../api';
import './article-card.less'


class ArticleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };

        this.like = this.like.bind(this);
        this.read = this.read.bind(this);
    }

    like(){
        api.likeArticle(this.state.data.id).then(res => {
            if(res > 0) {
                this.setState({
                    data: {...this.state.data, ...{fav_counts: res}}
                });
            }
        });
    }

    read(e){
        e.preventDefault();
        e.stopPropagation();
        api.readArticle(this.state.data.id).then(res => {
            if(res > 0) {
                this.setState({
                    data: {...this.state.data, ...{read_counts: res}}
                });
            }
            this.props.history.push(`/article-detail/${this.state.data.id}`);
        });
    }


    render(){
        const data  = this.state.data;
        const publishTime = dayjs(data.create_time).format("YYYY年MM月DD日");
        let el = document.createElement('div');
        el.innerHTML = data.content;
        const content = el.innerText.slice(0, 300) + '...';
        return (
            <div className="article-card">
                <div className="article-card-title">{data.title}</div>
                <div className="acticle-card-time">发布于{publishTime}</div>
                <div className="article-card-tag">
                    {data.tag.map(tagItem => {
                        return (
                            <a className="tag-item">{tagItem.name}</a>
                        )
                    })}
                </div>
                <div className="acticle-card-content">
                    <span dangerouslySetInnerHTML={{__html: content}}/>
                    <a onClick={(e) => this.read(e)}>阅读全部&nbsp;>></a>
                </div>
                <div className="article-brief">
                    <div className="article-action article-read" onClick={this.like}>
                        <span>喜欢</span><span>（{data.fav_counts}次）</span>
                    </div>
                    <div className="article-action article-like">
                        <span>阅读</span><span>（{data.read_counts}次）</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ArticleCard)