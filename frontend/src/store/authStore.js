import { create } from "zustand";
import { axiosAPI } from "../lib/axios";

export const authState =create((set,get)=>({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdating: false,
    isCheckingAuth: true,
    error:null,
    isVerifying: false,
    isLoggingOut: false,


 checkAuth :async() =>{
       set({
            isCheckingAuth: true,
           
        })
    try {
          set({
            isCheckingAuth: false,
        })
        const res = await axiosAPI.get('/user/check')
        set({
            isCheckingAuth: false,
            authUser: res.data,
        })
       
    } catch (error) {
        set({
            isCheckingAuth: false,
           authUser: null
        })
        console.log(error)
    }
    finally{
     
    }
    },

    signup: async(data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosAPI.post('/user/signup',data)
            set({
                isSigningUp: false,
                authUser: res.data.user
            })
            return true;
        } catch (error) {
            set({
                isSigningUp: false,
                error: error.response.data.error
            })
            return false;
        }
        finally{
            set({isSigningUp: false})
        }
    },
     login: async(data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosAPI.post('/user/login',data)
            set({
                isLoggingIn: false,
                authUser: res.data.user
            })
        } catch (error) {
            set({
                isSigningUp: false,
                error: error.response.data.error
            })
        }
        finally{
            set({isLoggingIn: false})
        }
    },

verifyy:async(data)=>{
    set({isVerifying: true})
    try {
        const res = await axiosAPI.post('/user/verify',data)
        set({
            isVerifying: false,
            authUser: {...get().authUser, isVerified:true}
        })
        return true
    } catch (error) {
        set({
             error: error.response.data.error
        })
        return false
    }
    finally{
        set({
            isVerifying: false
        })
    }
},
logout: async()=>{
    set({isLoggingOut: false})
    try {
        const res = await axiosAPI.post('/user/logout')
        set({
            isLoggingOut: true,
            authUser: null
        })
    } catch (error) {
        
    }
}
    
}))