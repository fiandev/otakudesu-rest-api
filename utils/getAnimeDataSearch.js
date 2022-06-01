import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

const getAnimeDataSearch = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const page = window.document.querySelectorAll(".page")
  let result = {}
  let totalPage = 1
  try {
    page.forEach(series => {
      let posts = series.querySelectorAll(".chivsrc li")
      let msg = series.querySelector(".rvad h1").textContent
      result["message"] = msg
      result["result"] = []
      posts.forEach((post, i) => {
        let judulAnime = post.querySelector("h2 a").textContent
        let thumbnail = post.querySelector("img.wp-post-image").getAttribute("src")
        let linkAnime = post.querySelector("h2 a").getAttribute("href")
        let dataAnime = {
          "judul": judulAnime,
          "thumbnail": thumbnail,
          "link": linkAnime,
          "info": {}
        }
        let sets = post.querySelectorAll(".set")
        sets.forEach(_set => {
          let key = _set.querySelector("b").textContent
        _set.querySelector("b").remove()
         dataAnime.info[key] = _set.textContent.split(" : ").join("")
         dataAnime.info[key] = (isNaN(parseFloat(dataAnime.info[key]))) ? dataAnime.info[key] : parseFloat(dataAnime.info[key]) 
          if (_set.querySelectorAll("a").length > 0) {
            dataAnime.info[key] = []
            _set.querySelectorAll("a").forEach(genre => {
              dataAnime.info[key].push(genre.textContent)
            })
          }
        })
        result["result"].push(dataAnime)
      })
    })
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result };
};

export default getAnimeDataSearch;
