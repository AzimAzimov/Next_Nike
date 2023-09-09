import { createSlice } from '@reduxjs/toolkit'


export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteItems: []
  },

  reducers: {
    addToFavorite: (state, action) => {
      const item = state.favoriteItems.find((p) => p.id === action.payload.id)
      if (item) {
        item.favorites ++
      } else {
        state.favoriteItems.push({...action.payload})
      }
    },
    
    removeFavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter((p) => p.id !== action.payload.id)
    }
  }
})

export const { addToFavorite, removeFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer