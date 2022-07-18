const constUrl = 'http://www.omdbapi.com/?apikey=17230df9';

function getFormData() {
  const movieTitle = document.getElementById('title');
  const movieYear = document.getElementById('year');
  let parameters = '';

  if (movieTitle.value === '' && movieYear.value === '') {
    alert('Please fill at least the movie title.');
    return parameters;
  }

  if (movieYear.value && movieTitle.value === '') {
    alert('Please fill at least the movie title.');
    return parameters;
  }

  parameters = `&t=${movieTitle.value}`;

  if (movieYear.value !== '') {
    parameters += `&y=${movieYear.value}`;
  }

  return parameters;
}

function createPoster(obj) {
  const poster = document.getElementById('poster');
  if (poster.childNodes.length === 0) {
    const img = document.createElement('img');
    const title = document.createElement('h4');
    img.id = 'posterImg';
    title.id = 'movieTitle';
    img.src = obj.Poster;
    title.innerText = obj.Title;
    poster.classList = 'container';
    poster.appendChild(img);
    poster.appendChild(title);
  } else {
    document.getElementById('posterImg').src = obj.Poster;
    document.getElementById('movieTitle').innerText = obj.Title;
  }
}

function fetchMovieData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      createPoster(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function setupUI(evt) {
  evt.preventDefault();
  const parametersToAppend = getFormData();

  let apiUrl = constUrl;

  if (parametersToAppend !== '') {
    apiUrl += parametersToAppend;
    fetchMovieData(apiUrl);
  }
}
const submitButton = document.getElementsByTagName('button')[0];
submitButton.addEventListener('click', setupUI);
