import React from "react";
import Post from "./Post/Post";
import useStyles from "./stylePosts.js";
import { UseSelector, useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  console.log(posts);

  return (
    <>
      <div>Posts</div>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
