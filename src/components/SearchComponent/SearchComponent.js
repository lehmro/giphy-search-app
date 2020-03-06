import React, { useState } from "react";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    margin: "1em auto"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: theme.spacing(1)
  }
}));

export default function SearchComponent(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const handleQueryUpdate = e => {
    e.charCode === 13 ? handleQuerySubmit() : setQuery(e.target.value);
  };

  const handleQuerySubmit = e => {
    e.preventDefault();
    props.setQuery(query);
  };

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={handleQuerySubmit}
    >
      <InputBase
        className={classes.input}
        placeholder="Search for Gif"
        onKeyUp={handleQueryUpdate}
        defaultValue={props.query}
        inputProps={{ "aria-label": "search giphy" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
