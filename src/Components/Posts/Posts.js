import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
export default function Posts({ setCurrentId }) {
  const clases = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading) {
    return "No Posts";
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={clases.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((e) => (
        <Grid item key={e._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={e} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
