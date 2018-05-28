import React from 'react';
import api from '../../api'
import ArticleCard from "../../components/ArticleCard";
import {Pagination} from 'antd';
import "./home.less";

const pageSize = 10;
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleList: [],
            current: 1,
            total: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.loadArticlesByPage(this.state.current);
    }

    onChange(pageIndex){
        this.setState({
            current: pageIndex
        });
        this.loadArticlesByPage(pageIndex);
    }

    loadArticlesByPage(pageIndex){
        api.getArticleList(pageIndex, pageSize).then(res => {
            this.setState({
                articleList: res.list,
                total: res.total
            });
        });
    }

    render(){
        const articleList = this.state.articleList;
        return (
            <div className="home">
                {articleList.map((item, index) => {
                    return (
                        <ArticleCard data={item} key={item.id}/>
                    )
                })}
                <Pagination onChange={this.onChange}
                            hideOnSinglePage={true}
                            current={this.state.current}
                            pageSize={pageSize}
                            total={this.state.total}/>
            </div>
        )
    }
}
