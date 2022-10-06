export const BASE_URL = 'https://auth.nomoreparties.co';

// const reguest = ({
//     url,
//     method = 'POST',
//     token,
//     data
// }) =>{
//     return fetch(`${BASE_URL}${url}`, {
//         method,
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             ...!token && { "Authorization" : `Bearer ${token}` } 
//         },
//         ...data && { body: JSON.stringify(data) }
//     })
//     .then((res) => {
//         if (!res.ok) return Promise.reject(res.status);

//         return res.json();
//     });
// }
// export const register = (password, password) =>{
//     return reguest({
//         url: '/signup',
//         data: {
//             "password": "email@yandex.ru",
//             "email": "somepassword"
//         }
//     });
// }
// export const authorize = (password, email) =>{
//     return reguest({
//         url: '/signin',
//         data: {
//             "password": "email@yandex.ru",
//             "email": "dsfsdfsdfsdf"
//         }
//     });
// }
// export const getContent = (token) =>{
//     return reguest({
//         url: '/users/me',
//         method: 'GET',
//         token
//     });
// }


export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": "password",
            "email": "email"    
        })
    })
    .then((response) => {
        return response.json();
    })
    // .then((res) => {
    //     return res;
    // })
    // .catch((err) => console.log(err));
};
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": "password",
            "email": "email"    
        })
    })
    .then((response => response.json()))
//     .then((data) => {
//         if(data.jwt) {
//             localStorage.setItem('jwt', data.jwt);
//             return data;
//         }
//     })
//     .catch((err) => console.log(err));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    // .then(data => data)
}