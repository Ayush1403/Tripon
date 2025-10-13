import { setAuthToken, clearAuthToken } from "../lib/axios";
import { create } from "zustand";
import { axiosAPI } from "../lib/axios";

export const authState = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdating: false,
    isCheckingAuth: true,
    error: null,
    isVerifying: false,
    isLoggingOut: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            console.log('🔍 Checking auth...');
            const res = await axiosAPI.get('/user/check');
            console.log('✅ Auth check successful:', res.data);
            set({
                isCheckingAuth: false,
                authUser: res.data,
                error: null,
            });
        } catch (error) {
            console.error('❌ Auth check failed:', error.response?.data || error.message);
            set({
                isCheckingAuth: false,
                authUser: null,
                error: error.response?.data?.error || "Not authenticated"
            });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true, error: null });
        try {
            console.log('📝 Signing up...');
            const res = await axiosAPI.post('/user/signup', data);
            console.log('✅ Signup successful:', res.data);
            set({
                isSigningUp: false,
                authUser: res.data.user,
                error: null,
            });
            return true;
        } catch (error) {
            console.error('❌ Signup failed:', error.response?.data);
            set({
                isSigningUp: false,
                error: error.response?.data?.error || "Signup failed"
            });
            return false;
        }
    },

  login: async (data) => {
        set({ isLoggingIn: true, error: null });
        try {
            console.log('🔐 Logging in...');
            const res = await axiosAPI.post('/user/login', data);
            console.log('✅ Login successful:', res.data);
            
            // ✅ Store token in memory
            if (res.data.token) {
                setAuthToken(res.data.token);
            }
            
            set({
                isLoggingIn: false,
                authUser: res.data.user,
                error: null,
            });
            return true;
        } catch (error) {
            console.error('❌ Login failed:', error.response?.data);
            set({
                isLoggingIn: false,
                error: error.response?.data?.error || "Login failed"
            });
            return false;
        }
    },

    logout: async () => {
        set({ isLoggingOut: true, error: null });
        try {
            console.log('🔓 Logging out...');
            await axiosAPI.post('/user/logout');
            
            // ✅ Clear token from memory
            clearAuthToken();
            
            console.log('✅ Logout successful');
            set({
                isLoggingOut: false,
                authUser: null,
                error: null,
            });
        } catch (error) {
            clearAuthToken(); // Clear even on error
            console.error('❌ Logout failed:', error.response?.data);
            set({
                isLoggingOut: false,
                error: error.response?.data?.error || "Logout failed"
            });
        }
    },

    verifyy: async (data) => {
        set({ isVerifying: true, error: null });
        try {
            console.log('✔️ Verifying OTP...');
            const res = await axiosAPI.post('/user/verify', data);
            console.log('✅ Verification successful:', res.data);
            set({
                isVerifying: false,
                authUser: { ...get().authUser, isVerified: true },
                error: null,
            });
            return true;
        } catch (error) {
            console.error('❌ Verification failed:', error.response?.data);
            set({
                isVerifying: false,
                error: error.response?.data?.error || "Verification failed"
            });
            return false;
        }
    },


    clearError: () => set({ error: null }),
}));
