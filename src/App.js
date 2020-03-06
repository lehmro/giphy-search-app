import React, { useState } from "react";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Components
import GridComponent from "./components/GridComponent/GridComponent";
import SearchComponent from "./components/SearchComponent/SearchComponent";

const useStyles = makeStyles(theme => ({
  container: {
    width: "650px"
  }
}));

export default function App() {
  const classes = useStyles();
  const [query, setQuery] = useState("funny");

  return (
    <Container className={classes.container}>
      <SearchComponent query={query} setQuery={setQuery} />
      <GridComponent query={query} />
    </Container>
  );
}
