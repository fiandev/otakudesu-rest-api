import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

const getListGenre = ({ htmlCode }) => {
  const { window } = new JSDOM(htmlCode);
  const genres = window.document.querySelectorAll(".genres li a")
  let result = []
  try {
    genres.forEach(genre => {
      result.push(genre.textContent)
    })
    
  } catch (e) {
    console.log(e);
    return false
  }
  /* return */
  return { result };
};

export default getListGenre;
