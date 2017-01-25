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
    document.getElementById("spinning").style.visibility = 'hidden';

    document.getElementById('poster').src = content.Poster;
    document.getElementById('poster').alt = content.Title + " poster";

    document.getElementById('movie-name').innerText = content.Title;
    document.getElementById('year').innerText = "Year: " + content.Year;
    document.getElementById('released').innerText = "Released: " + content.Released;
    document.getElementById('genre').innerText = "Genre: " + content.Genre;
    document.getElementById('runtime').innerText = "Runtime: " + content.Runtime;
    document.getElementById('director').innerText = "Director: " + content.Director;
    document.getElementById('writer').innerText = "Writer: " + content.Writer;
    document.getElementById('actors').innerText = "Actors: " + content.Actors;
    document.getElementById('plot').innerText = content.Plot;
  } else {
    alert(content.Error);
  }
}
