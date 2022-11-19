import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";
function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPage } = useSelector((state) => state.posts);
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPage}
      variant="outlined"
      page={Number(page) || 1}
      color="primary"
      renderItem={(items) => (
        <PaginationItem
          {...items}
          component={Link}
          to={`/posts?page${items.page}`}
        />
      )}
    />
  );
}

export default Paginate;
