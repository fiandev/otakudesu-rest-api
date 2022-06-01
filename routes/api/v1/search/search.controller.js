import api from "#config/api";
import getAnimeDataSearch from "#utils/getAnimeDataSearch";
import getSearchAnimeByGenre from "#utils/getSearchAnimeByGenre";
import {author, date} from "#config/info"
export const index = async (req, res) => {
  const numPage = req.param.page || 1
  const $_GET = req.query
  let htmlCode
  if ($_GET["q"]) {
    const homePage = await api(`/?s=${req.query.q}&post_type=anime`);
    htmlCode = homePage.data;
    const { result } = getAnimeDataSearch({ htmlCode });
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
        totalItems: result.length,
        author: author,
        date: date
      });
    }
  } else if ($_GET["genre"]) {
    let genre = req.query.genre.toLowerCase().split(" ").join("-")
    
    const homePage = await api(`/genres/${genre}`);
    htmlCode = homePage.data;
    const { result, totalPage } = getSearchAnimeByGenre({ htmlCode });
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
        totalItems: result.length,
        author: author,
        date: date,
        total_page: totalPage,
        current_page: Number(numPage)
      });
    }
  }
  /* return false or not found! */
};
