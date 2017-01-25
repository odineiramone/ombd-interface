function processSearch() {
  let inputTitle = document.querySelector('input[name=title]');
  inputTitle = inputTitle.value.trim();
  if (inputTitle.length > 0) {
    movieName = inputTitle.gsub(' ', '+');
    movieSearch('http://www.omdbapi.com/?s=' + movieName + '&r=json');
  } else {
    alert("a valid search please");
  }
}

function movieSearch(url) {
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
  if (result.Response.toLowerCase() == "true") {
    var search = result.Search;
    var t = "";

    for (var i = 0; i < search.length; i++){
      var tr = "<tr>";
      tr += "<td>" + search[i].Title + "</td>";
      tr += "<td>" + search[i].Year + "</td>";
      tr += "<td>" + search[i].Type + "</td>";
      tr += "<td><a title=\"Go to movie page\" href=\"movie_page.html\"><span class=\"glyphicon glyphicon-film\"></span></a></td>";
      tr += "</tr>";
      t += tr;
    }

    movieUrl = 'http://www.omdbapi.com/?i=' + search[0].imdbID + '&plot=full&r=json';
    document.getElementById("result").style.visibility = 'visible'
    document.getElementById("table-result").tBodies[0].innerHTML = t;
  } else {
    alert(result.Error);
  }
}

String.prototype.gsub = function(search, replacement) {
  return this.split(search).join(replacement);
};

// bootstrap things
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
