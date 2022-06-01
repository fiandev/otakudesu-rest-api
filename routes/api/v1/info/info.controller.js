import jsdom from "jsdom";
import axios from "axios";

import getInfoAnime from "#utils/getInfoAnime";
import {author, date} from "#config/info"
export const index = async (req, res) => {
  const url = req.query.url
  const result = await getInfoAnime(url);
  /* return false or not found! */
  if (result == false) {
    res.json({
      status: 404,
      message: "not found!",
      author: author,
      date: date
    });
  /* success */
  } else {
    res.json({
      status: 200,
      data: result,
      author: author,
      date: date
    });
  }
};
