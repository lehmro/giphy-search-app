import React, { memo } from "react";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";

export default memo(function MediaComponent(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    grid_gif: {
      backgroundImage: `url(${props.gif.images["480w_still"].url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100%",
      "&:hover, &:focus, &:active": {
        backgroundImage: `url(${props.gif.images["downsized"].url})`
      }
    },
    lightbox_gif: {
      backgroundImage: `url(${props.gif.images["downsized"].url})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      height: "100%"
    }
  }));
  const classes = useStyles();
  return (
    <div
      className={
        props.type === "grid" ? classes.grid_gif : classes.lightbox_gif
      }
      onClick={() =>
        props.type === "grid" ? props.loadLightbox(props.index, true) : ""
      }
    />
  );
});
