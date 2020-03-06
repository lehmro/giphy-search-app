import React, { memo, useState, useEffect } from "react";

//utils
import { fetch } from "../../utils.js";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Components
import MediaComponent from "./../MediaComponent/MediaComponent";
import LightBoxComponent from "./../LightBoxComponent/LightBoxComponent";

const useStyles = makeStyles(theme => ({
  grid: {
    width: "100%",
    margin: "0 auto"
  },
  paper: {
    position: "relative",
    margin: "5px",
    width: "190px",
    height: "190px"
  },
  loader: {
    position: "absolute",
    left: "0",
    right: "0",
    top: "50%",
    MsTransform: "translate(-50%, -50%)",
    transform: "translatY(-50%, -50%)",
    margin: "0 auto"
  },
  btn_lm: {
    width: "100%",
    margin: "1em auto"
  }
}));

const buildParams = (
  api_key,
  query,
  limit,
  offset,
  rating,
  lang,
  random_id
) => {
  return {
    api_key: api_key,
    query: query,
    limit: limit,
    offset: offset,
    rating: rating,
    lang: lang,
    random_id: random_id
  };
};

export default memo(function GridComponent(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(21);
  const [toggleLightbox, setToggleLightbox] = useState(false);
  const [index, setIndex] = useState(0);

  const addMedia = () => {
    if (props.query.length > 0) {
      setLoading(true);
      fetch(
        buildParams(
          "bUoPgBSfkoX9ZTCp57j14LOKZlq3BnGp",
          props.query,
          limit,
          offset,
          "",
          "en",
          ""
        )
      ).then(result => {
        setLoading(false);
        setMedia(media => [...media, ...result]);
      });
    }
  };

  useEffect(() => {
    addMedia();
  }, [offset]);

  useEffect(() => {
    setMedia([]);
    addMedia();
  }, [props.query]);

  const loadMore = () => {
    setOffset(offset => offset + limit);
  };

  const loadLightbox = index => {
    if (index >= 0 && index < media.length) {
      setIndex(index);
      setToggleLightbox(true);
    }
  };

  const unloadLightbox = () => {
    setIndex(0);
    setToggleLightbox(false);
  };

  return (
    <div>
      {toggleLightbox && (
        <LightBoxComponent
          loadLightbox={loadLightbox}
          unloadLightbox={unloadLightbox}
          media={media}
          index={index}
        />
      )}
      <Grid className={classes.grid} container spacing={1}>
        {media &&
          media.map((gif, key) => {
            return (
              <Paper key={key} className={classes.paper}>
                <MediaComponent
                  index={key}
                  gif={gif}
                  loadLightbox={loadLightbox}
                  type="grid"
                />
              </Paper>
            );
          })}
        {loading && (
          <Paper className={classes.paper}>
            <CircularProgress className={classes.loader} disableShrink />
          </Paper>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={loadMore}
        disableElevation
        className={classes.btn_lm}
      >
        Load More
      </Button>
    </div>
  );
});
