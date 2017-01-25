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
        processSearchResult(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.send();
}

function processSearchResult (result) {
  search = result.Search;

  var t = "";
  for (var i = 0; i < search.length; i++){
    var tr = "<tr>";
    tr += "<td>" + search[i].Title + "</td>";
    tr += "<td>" + search[i].Year + "</td>";
    tr += "<td>" + search[i].Type + "</td>";
    tr += "<td><a href=" + 'http://www.omdbapi.com/?i=' + search[0].imdbID + '&plot=full&r=json' + ">Movie page</a></td>";
    tr += "</tr>";
    t += tr;
  }
  document.getElementById("result").style.visibility = 'visible'
  document.getElementById("table-result").innerHTML = t;
}

String.prototype.gsub = function(search, replacement) {
  return this.split(search).join(replacement);
};
