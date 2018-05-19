import React, {Component} from 'react';
import './article-card.less'

export default class ArticleCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }


    render(){
        const data  = this.state.data;
        return (
            <div className="article-card">
                <div className="article-card-title">{data.title}</div>
                <div className="acticle-card-time">{data.create_time}</div>
                <div className="acticle-card-content" dangerouslySetInnerHTML={{__html: data.content}}/>
                <div className="article-brief">
                    <div className="article-action article-read">
                        <span>喜欢</span><span>{data.fav_counts}</span>
                    </div>
                    <div className="article-action article-like">
                        <span>阅读</span><span>{data.read_counts}</span>
                    </div>
                </div>
            </div>
        );
    }
}