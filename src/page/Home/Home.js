import React from 'react';
import api from '../../api'
import ArticleCard from "../../components/ArticleCard";

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articleList: []
        }
    }

    componentDidMount(){
        api.getArticleList().then(res => {
            console.log(res);
            this.setState({
                articleList: res
            });
        })
    }

    render(){
        const articleList = this.state.articleList;
        return (
            <div className="home">
                {articleList.map(item => {
                    return (
                        <ArticleCard data={item}/>
                    )
                })}
            </div>
        )
    }
}
