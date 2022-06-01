import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

const getAnimeDataSearch = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const page = window.document.querySelector(".page")
  let result = []
  let totalPage = 1
  try {
  const animes = page.querySelectorAll(".col-anime-con .col-anime")
  const msg = page.querySelector(".rvad h1").textContent
    animes.forEach(anime => {
      let objAnime = {}
      let rating = anime.querySelector(".col-anime-rating").textContent
      let pagination = window.document.querySelectorAll(".pagination .page-numbers")
      totalPage = parseInt(pagination[pagination.length - 2].textContent)
      objAnime["title"] = anime.querySelector(".col-anime-title a").textContent
      objAnime["rating"] = (isNaN(parseFloat(rating))) ? "-" : parseFloat(rating)
      objAnime["link"] = anime.querySelector(".col-anime-title a").getAttribute("href")
      objAnime["studio"] = anime.querySelector(".col-anime-studio").textContent
      objAnime["total_eps"] = anime.querySelector(".col-anime-eps").textContent
      objAnime["release"] = anime.querySelector(".col-anime-date").textContent
      objAnime["cover"] = anime.querySelector(".col-anime-cover img").getAttribute("src")
      objAnime["genres"] = []
      anime.querySelectorAll(".col-anime-genre a").forEach(genre => {
        objAnime["genres"].push(genre.textContent)
      })
      
      result.push(objAnime)
    })
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result, totalPage };
};

export default getAnimeDataSearch;
