import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./loginSlice";
import { userDataType } from "../types/login";

interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
}
interface AuthResponse {
  error: string | null;
  token: string;
}
interface ApplicationState {
  error: string | null;
  signingUp: boolean;
  signingIn: boolean;
  token: string | null;
}
const initialState: ApplicationState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password, fullName }: AuthCredentials, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      const json: AuthResponse = await res.json();
      if (Array.isArray(json)) {
        return thunkAPI.rejectWithValue(json[0].msg);
      }
      if (res.status === 200) {
        thunkAPI.dispatch(fetchLogin({ email, password } as userDataType));
      }
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlise = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(authSignUp.pending, (state) => {
          state.signingUp = true;
          state.error = null;
        })
        .addCase(authSignUp.rejected, (state, action) => {
          state.signingUp = false;
          state.error = action.payload as string;
        })
        .addCase(authSignUp.fulfilled, (state) => {
          state.signingUp = false;
          state.error = null;
        });
    },
  });
  
  export default authSlise.reducer;
