import axios from "axios";
import * as cheerio from "cheerio";

const getAnimeData = ({ htmlCode }) => {
  const $ = cheerio.load(htmlCode);
  let result = {}
  try {
    $(".rseries").each(series => {
      let seriesName = $(series).find(".rvad h1").text()
      result[seriesName] = []
      $(".rseries .detpost").each((post, i) => {
        let judulAnime = $(post).find(".jdlfilm").text()
        let thumbnail = $(post).find(".wp-post-image").attr("src")
        let episode = $(post).find(".epz").text()
        let epztipe = $(post).find(".epztipe").text()
        let dateRelease = $(post).find(".newnime").text()
        let linkAnime = $(post).find(".thumb a").attr("href")
        let dataAnime = {
          "judul": judulAnime,
          "thumbnail": thumbnail,
          "link": linkAnime,
          "info": {
            "episode": episode,
            "dateRelease": dateRelease
          }
        }
        if (isNaN(parseFloat(epztipe))) {
          dataAnime.info["dayRelease"] = epztipe
        } else {
          dataAnime.info["rating"] = parseFloat(epztipe)
        }
        
        result[seriesName].push(dataAnime)
      })
    })
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result };
};

export default getAnimeData;
