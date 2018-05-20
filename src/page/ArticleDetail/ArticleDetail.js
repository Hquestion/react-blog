import React from 'react';
import {withRouter} from 'react-router-dom';
import api from '../../api';
import dayjs from "dayjs";
import config from "../../config";
import './article-detail.less';

class ArticleDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleMeta: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        api.getArticleDetail(id).then(res => {
            this.setState({
                articleMeta: res
            });
        });
    }

    render(){
        const data = this.state.articleMeta;
        const publishTime = dayjs(data.create_time).format("YYYY年MM月DD日");

        return (
            <div className="article-detail">
                <div className="article-title">{data.title}</div>
                <div className="acticle-time">发布于{publishTime}</div>
                {data.poster && (
                    <div className="article-poster">
                        <img src={`${config.serverMediaUrl}${data.poster}`} alt=""/>
                    </div>
                )}
                <div className="article-content markdown-body" dangerouslySetInnerHTML={{__html: data.content}}/>
            </div>
        );
    }
}

export default withRouter(ArticleDetail);