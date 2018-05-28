import React from 'react';
import {withRouter} from 'react-router-dom';
import Comment from '../../components/Comment';
import {BackTop} from 'antd';
import api from '../../api';
import dayjs from "dayjs";
import config from "../../config";
import './article-detail.less';

const commentPageSize = 10;
class ArticleDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleMeta: {},
            tags: [],
            commentPageIndex: 1,
            comments: [],
            commentTotal: 0
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        api.getArticleDetail(id).then(res => {
            this.setState({
                articleMeta: res
            });
        });
        api.getArticleTags(id).then(res => {
            this.setState({
                tags: res
            });
        });
        api.getCommentsByPage(id, this.state.commentPageIndex, commentPageSize).then(res => {
            this.setState({
                comments: res.list,
                commentTotal: res.total
            });
        });
    }

    render(){
        const id = this.props.match.params.id;
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
                <div className="article-label">
                    {this.state.tags.map(tagItem => {
                        return (
                            <a className="tag-item" key={tagItem.id}>{tagItem.name}</a>
                        )
                    })}
                </div>
                <Comment list={this.state.comments} total={this.state.commentTotal} articleId={id}/>
                <BackTop/>
            </div>
        );
    }
}

export default withRouter(ArticleDetail);