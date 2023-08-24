// this is where all redux is

import { createSlice } from "@reduxjs/toolkit";

// global states! can be used anywhere in code app
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //functions that modify the global state up above initals
    setMode: (state) => {
      //wen user selects between light and dark mode
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      //wen user presses "Log in" after inputting info:
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      //show friends
      if (state.user) {
        // if user is loggin in
        state.user.friends = action.payload.friends;
      } else {
        console.error("girl u Need to sign in!");
      }
    },
    setPosts: (state, action) => {
      //show posts
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      //updating a post
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; //REPLACE old post with new post
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      //delete post
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  deletePost,
} = authSlice.actions;

export default authSlice.reducer;
