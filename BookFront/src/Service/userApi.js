import axios from "axios";
import Cookies from "js-cookie"

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
})

export const Logining = ({username, password}) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        instance({
            method: "post",
            url: "/login",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then((res) => {
                console.log(res.data.role)
                Cookies.set("bookuser", JSON.stringify(res.data));
                resolve(res.data);
            })
            .catch((err) => alert(err.response.data))
    })
}

export const onLogin = () => {
    return new Promise((resolve, reject) => {
        instance.get("/public/onLogin").then((response) => {
            resolve()
        })
            .catch((err) => {
                reject(err)
            })
    })
}

export const Logout = () => {
    return new Promise((resolve, reject) => {
        instance.get("/logout").then((response) => {
            Cookies.remove("bookuser")
            resolve()
        })
            .catch((err) => {
                reject(err)
            })
    })
}

export const onLogout = () => {
    return new Promise((resolve, reject) => {
        instance.get("/public/onLogout").then((response) => {
            resolve(response.data)
        })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getUser = () => {
    let i = Cookies.get("bookuser");
    if(i)
        return JSON.parse(i)
    else return null;
}

export const CheckAuth = () => {
    let id;
    let us = getUser();
    if(us)
    {
        id = us.id;
    }
    else
        return new Promise((resolve) => {
            resolve(false);
        });
    return new Promise((resolve, reject) => {
        instance.get("/public/check/" + id).then((response) => {
            console.log(response.data)
            resolve(true);
        })
            .catch((err) => {
                resolve(false);
                if(Cookies.get("bookuser") !== undefined)
                    Cookies.remove("bookuser");
                reject(err);
            })
    });
}

export const ADCheckAuth = () =>{
    let id;
    let us = getUser();
    if(us)
    {
        console.log("aa");
        id = us.id;
    }
    else
        return new Promise((resolve) => {
            resolve(false);
        });
    return new Promise((resolve, reject) => {
        instance.get("/public/check/checkAdmin/" + id).then((response) => {
            resolve(true)
        })
            .catch((err) => {
                resolve(false);
                if(Cookies.get("bookuser") !== undefined)
                    Cookies.remove("bookuser");
                reject(err);
            })
    })
}

export const Register = (newUser) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "POST",
            url: "/register",
            headers: {'Content-Type': 'application/json'},
            data: newUser,
        })
            .then((res) => {
                resolve(true)
            })
            .catch((err) => {
                alert("注册失败 : ", err)
            })
    })
}

export const getAvatar = () => {
    return new Promise((resolve, reject) => {
        instance.get("/public/getAvatar/" + getUser().id)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const updateSrc = (id, text) => {
    return new Promise((resolve, reject) => {
        instance({
            method: "POST",
            url: "/public/updateAvatar?id=" + id,
            headers: {'Content-Type': 'application/json'},
            data: {"src": text}
        })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}