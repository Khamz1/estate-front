import {configureStore} from '@reduxjs/toolkit'
import estates from '../features/estate.slice'
import comments from '../features/comments.slice'
export const store = configureStore({
    reducer:{
    estates,
    comments
    }
})