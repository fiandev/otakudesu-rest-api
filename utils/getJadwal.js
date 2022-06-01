import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

const getJadwal = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const page = window.document.querySelector(".page")
  const jdlpot = page.querySelector(".jdlpot")
  const jadwalContainer = jdlpot.nextElementSibling
  const jadwals = jadwalContainer.querySelectorAll("div")
  let result = {}
  try {
    jadwals.forEach(jadwal => {
      let key = jadwal.querySelector("h2").textContent
      result[key] = []
      jadwal.querySelectorAll("ul li a").forEach(anime => {
        result[key].push(anime.textContent)
        
      })
    })
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result };
};

export default getJadwal
