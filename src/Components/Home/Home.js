import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
  AppBar,
  Button,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPostBySearch } from "../../actions/posts";
import Paginate from "../Pagination/Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Home() {
  const clases = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    }
  };
  const handelKeyPress = (e) => {
    if (e.KeyCode === 13) {
      searchPost();
    }
  };
  const handelAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handelDelete = (toggelDelete) => {
    setTags(tags.filter((tag) => tag !== toggelDelete));
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={clases.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={clases.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                onKeyDown={handelKeyPress}
                label="Search Memories"
                value={search}
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handelAdd}
                onDelete={handelDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                color="primary"
                className={clases.searchButtn}
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={clases.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
