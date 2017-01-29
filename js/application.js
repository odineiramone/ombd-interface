var movieName;

function processSearch() {
  let inputTitle = document.getElementById("title");
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
        createTable(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.send();
}

function createTable (result) {
  if (result.Response.toLowerCase() == "true") {
    var search = result.Search;
    var t = "";

    for (var i = 0; i < search.length; i++){
      var tr = "<tr style=\"cursor:pointer\" onClick=\"goToCookies('" + search[i].imdbID + "');\">";
      tr += "<td>" + search[i].Title + "</td>";
      tr += "<td>" + search[i].Year + "</td>";
      tr += "<td>" + search[i].Type + "</td>";
      tr += "<td><a><span class=\"glyphicon glyphicon-film\"></span></a></td>";
      tr += "</tr>";
      t += tr;
    }

    document.getElementById("result").style.visibility = 'visible'
    document.getElementById("table-result").tBodies[0].innerHTML += t;
  } else {
    alert(result.Error);
  }
}

function nextPage (previousResult) {
  total_pages = (previousResult.totalResults.to_i() / 10).ceil();

  for (var i = 0; i <= total_pages; i++) {
    url = 'http://www.omdbapi.com/?s=' + movieName + '&p=' + i + '&r=json';
    movieSearch(url);
  }
}

function goToCookies (imdbID) {
  setCookie('movieUrl', 'http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json');
  window.location = "movie_page.html";
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

document.getElementById("title").addEventListener("keydown", function (e) {
  if (e.keyCode === 13 && document.activeElement.id ==  "title") {
    processSearch();
  }
});

String.prototype.gsub = function(search, replacement) {
  return this.split(search).join(replacement);
};

String.prototype.to_i = function() {
  return parseInt(this);
};

Number.prototype.ceil = function() {
  return Math.ceil(this);
};
