import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'alert',
  initialState: {
    user:JSON.stringify(localStorage.getItem("token")) ||null,
    userInfo:JSON.parse(JSON.stringify(localStorage.getItem("user")))
  },
  reducers: {
   updateUser:(state,action)=>{
  state.userInfo = action.payload;
   },
   
  },
})

export const { updateUser} = userSlice.actions

export default userSlice.reducer