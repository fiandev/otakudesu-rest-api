import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

const getAnimeData = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const rseries = window.document.querySelectorAll(".rseries")
  let result = {}
  try {
    rseries.forEach(series => {
      let posts = rseries.querySelectorAll(".detpost")
      let seriesName = series.querySelector(".rvad h1").textContent
      result[seriesName] = []
      posts.forEach((post, i) => {
        let judulAnime = post.querySelector(".jdlfilm").textContent
        let thumbnail = post.querySelector(".wp-post-image").getAttribute("src")
        let episode = post.querySelector(".epz").textContent
        let epztipe = post.querySelector(".epztipe").textContent
        let dateRelease = post.querySelector(".newnime").textContent
        let linkAnime = post.querySelector(".thumb a").getAttribute("href")
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
