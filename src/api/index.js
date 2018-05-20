import axios from 'axios';

function handleResponse(res) {
    return new Promise((resolve, reject) => {
        if (res.status === 200) {
            //请求成功
            if (res.data.code === '0000') {
                resolve(res.data.data);
            } else {
                reject(res.data);
            }
        } else {
            reject();
        }
    });
}

export default {
    getArticleList(){
        return new Promise((resolve, reject) => {
            axios.get('/webblog/article-list/').then(res => {
                handleResponse(res).then(resolve, reject);
            });
        });
    },
    likeArticle(article_id){
        return new Promise((resolve, reject) => {
            axios.post('/webblog/like-article/', {id: article_id}).then(res => {
                handleResponse(res).then(resolve, reject);
            });
        });
    },
    readArticle(article_id){
        return new Promise((resolve, reject) => {
            axios.post('/webblog/read-article/', {id: article_id}).then(res => {
                handleResponse(res).then(resolve, reject);
            });
        });
    },
    getArticleDetail(id){
        return new Promise((resolve, reject) => {
            axios.get('/webblog/article-detail/', {
                params: {
                    id: id
                }
            }).then(res => {
                handleResponse(res).then(resolve, reject);
            });
        });
    }
}