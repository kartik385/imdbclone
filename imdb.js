let input = document.querySelector(`input`);
let section = document.querySelector(`section`);
let searchIcon = document.querySelector(`span`);

//speech Recognition
searchIcon.addEventListener("click", (e) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.addEventListener(`result`, (e) => {
    let text = e.results[0][0].transcript;
    input.value = text;
    searchMovie(text);
  });

  recognition.start();
});

//manual
input.addEventListener(`keyup`, (e) => {
  if (e.key === `Enter`) {
    searchMovie(e.target.value);
  }
});
function searchMovie(text) {
  window
    .fetch(`http://www.omdbapi.com/?s=${text}&apikey=51aa0639`)
    .then((movies) => movies.json().then((movie) => display(movie.Search)))
    .catch((err) => console.log(err))
    .catch((err) => console.log(err));
}
function display(movies) {
  if (movies) {
    let output = ``;
    movies.forEach((movie) => {
      console.log(movie);
      output += `
              <div>
                  <img src=${movie.Poster} alt=${movie.Title} />
                  <h1>${movie.Title}</h1>
                  <p>${movie.Type}</p>
                  <p>${movie.Year}</p>
              
              </div>
          `;
    });
    section.innerHTML = output;
  } else {
    section.innerHTML = `<p>Sorry No Results found!</p>`;
  }
}
