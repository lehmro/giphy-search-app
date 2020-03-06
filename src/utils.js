/*
 *   everstate-giphy utils.js
 *   Last Modified 05.03.2020
 *   By: Robert Lehmann
 */

import axios from "axios";

// call to api
const fetch = params => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/v1/gifs/search",
      params: {
        api_key: params.api_key,
        q: params.query,
        limit: params.limit,
        offset: params.offset,
        rating: params.rating,
        lang: params.lang,
        random_id: params.random_id
      }
    })
      .then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export { fetch };
