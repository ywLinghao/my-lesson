import axios from './axios'

const userLogin = (data) => {
    return axios.request({
        url:'/api/mobile/elogin',
        method:'post',
        data
    })
}

const userReg = (data) => {
    return axios.request({
        url:'/api/mobile/eregister',
        method:'post',
        data
    })
}

export {
    userLogin,
    userReg
}