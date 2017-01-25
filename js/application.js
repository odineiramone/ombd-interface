function processSearch() {
  let inputTitle = document.querySelector('input[name=title]');
  inputTitle = inputTitle.value.trim();
  if (inputTitle.length > 0) {
    movieSearch(inputTitle);
  } else {
    alert("a valid search please");
  }
}

function movieSearch(movieName) {
  movieName = movieName.gsub(' ', '+');
  let url = 'http://www.omdbapi.com/?s=' + movieName + '&r=json';

  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status = 200) {
        alert(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.send();
}

String.prototype.gsub = function(search, replacement) {
  return this.split(search).join(replacement);
};
