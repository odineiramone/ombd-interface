function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = function movieSearch() {
  let url = getCookie('movieUrl');
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status = 200) {
        drawContent(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.send();
}

function drawContent(content) {
  if (content.Response.toLowerCase() == "true") {
    document.getElementById("spinning").style.display = 'none';
    document.getElementById("movie-info").style.visibility = 'visible';

    document.getElementById('poster').src = content.Poster;

    document.getElementById('movie-name').innerText = content.Title;

    document.getElementById('year').innerText = "Year: " + content.Year;
    document.getElementById('released').innerText = "Released: " + content.Released;
    document.getElementById('country').innerText = "Country: " + content.Country;
    document.getElementById('genre').innerText = "Genre: " + content.Genre;
    document.getElementById('runtime').innerText = "Runtime: " + content.Runtime;
    document.getElementById('language').innerText = "Language: " + content.Language;
    document.getElementById('rated').innerText = "Rated: " + content.Rated;

    document.getElementById('director').innerText = "Director: " + content.Director;
    document.getElementById('writer').innerText = "Writer: " + content.Writer;
    document.getElementById('actors').innerText = "Actors: " + content.Actors;
    document.getElementById('plot').innerText = content.Plot;

    document.getElementById('awards').innerText = "Awards: " + content.Awards;
    document.getElementById('metascore').innerText = "Metascore: " + content.Metascore;
    document.getElementById('imdb-rating').innerText = "IMDb Rating: " + content.imdbRating;
    document.getElementById('imdb-votes').innerText = "IMDb Votes: " + content.imdbVotes;

    document.getElementById('imdb-page').href = "http://www.imdb.com/title/" + content.imdbID;
  } else {
    alert(content.Error);
  }
}
