import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";
import {jwtDecode} from "jwt-decode";


export const admin_login = createAsyncThunk("auth/admin_login", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("/admin-login", info, {withCredentials: true})
        localStorage.setItem("accessToken", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

// ! seller register
export const seller_register = createAsyncThunk("auth/seller_register", async (info, {
    rejectWithValue,
    fulfillWithValue
}) => {
    try {
        const {data} = await api.post("/seller-register", info, {withCredentials: true})
        localStorage.setItem("accessToken", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


// ! get  admin and seller info
export const get_user_info = createAsyncThunk("auth/get_user_info", async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.get("/get-user", {withCredentials: true})
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

// ! seller login
export const seller_login = createAsyncThunk("auth/seller_login", async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post("/seller-login", info, {withCredentials: true})
        localStorage.setItem("accessToken", data.payload)
        return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

// ! decoded token

const returnRole = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token)
        const expireTime = new Date(decodedToken.exp * 1000);
        if (new Date() >= expireTime) {
            localStorage.removeItem("accessToken")
            return ""
        } else {
            return decodedToken.role
        }
    } else {
        return ""
    }
}


export const authReducer = createSlice({
    name: "auth", initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: "",
        role: returnRole(localStorage.getItem("accessToken")),
        token: localStorage.getItem("accessToken"),
    }, reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
        
    }, extraReducers: builder => {
        
        builder.addCase(admin_login.pending, (state, _) => {
            state.loader = true;
        });
        builder.addCase(admin_login.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(admin_login.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.token = payload.payload;
            state.role = returnRole(payload.payload);
            
        });
        builder.addCase(seller_register.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(seller_register.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
        });
        builder.addCase(seller_login.pending, (state, _) => {
            state.loader = true;
        });
        builder.addCase(seller_login.rejected,(state, {payload})=> {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(seller_login.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.token = payload.payload;
            state.role = returnRole(payload.payload);
        });
        builder.addCase(get_user_info.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.userInfo = payload.payload
        });
    },
});


export const {messageClear} = authReducer.actions;
export default authReducer.reducer;
