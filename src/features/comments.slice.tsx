import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};
export const fetchComments = createAsyncThunk(
  "fetch/comments",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:4000/comments`);
      const comments = await res.json();
      if (comments.error) {
        return thunkApi.rejectWithValue(comments.error);
      }
      console.log(comments ,"REDUCER")
      return thunkApi.fulfillWithValue(comments);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const postComments = createAsyncThunk(
  "post/comments",
  async (data, thunkAPI) => {
    
    try {
      const res = await fetch(`http://localhost:4000/comments`, {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({text:data}),
      });
      const comments = await res.json();
      
      if (comments.error) {
        return thunkAPI.rejectWithValue(comments.error);
      }
      return thunkAPI.fulfillWithValue( comments);
     
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComments = createAsyncThunk('delete/comments',
async (id, thunkAPI)=>{
  try {
    const res = fetch(`http://localhost:4000/comments/${id}`,{
      method:'DELETE',
      headers:{'Content-Type':'applciation/json'}
    })
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(postComments.pending, (state,action)=>{
        state.loading = true;
        state.error= null;

      })
      .addCase(postComments.rejected, (state, action)=>{
        state.loading= false;
        state.error=action.payload;

      })
      .addCase(postComments.fulfilled, (state, action)=>{
        state.loading = false;
        state.error = null;
        state.comments.push(action.payload)
      })
      .addCase(deleteComments.pending,(state, action)=>{
        state.loading=true;
        state.error = null
      })
      .addCase(deleteComments.rejected,(state, action)=>{
        state.loading=false;
        state.error = action.payload;
      })
      .addCase(deleteComments.fulfilled,(state, action)=>{
        state.loading=false;
        state.error = null;
        state.comments=state.comments.filter((item)=>{
          return item._id!==action.payload
        })
      })
  },
});

export default commentsSlice.reducer
