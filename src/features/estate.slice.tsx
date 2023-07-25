import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  estates: [],
  loading: false,
  error: null,
};

export const fetchEstates = createAsyncThunk(
  "fetch/cards",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/estates");
      const estates = await res.json();
      if (estates.error) {
        return thunkAPI.rejectWithValue(estates.error);
      }
      console.log(estates, "estates");

      return estates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const estatesSlice = createSlice({
  name: "estates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEstates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstates.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
        state.estates = action.payload;
      });
  },
});

export default estatesSlice.reducer;
