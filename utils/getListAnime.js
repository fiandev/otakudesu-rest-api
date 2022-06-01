import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});
const getListAnime = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const abtext = window.document.querySelector("#abtext")
  const barisKelom = abtext.querySelectorAll(".bariskelom")
  let result = {}
  try {
    barisKelom.forEach(baris => {
      let key = baris.querySelector(".barispenz").textContent
      result[key] = []
      baris.querySelectorAll(".penzbar ul li").forEach(animeInfo => {
        let anime = {}
        let title = animeInfo.querySelector("a").textContent
        let status = animeInfo.querySelector("color").textContent
        anime["title"] = title
        anime["status"] = (status) == "" ? "completed" : status
        result[key].push(anime)
      })
    })
    
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result };
};

export default getListAnime;
