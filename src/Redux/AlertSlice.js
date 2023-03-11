import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
  update:false,
  },
  reducers: {
 updateChange(state){
  state.update = !state.update
 }
  },
})

export const { updateChange} = alertSlice.actions

export default alertSlice.reducer