import { createSlice } from '@reduxjs/toolkit'

export const APIULR = createSlice({
  name: 'APIULR',
  initialState: {
    //Digitalocean droplet, ssl with free domain
    URL: "https://matura-api.duckdns.org/",
  },
  reducers: {
    Update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload)
      state.URL = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { Update } = APIULR.actions

export default APIULR.reducer