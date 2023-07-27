import {configureStore} from '@reduxjs/toolkit'
import estates from '../features/estate.slice'
import auth from '../features/authSlice'
import login from '../features/loginSlice'
export const store = configureStore({
    reducer:{
    estates,
    auth,
    login
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;