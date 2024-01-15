import axios from "axios";
import {getUser} from "./userApi";
import {ApolloClient, gql, InMemoryCache, useQuery} from "@apollo/client";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
})

const myclient = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
})

export const FetchBookByTitle = (title) => {
    const GetData = `
        query Book($text: String!){
        bookByTitle(title: $text) {
        id,
        title,
        isbn,
        authors,
        types,
        price,
        publishTime,
        description,
        isExist,
        brief,
        src
    }
}`;
    const cc = {"query" : GetData, "variables": {text: title}}
    //console.log(JSON.stringify({query: GetData}))
    return new Promise((resolve, reject) => {
        instance.post('/graphql', cc)
            .then((res) => {
                //console.log(res.data)
                resolve(res.data.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getCart = () => {
    let id = getUser().id
    return new Promise((resolve, reject)=>
    {
        instance.get('/public/Cart/' + id)
            .then((response)=>{
            resolve(response.data);
        })
            .catch((error)=>{
                reject(error);
            })
    })
}

export const delOne = (id) => {
    let userid = getUser().id
    return new Promise((resolve, reject) => {
        instance.get('/public/Cart/del/' + userid + '/' + id)
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const addCartItem = (id) => {
    let userid = getUser().id
    return new Promise((resolve, reject) => {
        instance.get('/public/Cart/add/' + userid + '/' + id)
            .then((response) => {
            resolve(response);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const getBooks = async () => {
    return new Promise((resolve, reject) =>
    {
        instance.get('/public/Books')
            .then((response) =>{
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            })
    })
}

export const updateBooks = (aBook) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "POST",
            url: "/admin/update",
            data: aBook,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export const addBook = (aBook) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "POST",
            url: "/admin/add",
            headers: {'Content-Type': 'application/json'},
            data: aBook,
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        instance.delete("/public/Book/del/" + id)
            .then((response) => {
            resolve(response.data)
        })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getBooksContains = (string) => {
    return new Promise((resolve, reject) => {
        instance.get('/public/Books/search/' + string)
            .then((response) => {
            resolve(response.data);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const getAuthorByTitle = (string) => {
    return new Promise((resolve, reject) => {
        instance.get('/micro/getAuthors/' + string)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getBookbyId = async(id) => {
    return new Promise((resolve, reject)=>
    {
        instance.get('/public/Books/' + id)
            .then((response)=>{
            resolve(response.data);
        })
            .catch((error)=>{
                alert(error.response.data)
                //reject(error);
            })
    })
}

export const getOrders = () => {
    let userid = getUser().id
    return new Promise((resolve, reject) => {
        instance.get("/public/orders/" + userid)
            .then((response)=>{
            resolve(response.data);
        })
            .catch((error)=>{
                reject(error);
            })
    })
}

export const getAllOrder = () => {
    return new Promise((resolve, reject) => {
        instance.get("/admin/orders")
            .then((response) => {
            resolve(response.data);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const checkout = (data) =>{
    return new Promise((resolve, reject) => {
        instance.post('/public/checkout', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
            resolve(response)
        })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getOneSales = (str, end) => {
    let userid = getUser().id;
    return new Promise((resolve, reject) => {
        instance.get('/public/sales/0/' + userid + '/',
            {
                params: {
                    str: str,
                    end: end,
                }
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getAllSales = (str, end) => {
    return new Promise((resolve, reject) => {
        instance.get('/public/sales/1/0/', {
            params:{
                str: str,
                end: end,
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        instance.get("/admin/users")
            .then((response) => {
            resolve(response.data);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const enableUser = (id) => {
    return new Promise((resolve, reject) => {
        instance.get("/admin/enable/" + id)
            .then((response) => {
            resolve(response)
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const disableUser = (id) => {
    return new Promise((resolve, reject) => {
        instance.delete("/admin/disable/" + id).then((response) => {
            resolve(response);
        })
            .catch((err) => {
                reject(err);
            })
    })
}

export const getQuick = (start, end) => {
    return new Promise((resolve, reject) => {
        instance.get("/admin/quickBuyers", {
            params: {
                start: start,
                end: end,
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getHotBooks = (str, ed) => {
    return new Promise((resolve, reject) => {
        instance.get("/public/sales/1/0", {
            params: {
                start: str,
                end: ed,
            }
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getMy = (str, ed) => {
    let id = getUser().id;
    return new Promise((resolve, reject) => {
        instance.get("/public/sales/0/" + id, {
            params: {
                start: str,
                end: ed,
            }
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getRelatedBooks = (text) => {
    return new Promise((resolve, reject) => {
        instance.get('/public/neo/' + text)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const mapperReduce = () => {
    return new Promise((resolve, reject) => {
        instance.get("/public/sparkcount")
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
