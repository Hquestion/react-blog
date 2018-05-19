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
    }
}