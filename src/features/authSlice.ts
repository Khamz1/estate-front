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
  userId:string | null;
  user: User

}

interface User {
  fullName?: string;
  email?: string;
  password?: string;
  estate?:[],
  favorites?:[] ;
}

interface UserState {
  users: User[];
}


const initialState: ApplicationState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("token")
    ? parseJwt(localStorage.getItem("token"))?.id
    : null,
  user: {},
};
export function parseJwt(token) {
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return null;
}

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
export const getOneUser = createAsyncThunk(
  "user/id",
    async(_, thunkAPI) => {
      try {
        const res = await fetch(`http://localhost:4000/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          }
        })

        const json = await res.json();
        return json;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
)

export const addFavorite = createAsyncThunk(
  "estate/addFavorite",
  async (estateId, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId

    try {
      const res = await fetch(`http://localhost:4000/addFavorites/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: estateId }),
      });
      const favorites = await res.json();

      if (favorites.error) {
        return thunkAPI.rejectWithValue(favorites.error);
      }
      return favorites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const removeFavorite = createAsyncThunk(
//   "estate/removeFavorite",
//   async(estateId,thunkAPI ) => {
//     const userId = thunkAPI.getState().auth.userId
//     try {
//       const res = await fetch(`http://localhost:4000/removeFavorite/${userId}`, {
//         method:"PATCH",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body:JSON.stringify({favorites:estateId})
//       })
//       const favorites = await res.json()
//       if(favorites.error) {
//         return thunkAPI.rejectWithValue(favorites.error)
//       }
//       return favorites
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// )

const authSlice = createSlice({
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
        })
        .addCase(getOneUser.fulfilled, (state, action ) => {
          state.user = {
            ...state.user,
            favorites: action.payload.favorites, // предполагая, что поле favorites есть в action.payload
          };
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
          state.user.favorites = action.payload;
        })
       
    },
  });
  
  export default authSlice.reducer;
