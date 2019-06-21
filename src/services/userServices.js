import axios from 'axios';

const apiNodeURL = 'http://localhost:4200/user';
const apiSpringURL = 'http://localhost:8080/lms/user';


export const loginUser = (user) => {

    return axios({
        method: 'POST',
        url: apiNodeURL + '/login',
        data: user,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};

export const getUsers = () => {

    return axios({
        method: 'GET',
        url: apiNodeURL,
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
        url: apiSpringURL + '/register',
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
