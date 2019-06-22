import axios from 'axios';

const apiNodeURL = 'https://learwebnode.appspot.com/user';
const apiSpringURL = 'https://learnweb.appspot.com/lms/user';


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


export const getUserById = (userId) => {

    return axios({
        method: 'GET',
        url: apiNodeURL + '/id/' + userId,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })

};


export const getUserByUsername = (username) => {

    return axios({
        method: 'GET',
        url: apiNodeURL + '/username/' + username,
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

export const sendVerifyMail = (userId) => {

    return axios({
        method: 'GET',
        url: apiNodeURL + '/verify/send/' + userId,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};


export const verifyUser = (userId, code) => {

    return axios({
        method: 'POST',
        url: apiNodeURL + '/verify/' + userId,
        data: code,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};


export const updateUser = (userId, user) => {

    return axios({
        method: 'PUT',
        url: apiNodeURL + '/' + userId,
        data: user,
        config: {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    })
};


