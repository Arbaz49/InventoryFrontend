import { configureStore } from '@reduxjs/toolkit'
import AlertSlice from "./AlertSlice.js"
import updatedSlice from "./updatedata.js"
import userSlice from "./userSlice.js"
export default configureStore({
  reducer: {
    AlertSlice,
    updatedSlice,
    userSlice
  },
})