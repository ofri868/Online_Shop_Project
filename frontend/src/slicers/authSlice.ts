import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getProfile, logIn, logOut, register, updProfile } from '../APIs/authAPI';
import { RootState } from '../app/store';
import { Profile } from '../models/Profile';

export interface AuthenticationState {
  myToken: string;
  logged: boolean
  userProfile: Profile
}

const initialState: AuthenticationState = {
  myToken: '',
  logged: false,
  userProfile: {created: false, firstName:'', lastName:'', address:'', city: '', zipCode:'', billingAddress:'', billingCity:'', billingZipCode:'', image:''}
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
  async () => {
    const response = await logOut();
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
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.fulfilled, (state, action) => {
        state.myToken = action.payload.access
        sessionStorage.setItem("token", JSON.stringify(state.myToken))
        state.logged = true
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.myToken = ''
        sessionStorage.setItem("token", '')
        state.logged = false
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.myToken = ''
        state.logged = true
      }).addCase(getProfileAsync.fulfilled, (state, action) => {
        state.userProfile = action.payload[0]
      })
      .addCase(updProfileAsync.fulfilled, (state, action) => {
        state.userProfile = action.payload
      })

  },
});

export const { getToken } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.myToken;
export const selectLogged = (state: RootState) => state.auth.logged;
export const selectProfile = (state: RootState) => state.auth.userProfile;
export default authSlice.reducer;
