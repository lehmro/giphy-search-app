import React, { memo, useState } from "react";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";

//Components
import MediaComponent from "./../MediaComponent/MediaComponent";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  gif_body: {
    height: "auto",
    width: "100%",
    background: "#000000",
    textAlign: "center"
  },
  gif_container: {
    width: "100vh",
    height: "100vh",
    maxWidth: "800px",
    maxHeight: "800px",
    margin: "0 auto"
  },
  gif_btn: {
    position: "absolute",
    top: "50%",
    height: "2em",
    width: "2em",
    MsTransform: "translateY(-50%)",
    transform: "translateY(-50%)",
    cursor: "pointer",
    opacity: "0.85",
    "&:hover, &:focus": {
      opacity: "1"
    },
    "&:active": {
      MsTransform: "translateY(-50%) scale(0.85)",
      transform: "translateY(-50%) scale(0.85)"
    }
  },
  previous_gif: {
    left: "2vw"
  },
  next_gif: {
    right: "2vw"
  },
  unload_lightbox: {
    top: "1vw",
    right: "1vw",
    width: "1em",
    height: "1em"
  }
}));

export default memo(function LightBoxComponent(props) {
  const classes = useStyles();
  const [pos, setPos] = useState(props.index);

  const updateLightbox = (pos, action) => {
    switch (action.type) {
      case "previous":
        return pos === 0 ? setPos(props.media.length - 1) : setPos(pos - 1);
      case "next":
        return pos >= props.media.length - 1 ? setPos(0) : setPos(pos + 1);
      default:
        return setPos(pos);
    }
  };

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <div className={classes.gif_body} open={true}>
        <div className={classes.gif_container}>
          <ChevronLeftIcon
            className={`${classes.gif_btn} ${classes.previous_gif}`}
            onClick={() => updateLightbox(pos, { type: "previous" })}
          />
          <ChevronRightIcon
            className={`${classes.gif_btn} ${classes.next_gif}`}
            onClick={() => updateLightbox(pos, { type: "next" })}
          />
          <CloseIcon
            className={`${classes.gif_btn} ${classes.unload_lightbox}`}
            onClick={props.unloadLightbox}
          />
          <MediaComponent gif={props.media[pos]} type="lightbox" />
        </div>
      </div>
    </Backdrop>
  );
});
