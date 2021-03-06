
//validate input for just a-z character
$('#wordSearch').bind('keypress', function(e) {
    var keyCode = (e.which) ? e.which : event.keyCode
    return !(  (keyCode < 97 || keyCode > 122));
  });




// -- search on keypress of "enter" event --
$("#wordSearch").on("keypress", function (e) { 

    if (e.which === 13) {    
        clear();
        wordSearch();
        getWord();
    };

});

var wordListEl = $("#wordList");
var words = [];
var text;
var responseWord;

init();

function wordSearch() {

    var APIKey = "df02e1fe-49cf-4a55-98fc-de7865e40463";
    var searchParam = $("#wordSearch").val().trim();
    if (searchParam === "") {
        return;
    };

    // -- URL to query database -- 
    var queryURL =
        "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + searchParam + "?key=" + APIKey;

    // -- ajax call for dictionary -- 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        responseWord = response[0].hwi.hw;

        // -- building current weather card start --
        for (i = 0; i < response[0].shortdef.length; i++) {
            var wordDef = response[0].shortdef[i];
            console.log(wordDef);


            var word = $("<h1 class= 'title'> " + responseWord + "</h1>");
            var def = $("<hr>" + "<h2 class='subtitle'> " + wordDef + "</h2>")
            $("#definition").append(def)
        };
        console.log(responseWord)

        $("#definition").addClass("box");
        $("#definition").prepend(word);

        // erase * chracter
        responseWord=responseWord.replace("*","");       
        text = responseWord.indexOf("*");   
         
        while (text!="-1") {
            responseWord=responseWord.replace("*","");
            text = responseWord.indexOf("*"); 
        }


        words.push(responseWord);
        localStorage.setItem("words", JSON.stringify(words));
        $("#wordSearch").val("");
        init();
    });
    // -- ajax call for dictionary end --
};

 
 


//history
$("#wordList").on("click", "button", function (event) {
    event.preventDefault();

    clear();
    

    var btnVal = $(this).text();

    $("#wordSearch").val(btnVal);//search   tag
    getWord();

    var APIKey = "df02e1fe-49cf-4a55-98fc-de7865e40463";

    // -- URL to query database -- -
    var queryURL =
        "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + btnVal + "?key=" + APIKey;

    // -- ajax call for dictionary -- 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        var responseWord = response[0].hwi.hw;

        // -- building current  card start --
        for (i = 0; i < response[0].shortdef.length; i++) {
            var wordDef = response[0].shortdef[i];
            console.log(wordDef);


            // var word = $("<h1 class='title'> " + responseWord  + "</h1>");
            // var def = $("<h2 class='subtitle'> " + wordDef + "</h2>")
            // $("#definition").append(def)


            var word = $("<h1 class= 'title'> " + responseWord + "</h1>");
            var def = $("<hr>" + "<h2 class='subtitle'> " + wordDef + "</h2>")
            $("#definition").append(def)


        };
        $("#definition").addClass("box");
        $("#definition").prepend(word);
        $("#wordSearch").val("");
    });
});


function renderWords() {
    if (words.length > 5) {
        words.shift();
    }
    for (var i = 0; i < words.length; i++) {

        var wordLS = words[i];
        var li = $("<li>")
        var button = $("<button>");
        button.text(wordLS);
        button.attr("data-index", i);
        button.addClass("button has-background-dark has-text-white is-fullwidth box")
        li.append(button);
        $("#wordList").prepend(li);
        $("#wordList").prepend("<br>");
    }
};

// -- function to retrieve city names from localStorage --
function init() {
    $("#wordList").empty();
    var storedWords = JSON.parse(localStorage.getItem("words"));
    if (storedWords !== null) {
        words = storedWords;
    };
    renderWords();
};

function clear() {
    $("#definition").empty();
};

