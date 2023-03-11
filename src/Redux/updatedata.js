import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
  name: 'progress',
  initialState: {
   updated:true
  },
  reducers: {
   changeUpdate:(state)=>{
  state.updated =!state.updated;
   }
  },
})

export const { changeUpdate} = updateSlice.actions

export default updateSlice.reducer