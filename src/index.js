window.addEventListener("load", function() {
  // Add a keyup event listener to our input element
  var name_input = document.getElementById('search-input');
  name_input.addEventListener("keyup", function(event){hinter(event)});
});

// Autocomplete for form
function hinter(event) {

  // retireve the input element
  var input = event.target;

  // retrieve the datalist element
  var suggestions_list = document.getElementById('suggestions_list');

  // minimum number of characters before we start to generate suggestions
  var min_characters = 0;

  if ( input.value.length < min_characters ) {
      return;
  } else {

    var response = findSuggestions(input.value);

    // clear any previously loaded options in the datalist
    suggestions_list.innerHTML = "";

    response.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        option.value = item;

        // attach the option to the datalist element
        suggestions_list.appendChild(option);
    });
  }
}

function findSuggestions(input) {
  let results = [];
  const inputUpperCase = input.toUpperCase();

  const array =
    [
      { name: "Andromeda",
        name: "Antlia",
        name: "Apus",
        name: "Aquarius",
        name: "Aquila",
        name: "Ara",
        name: "Aries",
        name: "Auriga",
        name: "Bootes",
        name: "Caelum",
        name: "Camelopardus",
        name: "Cancer",
        name: "Canes Venatici",
        name: "Canis Major",
        name: "Canis Minor",
        name: "Capricornus",
        name: "Carina",
        name: "Cassiopeia",
        name: "Centaurus",
        name: "Cephus",
        name: "Cetus",
        name: "Chamaeleon",
        name: "Circinus",
        name: "Columba",
        name: "Coma Berenices",
        name: "Corona Australis",
        name: "Corona Borealis N",
        name: "Corvus",
        name: "Crater",
        name: "Crux",
        name: "Cygnus",
        name: "Delphinus",
        name: "Dorado",
        name: "Draco",
        name: "Equuleus",
        name: "Eridanus",
        name: "Fornax",
        name: "Gemini",
        name: "Grus",
        name: "Hercules",
        name: "Horologium",
        name: "Hydra",
        name: "Hydrus",
        name: "Indus",
        name: "Lacerta",
        name: "Leo",
        name: "Leo Minor",
        name: "Lepus",
        name: "Libra",
        name: "Lupus",
        name: "Lynx",
        name: "Lyra",
        name: "Mensa",
        name: "Microscopium",
        name: "Monoceros",
        name: "Musca",
        name: "Norma",
        name: "Octans",
        name: "Ophiuchus",
        name: "Orion",
        name: "Pavo",
        name: "Pegasus",
        name: "Perseus",
        name: "Phoenix",
        name: "Pictor",
        name: "Pisces",
        name: "Piscis Austrinis",
        name: "Puppis",
        name: "Pyxis (=Malus)",
        name: "Reticulum",
        name: "Sagitta",
        name: "Sagittarius",
        name: "Scorpius",
        name: "Sculptor",
        name: "Scutum",
        name: "Serpens",
        name: "Sextans",
        name: "Taurus",
        name: "Telescopium",
        name: "Triangulum",
        name: "Triangulum Australe",
        name: "Tucana",
        name: "Ursa Major",
        name: "Ursa Minor",
        name: "Vela",
        name: "Virgo",
        name: "Volans",
        name: "Vulpecula",
      },
    ];

  array.map(({ name }) => {
      if (name.toUpperCase().indexOf(inputUpperCase) > -1) {
        results.push(name);
      }
    }
  );

  return results;
}

const TBC_URL = "https://earlyaccess.bigcrunch.io/TheWebServer/odo/dGJjXzMxMTMzODRfMzExMTcxNw==";

function fetch() {
    const theSearchTerm = document.getElementById("search-input");

    openDetails();
    var iframe = createIFrame(theSearchTerm.value);

    document.getElementById('bigcrunch').innerHTML = '';
    document.getElementById('bigcrunch').appendChild(iframe);
}

// URL ENCODE!
function createIFrame(searchTerm) {
    var f = document.createElement("iframe");
    f.id = "wikiframe";
    f.src = TBC_URL + "?term=" + searchTerm;
    f.height = "100%";
    f.width = "100%";

    return f;
}

function openDetails() {
  document.getElementById("search-details").style.width = "100%";
  document.getElementById("search-details").style.height = "100%";
}

function closeDetails() {
  document.getElementById("search-details").style.width = "0%";
}

function sendToServer() {
  $.post('/starGaze', {
    'constellation': 'a',
    'colour': '#ff3311'
  });
}
