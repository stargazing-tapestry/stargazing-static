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
    var content = zodiacContent[theSearchTerm.value.toLowerCase()]
    if (content) {
      showZodiacContent(content)
    } else {
      var iframe = createIFrame(theSearchTerm.value);

      document.getElementById('bigcrunch').innerHTML = '';
      document.getElementById('bigcrunch').appendChild(iframe);
    }
}

function showZodiacContent(content) {
  var contentDiv = $("#zodiac-content");
  contentDiv.append("<h1>" + content.title + "</h1>");
  contentDiv.append("<p>Duration: " + content.duration + "</p>");
  contentDiv.append("<p>" + content.text[0] + "</p>");
  contentDiv.append("<p>" + content.text[1] + "</p>");
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function selectedConstellation() {
  var constellation = $('#search-input').val();
  return constellation ? constellation : 'a'
}

function sendToServer() {
  var constellation = selectedConstellation();
  var colour = getRandomColor();

  console.log("Lighting up " + constellation + " with colour " + colour);

  $.ajax({
    type: 'POST',
    url: '/starGaze',
    data: JSON.stringify({
      'constellation': constellation,
      'colour': colour
    }),
    contentType: "application/json; charset=utf-8"
  })
}

const zodiacContent = {
  "aries": {
    "title": "Aries",
    "duration": "March 21 - April 20",
    "text": [
      "Aries is the first astrological sign in the zodiac, spanning the first 30 degrees. The symbol of the ram is based on the Chrysomallus, the flying ram that provided the Golden Fleece.<br><br>",
      "Aries the Ram has retained importance despite being a rather small constellation. It traditionally leads the 'flock' of the Zodiac. In ancient Greek, the Sun was placed among its stars at the Vernal Equinox, which then marked the start of the calendar year as well as the arrival of Spring."
    ],
    "image": "aries.png",
    "hoverImage": "aries-hover.png"
  },
  "taurus": {
    "title": "Taurus",
    "duration": "April 21 - May 21",
    "text": [
      "Taurus is the second astrological sign in the present zodiac. It spans the 30–60th degree of the zodiac. The symbol of the bull is based on the Cretan Bull, the white bull that fathered the Minotaur who was killed by Theseus.",
      "It is an ancient constellation, created by the Sumarians around 3000 B.C., to mark where the sun would be in the sky at the Spring Equinox. At that time the bull was a powerful fertility symbol, so was a very appropriate symbol for the return of Spring."
    ],
    "image": "taurus.png",
    "hoverImage": "taurus-hover.png"
  },
  "gemini": {
    "title": "Gemini",
    "duration": "May 22 - June 21",
    "text": [
      "Gemini is the third astrological sign in the zodiac, spaning the 60–90th degree of the zodiac. Gemini is represented by The Twins Castor and Pollux. The symbol of the twins is based on the Dioscuri, two mortals that were granted shared godhood after death.",
      "The constellation has been known as the twins since ancient times but the name Gemini is thought to originate with the Romans."
    ],
    "image": "taurus.png",
    "hoverImage": "taurus-hover.png"
  },
  "cancer": {
    "title": "Cancer",
    "duration": "June 22 - July 21",
    "text": [
      "Cancer is the fourth astrological sign, and spans between 90 and 120 degrees of celestial longitude. The symbol of the crab is based on the Karkinos, a giant crab that harassed Heracles during his fight with the Hydra.",
      "Cancer the Crab is the faintest of the Zodiac constellations, but it once had a position of importance in the sky. During the time of ancient Greece the Sun reached it's most northerly position in the sky in Cancer, and this is why the Tropic of Cancer was named so."
    ],
    "image": "cancer.png",
    "hoverImage": "cancer-hover.png"
  },
  "leo": {
    "title": "Leo",
    "duration": "July 23 - August 21",
    "text": [
      "Leo is the fifth astrological sign in the zodiac, spans the 120th to 150th degree of celestial longitude. The symbol of the lion is based on the Nemean lion, a lion with an impenetrable hide.",
      "In Greek mythology, Leo represented the Nemean Lion, which came down to Earth from the Moon and rampaged across the country-side until Hercules killed and skinned it as one of his Twelve Tasks. Zeus then returned the lion to the stars."
    ],
    "image": "leo.png",
    "hoverImage": "leo-hover.png"
  },
  "virgo": {
    "title": "Virgo",
    "duration": "August 22 - September 23",
    "text": [
      "Virgo is the sixth astrological sign in the Zodiac, and the second-largest constellation. It spans the 150-180th degree of the zodiac.",
      "Virgo was drawn in the Egyptian zodiac and was said to represent the goddess Isis. To the Romans she was Astrea, the goddess of Justice, holding the Scales of Libra in her hand. The Greeks connected her with Ceres and Persephone, from a well known myth that describes the cycle of the harvest."
    ],
    "image": "virgo.png",
    "hoverImage": "virgo-hover.png"
  },
  "libra": {
    "title": "Libra",
    "duration": "September 24 - October 23",
    "text": [
      "Libra is the seventh astrological sign in the Zodiac. It spans the 180–210th degree of the zodiac, between 180 and 207.25 degree of celestial longitude.",
      "The Scales were held by the Roman goddess of Justice, Astreae (Virgo) who lies directly to the west of Libra. She would use the Scales to weigh the souls of men on their way to the Underworld, to detemine whether they would have eternal pleasure or pain."
    ],
    "image": "libra.png",
    "hoverImage": "libra-hover.png"
  },
  "scorpio": {
    "title": "Scorpio",
    "duration": "October 24 - November 22",
    "text": [
      "Scorpio is the eighth astrological sign in the Zodiac. It spans the 210–240th degree of the zodiac.",
      "In Greek mythology, Scorpius was a giant scorpion sent by Gaea the Earth to slay the giant Orion when he threatened to slay all the beasts of the world. Afterwards, Orion and the Scorpion were placed amongst the stars as constellations. The two opponents are never seen in the sky at the same time - for as one constellation rises, the other sets."
    ],
    "image": "libra.png",
    "hoverImage": "libra-hover.png"
  },
  "sagittaruis": {
    "title": "Sagittaruis",
    "duration": "November 23 - December 22",
    "text": [
      "Sagittarius is the ninth astrological sign, which spans between 240–270th degrees of the zodiac.",
      "The symbol of the archer is based on the centaur Chiron, who mentored the Greek hero Achilles in archery, which then became the greatest warrior of Homer's Iliad after the Trojan War."
    ],
    "image": "sagittaruis.png",
    "hoverImage": "sagittaruis-hover.png"
  },
  "capricorn": {
    "title": "Capricorn",
    "duration": "December 23 - January 20",
    "text": [
      "Capricorn is the tenth astrological sign in the zodiac, originating from the constellation of Capricornus. It spans the 270–300th degree of the zodiac, corresponding to celestial longitude.",
      "Capricornus, which means the Horned Goat, is usually depicted as a goat with a fish's tail for his hindquarters. It is one of the older constellations in the sky, dating back to Sumerian (pre Babylonian) times and is connected with the god Ea or Oannes."
    ],
    "image": "capricorn.png",
    "hoverImage": "capricorn-hover.png"
  },
  "aquarius": {
    "title": "Aquarius",
    "duration": "January 21 - February 19",
    "text": [
      "Aquarius is the eleventh astrological sign in the Zodiac, originating from the constellation Aquarius. The water carrier depicted is Ganymede, a beautiful Phrygian youth.",
      "Ganymede was the son of Tros, king of Troy. While tending to his father's flocks on Mount Ida, Ganymede was spotted by Jupiter. The king of gods became enamored of the boy and flew down to the mountain in the form of a large bird, whisking Ganymede away to the heavens. Ever since, the boy has served as cupbearer to the gods."
    ],
    "image": "aquarius.png",
    "hoverImage": "aquarius-hover.png"
  },
  "pisces": {
    "title": "Pisces",
    "duration": "February 10 - March 20 ",
    "text": [
      "Pisces is the twelvth astrological sign in the Zodiac, spaning between 330° to 360° of the zodiac.",
      "\"Pisces\" is the Latin word for \"Fishes.\" It is one of the earliest zodiac signs on record, with the two fish appearing as far back as c. 2300 BCE in Egypt. In Greek mythology, Pisces represents the fish, in which Aphrodite (or Venus) and her son Eros (or Cupid) transformed in order to escape the monster Typhon."
    ],
    "image": "pisces.png",
    "hoverImage": "pisces-hover.png"
  }
}
