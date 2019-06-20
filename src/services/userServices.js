import axios from 'axios';

const apiBaseURL = 'http://localhost:4200/user'

export const loginUser = (user) => {

    return axios({
        method: 'POST',
        url: apiBaseURL + '/login',
        data: user,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};

export const registerUser = (user) => {

    return axios({
        method: 'POST',
        url: apiBaseURL + '/register',
        data: user,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};


// export const loginUser = (user) => {

//     return fetch(apiBaseURL + 'login', {
//         method: 'POST',
//         body: JSON.stringify(user),
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
// };




// export const loginUser = (user) => {

//     return axios.post(apiBaseURL, {
//         username: user.username,
//         password: user.password
//     },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         });
// };

// class UserService{

//     userLogin(){

//     }

// }

// export default new UserService();
