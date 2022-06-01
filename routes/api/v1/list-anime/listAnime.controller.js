import api from "#config/api";
import getListAnime from "#utils/getListAnime";
import {author, date} from "#config/info"
export const index = async (req, res) => {
  const homePage = await api(`/anime-list`);
  const htmlCode = homePage.data;
  const { result } = getListAnime({ htmlCode });
  /* return false or not found! */
  if (!result) {
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
      totalItems: result.length,
      data: result,
      author: author,
      date: date
    });
  }
};
