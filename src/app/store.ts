import {configureStore} from '@reduxjs/toolkit'
import estates from '../features/estate.slice'
import auth from '../features/authSlice'
import login from '../features/loginSlice'
import comments from '../features/comments.slice'
export const store = configureStore({
    reducer:{
    estates,
    auth,
    login,
    comments

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;