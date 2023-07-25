import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginResponse, userDataType } from "../types/login";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (data: userDataType, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response: LoginResponse = await res.json();

      if (response.err || (Array.isArray(response) && response[0].msg)) {
        return thunkAPI.rejectWithValue(response.err || response[0].msg);
      }

      localStorage.setItem("token", response.token);

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false as boolean,
    user: null as userDataType | null,
    token: localStorage.getItem("token") || (null as string | null),
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload as unknown as string;
      });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;