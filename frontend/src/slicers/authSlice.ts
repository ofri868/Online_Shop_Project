import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getAuthData, getProfile, logIn, logOut, register, updProfile } from '../APIs/authAPI';
import { RootState } from '../app/store';
import { AuthDetails } from '../models/AuthDetails';
import { Profile } from '../models/Profile';

export interface AuthenticationState {
  myToken: string;
  refreshToken:string
  logged: boolean
  userProfile: Profile
  userAuthDetails: AuthDetails
}

const initialState: AuthenticationState = {
  myToken: '',
  logged: false,
  userProfile: { created: false, first_name: '', last_name: '', address: '', city: '', zip_code: '', billing_address: '', billing_city: '', billing_zip_code: '', image: '' },
  refreshToken: '',
  userAuthDetails: {}
};

export const logInAsync = createAsyncThunk(
  'auth/logIn',
  async (creds: {username:string, password:string}) => {
    const response = await logIn(creds.username, creds.password);
    return response.data;
  }
);

export const logOutAsync = createAsyncThunk(
  'auth/logOut',
  async (data:{myToken:string, refreshToken:string}) => {
    const response = await logOut(data.myToken, data.refreshToken);
    return response.data;
  }
);

export const getProfileAsync = createAsyncThunk(
  'auth/getProfile',
  async (myToken: string) => {
    const response = await getProfile(myToken);
    return response.data;
  }
);
export const getAuthDataAsync = createAsyncThunk(
  'auth/getAuthData',
  async (myToken: string) => {
    const response = await getAuthData(myToken);
    return response.data;
  }
);
export const updProfileAsync = createAsyncThunk(
  'auth/updProfile',
  async (data: {profile:any, token:string}) => {
    const response = await updProfile(data.profile, data.token);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  'auth/addProd',
  async (creds: {username:string, password:string, email:string}) => {
    const response = await register(creds.username, creds.password, creds.email);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state) => {
      if (!state.logged) {
        if (sessionStorage.getItem('token')) {
          state.myToken = JSON.parse(sessionStorage.getItem('token') || '')
          state.logged = true
          state.refreshToken = JSON.parse(sessionStorage.getItem('refresh_token') || '')
        }
      }
    },
    loadProfile: (state)=>{   
      state.userProfile = JSON.parse(sessionStorage.getItem('profile') || '{}')
    },
    loadAuthDetails: (state)=>{   
      state.userAuthDetails = JSON.parse(sessionStorage.getItem('auth_details') || '{}')
    },
    changeProfile: (state, action)=>{   
      state.userProfile = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.fulfilled, (state, action) => {
        state.myToken = action.payload.access
        state.refreshToken = action.payload.refresh
        sessionStorage.setItem("token", JSON.stringify(state.myToken))
        sessionStorage.setItem("refresh_token", JSON.stringify(state.refreshToken))
        state.logged = true
        let decoded:any = jwtDecode(action.payload.access)
        state.userAuthDetails.email = decoded.email
        state.userAuthDetails.isAdmin = decoded.isAdmin
        state.userAuthDetails.username = decoded.username
        sessionStorage.setItem("auth_details", JSON.stringify(state.userAuthDetails))
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.myToken = ''
        sessionStorage.setItem("token", '')
        sessionStorage.setItem("profile", '{}')
        sessionStorage.setItem("auth_details", '{}')
        state.logged = false
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.myToken = ''
        state.logged = true
      }).addCase(getProfileAsync.fulfilled, (state, action) => {
        state.userProfile = action.payload[0]
        sessionStorage.setItem("profile", JSON.stringify(action.payload[0]))
      })
      .addCase(updProfileAsync.fulfilled, (state, action) => {
        state.userProfile = action.payload
        
      })

  },
});

export const { getToken, changeProfile, loadProfile, loadAuthDetails } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.myToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectLogged = (state: RootState) => state.auth.logged;
export const selectProfile = (state: RootState) => state.auth.userProfile;
export const selectAuthDetails = (state: RootState) => state.auth.userAuthDetails;
export default authSlice.reducer;
