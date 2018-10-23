var xmlhttp;

window.onload = function () {
    document.addEventListener("deviceready", init, false);
    init();
};

function init() {
    document.getElementById('btnGetJoke').addEventListener('click', getJoke, false);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = receiveJoke;
    document.getElementById('addToList').addEventListener('click', addJoke, false);
    document.getElementById('displayList').addEventListener('click', displayJoke, false);
    document.getElementById('clearList').addEventListener('click', clearJoke, false);
}

function getJoke() {
    xmlhttp.open('GET', 'http://api.icndb.com/jokes/random/', true);
    xmlhttp.send();
}

function receiveJoke() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var json = jQuery.parseJSON(xmlhttp.responseText);
        document.getElementById('joke').innerHTML = json.value.joke;
        
        return json;
    }
}

function addJoke() {
    var joke = document.getElementById('joke');
    
    store.set(joke.innerHTML, joke.innerHTML);
}

function displayJoke() {
    var oddRow = true;
    var output = "<table>";
    output += "<tr class='title'><td>Joke List</td></tr>";
    
    store.forEach(function(key, val) {
            if(oddRow)
                {
                    output += "<tr class='odd'><td>" + val + "</td></tr>";
                }
            else
                {
                    output += "<tr class='even'><td>" + val + "</td></tr>";
                }
            oddRow = !oddRow;
    });
    output += "</table>";
    document.getElementById('listArea').innerHTML = output;
}

function clearJoke() {
    document.getElementById('listArea').innerHTML = "";
    store.clear();
}