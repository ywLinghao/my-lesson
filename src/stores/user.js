import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {

    state: () => ({
        user: {
            "state": 1,
            "id": 0,
            "userName": "",
            "userType": "",
            "token": "",
            "binding": 0,
            "createTime": "",
            "updateTime": "",
            "email": ""
        }
    }),
    actions: {
        setUser(user) {
            this.user = user
        },
        //获取用户信息
        getUserInfo(){
            return this.user
        }
    }
})