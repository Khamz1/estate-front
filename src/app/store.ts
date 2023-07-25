import {configureStore} from '@reduxjs/toolkit'
import estates from '../features/estate.slice'
export const store = configureStore({
    reducer:{
    estates
    }
})