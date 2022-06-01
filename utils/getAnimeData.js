import jsdom from "jsdom";
import axios from "axios";
import getInfoAnime from "#utils/getInfoAnime";
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});
const getAnimeData = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode, { virtualConsole });
  const rseries = window.document.querySelectorAll(".rseries")
  let result = {}
  try {
    rseries.forEach(series => {
      let posts = series.querySelectorAll(".detpost")
      let seriesName = series.querySelector(".rvad h1").textContent.toLowerCase()
      seriesName = seriesName.split("-").join("_")
      seriesName = seriesName.split(" ").join("_")
      seriesName = seriesName.split("_").join("")
      seriesName = seriesName.split("anime").join("")
      seriesName = seriesName.split("terbaru").join("")
      seriesName = seriesName.split("List_&_Jadwal_Anime_").join("")
      result[seriesName] = []
      posts.forEach((post, i) => {
        let judulAnime = post.querySelector(".thumb a .thumbz .jdlflm").textContent
        let thumbnail = post.querySelector(".thumb a .thumbz .wp-post-image").getAttribute("src")
        let episode = post.querySelector(".epz").textContent.substr(0)
        let epztipe = post.querySelector(".epztipe").textContent.substr(1)
        let dateRelease = post.querySelector(".newnime").textContent
        let linkAnime = post.querySelector(".thumb a").getAttribute("href")
        let dataAnime = {
          "title": judulAnime,
          "thumb": thumbnail,
          "link": linkAnime,
          "info": {
            "release_date": dateRelease
          }
        }
        if(seriesName == "complete"){
          dataAnime.info["total_eps"] = episode
        } else {
          dataAnime.info["latest_episode"] = parseInt(
            episode.split(" Episode ").join("")
            )
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
