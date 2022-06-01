import api from "#config/api";
import getListGenre from "#utils/getListGenre";
import {author, date} from "#config/info"
export const index = async (req, res) => {
  const homePage = await api(`/genre-list`);
  const htmlCode = homePage.data;
  const { result } = getListGenre({ htmlCode });
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
      data: result,
      totalItems: result.length,
      author: author,
      date: date
    });
  }
};
