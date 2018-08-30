const AUTOCOMPLETE = [
  { name: 'Andromeda' },
  { name: 'Antlia' },
  { name: 'Apus' },
  { name: 'Aquarius' },
  { name: 'Aquila' },
  { name: 'Ara' },
  { name: 'Aries' },
  { name: 'Auriga' },
  { name: 'Bootes' },
  { name: 'Caelum' },
  { name: 'Camelopardus' },
  { name: 'Cancer' },
  { name: 'Canes Venatici' },
  { name: 'Canis Major' },
  { name: 'Canis Minor' },
  { name: 'Capricornus' },
  { name: 'Carina' },
  { name: 'Cassiopeia' },
  { name: 'Centaurus' },
  { name: 'Cepheus' },
  { name: 'Cetus' },
  { name: 'Chamaeleon' },
  { name: 'Circinus' },
  { name: 'Columba' },
  { name: 'Coma Berenices' },
  { name: 'Corona Australis' },
  { name: 'Corona Borealis' },
  { name: 'Corvus' },
  { name: 'Crater' },
  { name: 'Crux' },
  { name: 'Cygnus' },
  { name: 'Delphinus' },
  { name: 'Dorado' },
  { name: 'Draco' },
  { name: 'Equuleus' },
  { name: 'Eridanus' },
  { name: 'Fornax' },
  { name: 'Gemini' },
  { name: 'Grus' },
  { name: 'Hercules' },
  { name: 'Horologium' },
  { name: 'Hydra' },
  { name: 'Hydrus' },
  { name: 'Indus' },
  { name: 'Lacerta' },
  { name: 'Leo' },
  { name: 'Leo Minor' },
  { name: 'Lepus' },
  { name: 'Libra' },
  { name: 'Lupus' },
  { name: 'Lynx' },
  { name: 'Lyra' },
  { name: 'Mensa' },
  { name: 'Microscopium' },
  { name: 'Monoceros' },
  { name: 'Musca' },
  { name: 'Norma' },
  { name: 'Octans' },
  { name: 'Ophiuchus' },
  { name: 'Orion' },
  { name: 'Pavo' },
  { name: 'Pegasus' },
  { name: 'Perseus' },
  { name: 'Phoenix' },
  { name: 'Pictor' },
  { name: 'Pisces' },
  { name: 'Piscis Austrinis' },
  { name: 'Puppis' },
  { name: 'Pyxis' },
  { name: 'Reticulum' },
  { name: 'Sagitta' },
  { name: 'Sagittarius' },
  { name: 'Scorpius' },
  { name: 'Sculptor' },
  { name: 'Scutum' },
  { name: 'Serpens' },
  { name: 'Sextans' },
  { name: 'Taurus' },
  { name: 'Telescopium' },
  { name: 'Triangulum' },
  { name: 'Triangulum Australe' },
  { name: 'Tucana' },
  { name: 'Ursa Major' },
  { name: 'Ursa Minor' },
  { name: 'Vela' },
  { name: 'Virgo' },
  { name: 'Volans' },
  { name: 'Vulpecula' },
];

window.addEventListener('load', () => {
  autocomplete(document.getElementById('search-input'), AUTOCOMPLETE.map(x => x.name));
});

function autocomplete(inp, arr) {
  /* the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values: */
  let currentFocus;
  /* execute a function when someone writes in the text field: */
  inp.addEventListener('input', function () {
    let a; let b; let i; const
      val = this.value;
    /* close any already open lists of autocompleted values */
    closeAllLists();
    if (!val) { return false; }
    showClearButton((val.length > 0));
    currentFocus = -1;
    /* create a DIV element that will contain the items (values): */
    a = document.createElement('DIV');
    a.setAttribute('id', `${this.id}autocomplete-list`);
    a.setAttribute('class', 'autocomplete-items');
    /* append the DIV element as a child of the autocomplete container: */
    this.parentNode.appendChild(a);
    /* for each item in the array... */
    for (i = 0; i < arr.length; i++) {
      /* check if the item starts with the same letters as the text field value: */
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        /* create a DIV element for each matching element: */
        b = document.createElement('DIV');
        /* make the matching letters bold: */
        b.innerHTML = `<strong>${arr[i].substr(0, val.length)}</strong>`;
        b.innerHTML += arr[i].substr(val.length);
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += `<input type='hidden' value='${arr[i]}'>`;
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener('click', function (e) {
          /* insert the value for the autocomplete text field: */
          inp.value = this.getElementsByTagName('input')[0].value;
          /* close the list of autocompleted values,
              (or any other open lists of autocompleted values: */
          closeAllLists();
          fetch();
        });
        a.appendChild(b);
      }
    }
  });
  /* execute a function presses a key on the keyboard: */
  inp.addEventListener('keydown', function (e) {
    let x = document.getElementById(`${this.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      /* If the arrow DOWN key is pressed,
        increase the currentFocus variable: */
      currentFocus++;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 38) { // up
      /* If the arrow UP key is pressed,
        decrease the currentFocus variable: */
      currentFocus--;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode === 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted, */
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item: */
        if (x) x[currentFocus].click();
      }
    } else if (e.keyCode === 8 || e.keyCode === 16) {
      if (this.value.length === 1) showClearButton(false);
    }
  });
  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x) return false;
    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /* add class "autocomplete-active": */
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    /* close all autocomplete lists in the document,
    except the one passed as an argument: */
    const x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* execute a function when someone clicks in the document: */
  document.addEventListener('click', (e) => {
    closeAllLists(e.target);
  });
}

function fetch() {
  const theSearchTerm = document.getElementById('search-input');

  openDetails();
  const which = theSearchTerm.value.toLowerCase().replace(/\s/g, '');
  const content = allContent[which];
  if (content) {
    showContent(content);
    gtag('event', 'search', {
      'event_category': 'search',
      'event_label': 'success',
      'value': which
    });
  } else {
    const error = document.createElement('p');
    error.innerHTML = 'Sorry, we cannot seem to find that constellation';

    document.getElementById('error').innerHTML = '';
    document.getElementById('error').classList.add('error-visible');
    document.getElementById('error').appendChild(error);

    gtag('event', 'search', {
      'event_category': 'search',
      'event_label': 'error',
      'value': which
    });
  }
}

function showContent(content) {
  const contentDiv = $('#zodiac-content');
  contentDiv.append(`<button class="activate_button activate_button_${content.lightup}" onclick="lightUpConstellation();"><img class="activate_button_img" src='img/activate-button.png'/></button>`);
  contentDiv.append(`<div class="align-center"><img class='constellation_img' src='img/${content.image}'/></div>`);
  contentDiv.append(`<h2>${content.title}</h2>`);
  const duration = content.duration ? `<p>Duration: ${content.duration}</p>` : '';
  const text1 = content.text[0] ? `<p>${content.text[0]}</p>` : '';
  const text2 = content.text[1] ? `<p>${content.text[1]}</p>` : '';
  contentDiv.append(`<div class="details-text">${duration}${text1}${text2}</div>`);
}

function openDetails() {
  document.getElementById('search-details').style.width = '100%';
  document.getElementById('search-details').style.height = '100%';
}

function closeDetails() {
  document.getElementById('zodiac-content').innerHTML = '';
  document.getElementById('error').innerHTML = '';
  document.getElementById('error').classList.remove('error-visible');
  document.getElementById('search-details').style.width = '0%';
}

function clearSearchText() {
  $('#search-input').val('');
  showClearButton(false);
}

function showClearButton(show) {
  if (show) $('.close-icon').show();
  else $('.close-icon').hide();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function selectedConstellation() {
  const constellation = $('#search-input').val();
  return constellation || 'a';
}

function lightUpConstellation() {
  const constellation = selectedConstellation();
  sendToServer(constellation);
  gtag('event', 'click', {
    'event_category': 'light',
    'event_label': 'ajax',
    'value': constellation
  });
}

function lightUpSky() {
  ['aquarius', 'aries', 'cancer', 'gemini', 'leo', 'orion', 'pisces', 'taurus']
    .forEach(n => sendToServer(n));
}

function sendToServer(constellation) {
  const colour = getRandomColor();

  console.log(`Lighting up ${constellation} with colour ${colour}`);

  $.ajax({
    type: 'POST',
    url: '/starGaze',
    data: JSON.stringify({
      constellation,
      colour,
    }),
    contentType: 'application/json; charset=utf-8',
  });
  return false;
}

const allContent = {
  andromeda: {
    title: 'Andromeda', text: ['Andromeda is one of the 48 constellations listed by the 2nd-century Greco-Roman astronomer Ptolemy and remains one of the 88 modern constellations. Located north of the celestial equator, it is named for Andromeda, daughter of Cassiopeia, in the Greek myth, who was chained to a rock to be eaten by the sea monster Cetus. Andromeda is most prominent during autumn evenings in the Northern Hemisphere, along with several other constellations named for characters in the Perseus myth. Because of its northern declination, Andromeda is visible only north of 40° south latitude; for observers farther south it lies below the horizon. It is one of the largest constellations, with an area of 722 square degrees. This is over 1,400 times the size of the full moon, 55% of the size of the largest constellation, Hydra, and over 10 times the size of the smallest constellation, Crux.'], image: 'andromeda.png', lightup: 'hidden',
  },
  antlia: {
    title: 'Antlia', text: ['Antlia is a constellation in the Southern Celestial Hemisphere. Its name means "pump" in Latin; it represents an air pump. Originally Antlia Pneumatica, the constellation was established by Nicolas-Louis de Lacaille in the 18th century, though its name was later abbreviated by John Herschel. Located close to the stars forming the old constellation of the ship Argo Navis, Antlia is completely visible from latitudes south of 49 degrees north.'], image: 'antlia.png', lightup: 'hidden',
  },
  apus: {
    title: 'Apus', text: ['Apus is a small constellation in the southern sky. It represents a bird-of-paradise, and its name means "without feet" in Greek because the bird-of-paradise was once wrongly believed to lack feet. First depicted on a celestial globe by Petrus Plancius in 1598, it was charted on a star atlas by Johann Bayer in his 1603 Uranometria. The French explorer and astronomer Nicolas Louis de Lacaille charted and gave the brighter stars their Bayer designations in 1756.'], image: 'apus.png', lightup: 'hidden',
  },
  aquarius: {
    title: 'Aquarius',
    duration: 'January 21 - February 19',
    text: [
      'Aquarius is the eleventh astrological sign in the Zodiac, originating from the constellation Aquarius. The water carrier depicted is Ganymede, a beautiful Phrygian youth.',
      "Ganymede was the son of Tros, king of Troy. While tending to his father's flocks on Mount Ida, Ganymede was spotted by Jupiter. The king of gods became enamored of the boy and flew down to the mountain in the form of a large bird, whisking Ganymede away to the heavens. Ever since, the boy has served as cupbearer to the gods.",
    ],
    image: 'aquarius.gif',
    lightup: 'visible',
  },
  aquila: {
    title: 'Aquila', text: ["Aquila is a constellation on the celestial equator. Its name is Latin for 'eagle' and it represents the bird that carried Zeus/Jupiter's thunderbolts in Greco-Roman mythology."], image: 'aquila.png', lightup: 'hidden',
  },
  ara: {
    title: 'Ara', text: ['Ara is a southern constellation situated between Scorpius and Triangulum Australe. Ara was one of the 48 Greek constellations described by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations defined by the International Astronomical Union.'], image: 'ara.png', lightup: 'hidden',
  },
  aries: {
    title: 'Aries',
    duration: 'March 21 - April 20',
    text: [
      'Aries is the first astrological sign in the zodiac, spanning the first 30 degrees. The symbol of the ram is based on the Chrysomallus, the flying ram that provided the Golden Fleece.',
      "Aries the Ram has retained importance despite being a rather small constellation. It traditionally leads the 'flock' of the Zodiac. In ancient Greek, the Sun was placed among its stars at the Vernal Equinox, which then marked the start of the calendar year as well as the arrival of Spring.",
    ],
    image: 'aries.gif',
    lightup: 'visible',
  },
  auriga: {
    title: 'Auriga', text: ['Auriga is one of the 88 modern constellations; it was among the 48 constellations listed by the 2nd-century astronomer Ptolemy. Located north of the celestial equator, its name is the Latin word for “the charioteer”, associating it with various mythological beings, including Erichthonius and Myrtilus. Auriga is most prominent during winter evenings in the northern Hemisphere, along with the five other constellations that have stars in the Winter Hexagon asterism. Because of its northern declination, Auriga is only visible in its entirety as far as 34° south; for observers farther south it lies partially or fully below the horizon. A large constellation, with an area of 657 square degrees, it is half the size of the largest constellation, Hydra.'], image: 'auriga.png', lightup: 'hidden',
  },
  bootes: {
    title: 'Bootes', text: ['Boötes is a constellation in the northern sky, located between 0° and +60° declination, and 13 and 16 hours of right ascension on the celestial sphere. The name comes from the Greek Βοώτης, Boōtēs, meaning “herdsman” or “plowman”.'], image: 'bootes.png', lightup: 'hidden',
  },
  caelum: {
    title: 'Caelum', text: ['Caelum is a faint constellation in the southern sky, introduced in the 1750s by Nicolas Louis de Lacaille and counted among the 88 modern constellations. Its name means “chisel” in Latin, and it was formerly known as Caelum Scalptorium ; It is a rare word, unrelated to the far more common Latin caelum, meaning “sky, heaven, atmosphere”. It is the eighth-smallest constellation, and subtends a solid angle of around 0.038 steradians, just less than that of Corona Australis.'], image: 'caelum.png', lightup: 'hidden',
  },
  camelopardus: {
    title: 'Camelopardus', text: ['Camelopardalis is a large but obscure constellation of the northern sky representing a giraffe. The constellation was introduced in 1612 by Petrus Plancius. Some older astronomy books give Camelopardalus or Camelopardus as alternative spellings of the name, but the official version recognized by the International Astronomical Union is Camelopardalis.'], image: 'camelopardus.png', lightup: 'hidden',
  },
  cancer: {
    title: 'Cancer',
    duration: 'June 22 - July 21',
    text: [
      'Cancer is the fourth astrological sign, and spans between 90 and 120 degrees of celestial longitude. The symbol of the crab is based on the Karkinos, a giant crab that harassed Heracles during his fight with the Hydra.',
      "Cancer the Crab is the faintest of the Zodiac constellations, but it once had a position of importance in the sky. During the time of ancient Greece the Sun reached it's most northerly position in the sky in Cancer, and this is why the Tropic of Cancer was named so.",
    ],
    image: 'cancer.gif',
    lightup: 'visible',
  },
  canesvenatici: {
    title: 'Canes Venatici', text: ["Canes Venatici is one of the 88 official modern constellations. It is a small northern constellation that was created by Johannes Hevelius in the 17th century. Its name is Latin for \"hunting dogs\", and the constellation is often depicted in illustrations as representing the dogs of Bootes the Herdsman, a neighboring constellation. Cor Caroli is the constellation's brightest star, with an apparent magnitude of 2.9. La Superba is one of the reddest stars in the sky and one of the brightest carbon stars. The Whirlpool Galaxy is a spiral galaxy tilted face-on to observers on Earth, and was the first galaxy whose spiral nature was discerned."], image: 'canesvenatici.png', lightup: 'hidden',
  },
  canismajor: {
    title: 'Canis Major', text: ["Canis Major is a constellation in the southern celestial hemisphere. In the second century, it was included in Ptolemy's 48 constellations, and is counted among the 88 modern constellations. Its name is Latin for \"greater dog\" in contrast to Canis Minor, the \"lesser dog\"; both figures are commonly represented as following the constellation of Orion the hunter through the sky. The Milky Way passes through Canis Major and several open clusters lie within its borders, most notably M41."], image: 'canismajor.png', lightup: 'hidden',
  },
  canisminor: {
    title: 'Canis Minor', text: ["Canis Minor is a small constellation in the northern celestial hemisphere. In the second century, it was included as an asterism, or pattern, of two stars in Ptolemy's 48 constellations, and it is counted among the 88 modern constellations. Its name is Latin for \"lesser dog\", in contrast to Canis Major, the \"greater dog\"; both figures are commonly represented as following the constellation of Orion the hunter."], image: 'canisminor.png', lightup: 'hidden',
  },
  capricornus: {
    title: 'Capricorn',
    duration: 'December 23 - January 20',
    text: [
      'Capricorn is the tenth astrological sign in the zodiac, originating from the constellation of Capricornus. It spans the 270–300th degree of the zodiac, corresponding to celestial longitude.',
      "Capricornus, which means the Horned Goat, is usually depicted as a goat with a fish's tail for his hindquarters. It is one of the older constellations in the sky, dating back to Sumerian (pre Babylonian) times and is connected with the god Ea or Oannes.",
    ],
    image: 'capricorn.gif',
    lightup: 'hidden',
  },
  carina: {
    title: 'Carina', text: ['Carina is a constellation in the southern sky. Its name is Latin for the keel of a ship, and it was formerly part of the larger constellation of Argo Navis until that constellation was divided into three pieces, the other two being Puppis, and Vela.'], image: 'carina.png', lightup: 'hidden',
  },
  cassiopeia: {
    title: 'Cassiopeia', text: ["Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty. Cassiopeia was one of the 48 constellations listed by the 2nd-century Greek astronomer Ptolemy, and it remains one of the 88 modern constellations today. It is easily recognizable due to its distinctive 'W' shape, formed by five bright stars. It is opposite Ursa Major. In northern locations above latitude 34ºN it is visible year-round and in the (sub)tropics it can be seen at its clearest from September to early November. Even in low southern latitudes below 25ºS it can be seen low in the North."], image: 'cassiopeia.png', lightup: 'hidden',
  },
  centaurus: {
    title: 'Centaurus', text: ['Centaurus is a bright constellation in the southern sky. One of the largest constellations, Centaurus was included among the 48 constellations listed by the 2nd-century astronomer Ptolemy, and it remains one of the 88 modern constellations. In Greek mythology, Centaurus represents a centaur; a creature that is half human, half horse. Notable stars include Alpha Centauri, the nearest star system to the Solar System, its neighbour in the sky Beta Centauri, and V766 Centauri, one of the largest stars yet discovered. The constellation also contains Omega Centauri, the brightest globular cluster as visible from Earth and one of the largest known.'], image: 'centaurus.png', lightup: 'hidden',
  },
  cepheus: {
    title: 'Cepheus', text: ['Cepheus is a constellation in the northern sky, which is named after Cepheus.'], image: 'cepheus.png', lightup: 'hidden',
  },
  cetus: {
    title: 'Cetus', text: ["Cetus is a constellation. Its name refers to Cetus, a sea monster in Greek mythology, although it is often called 'the whale' today. Cetus is located in the region of the sky that contains other water-related constellations such as Aquarius, Pisces, and Eridanus."], image: 'cetus.png', lightup: 'hidden',
  },
  chamaeleon: {
    title: 'Chamaeleon', text: ['Chamaeleon is a small constellation in the southern sky. It is named after the chameleon, a kind of lizard. It was first defined in the 16th century.'], image: 'chamaeleon.png', lightup: 'hidden',
  },
  circinus: {
    title: 'Circinus', text: ['Circinus is a small, faint constellation in the southern sky, first defined in 1756 by the French astronomer Nicolas-Louis de Lacaille. Its name is Latin for compass, referring to the drafting tool used for drawing circles. Its brightest star is Alpha Circini, with an apparent magnitude of 3.19. Slightly variable, it is the brightest rapidly oscillating Ap star in the night sky. AX Circini is a Cepheid variable visible with the unaided eye, and BX Circini is a faint star thought to have been formed from the merger of two white dwarfs. Two sun-like stars have planetary systems: HD 134060 has two small planets, and HD 129445 has a Jupiter-like planet. Supernova SN 185 appeared in Circinus in 185 AD and was recorded by Chinese observers. Two novae have been observed more recently, in the 20th century.'], image: 'circinus.png', lightup: 'hidden',
  },
  columba: {
    title: 'Columba', text: ['Columba is a small, faint constellation created in the late sixteenth century. Its name is Latin for dove. It is located just south of Canis Major and Lepus.'], image: 'columba.png', lightup: 'hidden',
  },
  comaberenices: {
    title: 'Coma Berenices', text: ["Coma Berenices is an ancient asterism in the northern sky which has been defined as one of the 88 modern constellations. It is located in the fourth galactic quadrant, between Leo and Boötes, and is visible in both hemispheres. Its name means \"Berenice's Hair\" in Latin and refers to Queen Berenice II of Egypt, who sacrificed her long hair as a votive offering. It was introduced to Western astronomy during the third century BC by Conon of Samos and was further corroborated as a constellation by Gerardus Mercator and Tycho Brahe. Coma Berenices is the only modern constellation named for an historic figure."], image: 'comaberenices.png', lightup: 'hidden',
  },
  coronaaustralis: {
    title: 'Corona Australis', text: ['Corona Australis is a constellation in the Southern Celestial Hemisphere. Its Latin name means "southern crown", and it is the southern counterpart of Corona Borealis, the northern crown. It is one of the 48 constellations listed by the 2nd-century astronomer Ptolemy, and it remains one of the 88 modern constellations. The Ancient Greeks saw Corona Australis as a wreath rather than a crown and associated it with Sagittarius or Centaurus. Other cultures have likened the pattern to a turtle, ostrich nest, a tent, or even a hut belonging to a rock hyrax.'], image: 'coronaaustralis.png', lightup: 'hidden',
  },
  coronaborealis: {
    title: 'Corona Borealis', text: ["Corona Borealis is a small constellation in the Northern Celestial Hemisphere. It is one of the 48 constellations listed by the 2nd-century astronomer Ptolemy, and remains one of the 88 modern constellations. Its brightest stars form a semicircular arc. Its Latin name, inspired by its shape, means \"northern crown\". In classical mythology Corona Borealis generally represented the crown given by the god Dionysus to the Cretan princess Ariadne and set by him in the heavens. Other cultures likened the pattern to a circle of elders, an eagle's nest, a bear's den, or even a smokehole. Ptolemy also listed a southern counterpart, Corona Australis, with a similar pattern."], image: 'coronaborealis.png', lightup: 'hidden',
  },
  corvus: {
    title: 'Corvus', text: ['Corvus is a small constellation in the Southern Celestial Hemisphere. Its name means "raven" in Latin. One of the 48 constellations listed by the 2nd-century astronomer Ptolemy, it depicts a raven, a bird associated with stories about the god Apollo, perched on the back of Hydra the water snake. The four brightest stars, Gamma, Delta, Epsilon, and Beta Corvi, form a distinctive quadrilateral in the night sky.'], image: 'corvus.png', lightup: 'hidden',
  },
  crater: {
    title: 'Crater', text: ['Crater is a small constellation in the Southern Celestial Hemisphere. Its name means "cup" in Latin. One of the 48 constellations listed by the 2nd-century astronomer Ptolemy, it depicts a cup that has been associated with the god Apollo and is perched on the back of Hydra the water snake.'], image: 'crater.png', lightup: 'hidden',
  },
  crux: {
    title: 'Crux',
    text: [
      'Crux is a constellation located in the southern sky in a bright portion of the Milky Way. It is among the most easily distinguished constellations, as all of its four main stars have an apparent visual magnitude brighter than +2.8, even though it is the smallest of all 88 modern constellations. Its name is Latin for cross, and it is dominated by a cross-shaped or kite-like asterism that is commonly known as the Southern Cross.',
    ],
    image: 'crux.png',
    lightup: 'hidden',
  },
  cygnus: {
    title: 'Cygnus', text: ['Cygnus is a northern constellation lying on the plane of the Milky Way, deriving its name from the Latinized Greek word for swan. The swan is one of the most recognizable constellations of the northern summer and autumn, and it features a prominent asterism known as the Northern Cross. Cygnus was among the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations.'], image: 'cygnus.png', lightup: 'hidden',
  },
  delphinus: {
    title: 'Delphinus', text: ['Delphinus Eng. oth: ) is a constellation in the northern sky, close to the celestial equator. Its name is Latin for dolphin. Delphinus was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains among the 88 modern constellations recognized by the International Astronomical Union. It is one of the smaller constellations, ranked 69th in size.'], image: 'delphinus.png', lightup: 'hidden',
  },
  dorado: {
    title: 'Dorado', text: ['Dorado is a constellation in the southern sky. It was named in the late 16th century and is now one of the 88 modern constellations. Its name refers to the dolphinfish, which is known as dorado in Portuguese, although it has also been depicted as a swordfish. Dorado contains most of the Large Magellanic Cloud, the remainder being in the constellation Mensa. The South Ecliptic pole also lies within this constellation.'], image: 'dorado.png', lightup: 'hidden',
  },
  draco: {
    title: 'Draco', text: ['Draco is a constellation in the far northern sky. Its name is Latin for dragon. It was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and remains one of the 88 modern constellations today. The north pole of the ecliptic is in Draco. Draco is circumpolar, and can be seen all year from northern latitudes.'], image: 'draco.png', lightup: 'hidden',
  },
  equuleus: {
    title: 'Equuleus', text: ["Equuleus is a constellation. Its name is Latin for 'little horse', a foal. It was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and remains one of the 88 modern constellations. It is the second smallest of the modern constellations, spanning only 72 square degrees. It is also very faint, having no stars brighter than the fourth magnitude."], image: 'equuleus.png', lightup: 'hidden',
  },
  eridanus: {
    title: 'Eridanus', text: ['Eridanus is a constellation in the southern hemisphere. It is represented as a river. It was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations. It is the sixth largest of the modern constellations. The same name was later taken as a Latin name for the real Po River and also for the name of a minor river in Athens.'], image: 'eridanus.png', lightup: 'hidden',
  },
  fornax: {
    title: 'Fornax', text: ['Fornax is a constellation in the southern sky, partly ringed by the celestial river Eridanus. Its name is Latin for furnace. It was named by French astronomer Nicolas Louis de Lacaille in 1756. Fornax is one of the 88 modern constellations.'], image: 'fornax.png', lightup: 'hidden',
  },
  gemini: {
    title: 'Gemini',
    duration: 'May 22 - June 21',
    text: [
      'Gemini is the third astrological sign in the zodiac, spaning the 60–90th degree of the zodiac. Gemini is represented by The Twins Castor and Pollux. The symbol of the twins is based on the Dioscuri, two mortals that were granted shared godhood after death.',
      'The constellation has been known as the twins since ancient times but the name Gemini is thought to originate with the Romans.',
    ],
    image: 'gemini.gif',
    lightup: 'visible',
  },
  grus: {
    title: 'Grus', text: ["Grus is a constellation in the southern sky. Its name is Latin for the crane, a type of bird. It is one of twelve constellations conceived by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman. Grus first appeared on a 35-centimetre-diameter (14-inch) celestial globe published in 1598 in Amsterdam by Plancius and Jodocus Hondius and was depicted in Johann Bayer's star atlas Uranometria of 1603. French explorer and astronomer Nicolas-Louis de Lacaille gave Bayer designations to its stars in 1756, some of which had been previously considered part of the neighbouring constellation Piscis Austrinus. The constellations Grus, Pavo, Phoenix and Tucana are collectively known as the \"Southern Birds\"."], image: 'grus.png', lightup: 'hidden',
  },
  hercules: {
    title: 'Hercules', text: ['Hercules is a constellation named after Hercules, the Roman mythological hero adapted from the Greek hero Heracles. Hercules was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations today. It is the fifth largest of the modern constellations.'], image: 'hercules.png', lightup: 'hidden',
  },
  horologium: {
    title: 'Horologium', text: ["Horologium is a faint constellation in the southern sky. It was devised by French astronomer Nicolas Louis de Lacaille in 1752, and it remains one of the 88 modern constellations. The constellation's brightest star is Alpha Horologii, an orange giant. R Horologii is a red giant Mira variable with one of the widest ranges in brightness known. Three star systems have exoplanets, while Nu Horologii has a debris disk."], image: 'horologium.png', lightup: 'hidden',
  },
  hydra: {
    title: 'Hydra', text: ['Hydra is the largest of the 88 modern constellations, measuring 1303 square degrees. Also one of the longest at over 100 degrees, its southern end abuts Libra and Centaurus and its northern end borders Cancer. It has a long history, having been included among the 48 constellations listed by the 2nd century astronomer Ptolemy. It is commonly represented as a water snake. It should not be confused with the similarly named constellation of Hydrus.'], image: 'hydra.png', lightup: 'hidden',
  },
  hydrus: {
    title: 'Hydrus', text: ["Hydrus is a small constellation in the deep southern sky. It was one of twelve constellations created by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman and it first appeared on a 35-cm diameter celestial globe published in late 1597 in Amsterdam by Plancius and Jodocus Hondius. The first depiction of this constellation in a celestial atlas was in Johann Bayer's Uranometria of 1603. The French explorer and astronomer Nicolas Louis de Lacaille charted the brighter stars and gave their Bayer designations in 1756. Its name means \"male water snake\", as opposed to Hydra, a much larger constellation that represents a female water snake. It remains below the horizon for most Northern Hemisphere observers."], image: 'hydrus.png', lightup: 'hidden',
  },
  indus: {
    title: 'Indus', text: ['Indus is a constellation in the southern sky created in the late sixteenth century.'], image: 'indus.png', lightup: 'hidden',
  },
  lacerta: {
    title: 'Lacerta', text: ["Lacerta is one of the 88 modern constellations defined by the International Astronomical Union. Its name is Latin for lizard. A small, faint constellation, it was defined in 1687 by the astronomer Johannes Hevelius. Its brightest stars form a \"W\" shape similar to that of Cassiopeia, and it is thus sometimes referred to as 'Little Cassiopeia'. It is located between Cygnus, Cassiopeia and Andromeda on the northern celestial sphere. The northern part lies on the Milky Way."], image: 'lacerta.png', lightup: 'hidden',
  },
  leo: {
    title: 'Leo',
    duration: 'July 23 - August 21',
    text: [
      'Leo is the fifth astrological sign in the zodiac, spans the 120th to 150th degree of celestial longitude. The symbol of the lion is based on the Nemean lion, a lion with an impenetrable hide.',
      'In Greek mythology, Leo represented the Nemean Lion, which came down to Earth from the Moon and rampaged across the country-side until Hercules killed and skinned it as one of his Twelve Tasks. Zeus then returned the lion to the stars.',
    ],
    image: 'leo.gif',
    lightup: 'visible',
  },
  leominor: {
    title: 'Leo Minor', text: ['Leo Minor is a small and faint constellation in the northern celestial hemisphere. Its name is Latin for "the smaller lion", in contrast to Leo, the larger lion. It lies between the larger and more recognizable Ursa Major to the north and Leo to the south. Leo Minor was not regarded as a separate constellation by classical astronomers; it was designated by Johannes Hevelius in 1687.'], image: 'leominor.png', lightup: 'hidden',
  },
  lepus: {
    title: 'Lepus', text: ["Lepus is a constellation lying just south of the celestial equator. Its name is Latin for hare. It is located below—immediately south—of Orion, and is sometimes represented as a hare being chased by Orion or, alternatively, by Orion's hunting dogs."], image: 'lepus.png', lightup: 'hidden',
  },
  libra: {
    title: 'Libra',
    duration: 'September 24 - October 23',
    text: [
      'Libra is the seventh astrological sign in the Zodiac. It spans the 180–210th degree of the zodiac, between 180 and 207.25 degree of celestial longitude.',
      'The Scales were held by the Roman goddess of Justice, Astreae (Virgo) who lies directly to the west of Libra. She would use the Scales to weigh the souls of men on their way to the Underworld, to detemine whether they would have eternal pleasure or pain.',
    ],
    image: 'libra.gif',
    lightup: 'hidden',
  },
  lupus: {
    title: 'Lupus', text: ['Lupus is a constellation located in the deep Southern Sky. Its name is Latin for wolf. Lupus was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations, although it was previously an asterism associated with the neighboring constellation Centaurus.'], image: 'lupus.png', lightup: 'hidden',
  },
  lynx: {
    title: 'Lynx', text: ['Lynx is a constellation named after the animal, usually observed in the northern sky. The constellation was introduced in the late 17th century by Johannes Hevelius. It is a faint constellation, with its brightest stars forming a zigzag line. The orange giant Alpha Lyncis is the brightest star in the constellation, and the semiregular variable star Y Lyncis is a target for amateur astronomers. Six star systems have been found to contain planets. Those of 6 Lyncis and HD 75898 were discovered by the Doppler method; those of XO-2, XO-4, XO-5 and WASP-13 were observed as they passed in front of the host star.'], image: 'lynx.png', lightup: 'hidden',
  },
  lyra: {
    title: 'Lyra', text: ['Lyra is a small constellation. It is one of 48 listed by the 2nd century astronomer Ptolemy, and is one of the 88 constellations recognized by the International Astronomical Union. Lyra was often represented on star maps as a vulture or an eagle carrying a lyre, and hence is sometimes referred to as Vultur Cadens or Aquila Cadens, respectively. Beginning at the north, Lyra is bordered by Draco, Hercules, Vulpecula, and Cygnus. Lyra is visible from the northern hemisphere from spring through autumn, and nearly overhead, in temperate latitudes, during the summer months. From the southern hemisphere, it is visible low in the northern sky during the winter months.'], image: 'lyra.png', lightup: 'hidden',
  },
  mensa: {
    title: 'Mensa', text: ['Mensa is a constellation in the Southern Celestial Hemisphere near the south celestial pole, one of twelve constellations drawn up in the 18th century by French astronomer Nicolas Louis de Lacaille. Its name is Latin for table, though it originally depicted Table Mountain and was known as Mons Mensae. One of the 88 modern constellations, it covers a keystone-shaped wedge of sky approximately 153.5 square degrees by area. Other than the south polar constellation of Octans, it is the most southerly of constellations and is only observable south of the 5th parallel of the Northern Hemisphere.'], image: 'mensa.png', lightup: 'hidden',
  },
  microscopium: {
    title: 'Microscopium', text: ['Microscopium is a minor constellation in the Southern Celestial Hemisphere, one of twelve created in the 18th century by French astronomer Nicolas Louis de Lacaille and one of several depicting scientific instruments. Its name is a Latinised form of the Greek word for microscope. Its stars are faint and hardly visible from most of the non-tropical Northern Hemisphere.'], image: 'microscopium.png', lightup: 'hidden',
  },
  monoceros: {
    title: 'Monoceros', text: ['Monoceros is a faint constellation on the celestial equator. Its name is Greek for unicorn. Its definition is attributed to the 17th-century Dutch cartographer Petrus Plancius. It is bordered by Orion to the west, Gemini to the north, Canis Major to the south and Hydra to the east. Other bordering constellations include Canis Minor, Lepus and Puppis.'], image: 'monoceros.png', lightup: 'hidden',
  },
  musca: {
    title: 'Musca', text: ["Musca is a small constellation in the deep southern sky. It was one of 12 constellations created by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman, and it first appeared on a celestial globe 35 cm (14 in) in diameter published in 1597 in Amsterdam by Plancius and Jodocus Hondius. The first depiction of this constellation in a celestial atlas was in Johann Bayer's Uranometria of 1603. It was also known as Apis for 200 years. Musca remains below the horizon for most Northern Hemisphere observers."], image: 'musca.png', lightup: 'hidden',
  },
  norma: {
    title: 'Norma', text: ["Norma is a small constellation in the Southern Celestial Hemisphere between Ara and Lupus, one of twelve drawn up in the 18th century by French astronomer Nicolas-Louis de Lacaille and one of several depicting scientific instruments. Its name is Latin for normal, referring to a right angle, and is variously considered to represent a rule, a carpenter's square, a set square or a level. It remains one of the 88 modern constellations."], image: 'norma.png', lightup: 'hidden',
  },
  octans: {
    title: 'Octans', text: ['Octans is a faint constellation located in the deep southern sky. Its name is Latin for the eighth part of a circle, but it is named after the octant, a navigational instrument. The constellation was devised by French astronomer Nicolas Louis de Lacaille in 1752, and it remains one of the 88 modern constellations.'], image: 'octans.png', lightup: 'hidden',
  },
  ophiuchus: {
    title: 'Ophiuchus', text: ['Ophiuchus is a large constellation straddling the celestial equator. Its name is from the Greek Ὀφιοῦχος Ophioukhos; "serpent-bearer", and it is commonly represented as a man grasping the snake that is represented by the constellation Serpens. Ophiuchus was one of the 48 constellations listed by the 2nd-century astronomer Ptolemy, and it remains one of the 88 modern constellations. It was formerly referred to as Serpentarius and Anguitenens.'], image: 'ophiuchus.png', lightup: 'hidden',
  },
  orion: {
    title: 'Orion',
    duration: 'N/A',
    text: [
      'Orion is a prominent constellation located on the celestial equator and visible throughout the world. It is one of the most conspicuous and recognizable constellations in the night sky. It was named after Orion, a hunter in Greek mythology. Its brightest stars are Rigel and Betelgeuse, a blue-white and a red supergiant, respectively.',
      'In Greek mythology, Scorpius was a giant scorpion sent by Gaea the Earth to slay the giant Orion when he threatened to slay all the beasts of the world. Afterwards, Orion and the Scorpion were placed amongst the stars as constellations. The two opponents are never seen in the sky at the same time - for as one constellation rises, the other sets.',
    ],
    image: 'orion.png',
    lightup: 'visible',
  },
  pavo: {
    title: 'Pavo', text: ["Pavo is a constellation in the southern sky with the Latin name for peacock. Pavo first appeared on a 35-cm (14 in) diameter celestial globe published in 1598 in Amsterdam by Plancius and Jodocus Hondius and was depicted in Johann Bayer's star atlas Uranometria of 1603, and was likely conceived by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman. French explorer and astronomer Nicolas-Louis de Lacaille gave its stars Bayer designations in 1756. The constellations Pavo, Grus, Phoenix and Tucana are collectively known as the \"Southern Birds\"."], image: 'pavo.png', lightup: 'hidden',
  },
  pegasus: {
    title: 'Pegasus', text: ['Pegasus is a constellation in the northern sky, named after the winged horse Pegasus in Greek mythology. It was one of the 48 constellations listed by the 2nd-century astronomer Ptolemy, and is one of the 88 constellations recognised today.'], image: 'pegasus.png', lightup: 'hidden',
  },
  perseus: {
    title: 'Perseus', text: ['Perseus is a constellation in the northern sky, being named after the Greek mythological hero Perseus. It is one of the 48 listed by the 2nd-century astronomer Ptolemy, and among the 88 modern constellations defined by the International Astronomical Union (IAU). It is located near several other constellations named after ancient Greek legends surrounding Perseus, including Andromeda to the west and Cassiopeia to the north. Perseus is also bordered by Aries and Taurus to the south, Auriga to the east, Camelopardalis to the north, and Triangulum to the west. Some star atlases during the early 19th century also depicted Perseus holding the disembodied head of Medusa, whose asterism was named together as Perseus et Caput Medusae, however, this never came into popular usage.'], image: 'perseus.png', lightup: 'hidden',
  },
  phoenix: {
    title: 'Phoenix', text: ['Phoenix is a minor constellation in the southern sky. Named after the mythical phoenix, it was first depicted on a celestial atlas by Johann Bayer in his 1603 Uranometria. The French explorer and astronomer Nicolas Louis de Lacaille charted the brighter stars and gave their Bayer designations in 1756. The constellation stretches from roughly −39° to −57° declination, and from 23.5h to 2.5h of right ascension. The constellations Phoenix, Grus, Pavo and Tucana, are known as the Southern Birds.'], image: 'phoenix.png', lightup: 'hidden',
  },
  pictor: {
    title: 'Pictor', text: ["Pictor is a constellation in the Southern Celestial Hemisphere, located between the star Canopus and the Large Magellanic Cloud. Its name is Latin for painter, and is an abbreviation of the older name Equuleus Pictoris. Normally represented as an easel, Pictor was named by Abbé Nicolas-Louis de Lacaille in the 18th century. The constellation's brightest star is Alpha Pictoris, a white main-sequence star around 97 light-years away from Earth. Pictor also hosts RR Pictoris, a cataclysmic variable star system that flared up as a nova, reaching apparent (visual) magnitude 1.2 in 1925 before fading into obscurity."], image: 'pictor.png', lightup: 'hidden',
  },
  pisces: {
    title: 'Pisces',
    duration: 'February 10 - March 20 ',
    text: [
      'Pisces is the twelvth astrological sign in the Zodiac, spaning between 330° to 360° of the zodiac.',
      '"Pisces" is the Latin word for "Fishes." It is one of the earliest zodiac signs on record, with the two fish appearing as far back as c. 2300 BCE in Egypt. In Greek mythology, Pisces represents the fish, in which Aphrodite (or Venus) and her son Eros (or Cupid) transformed in order to escape the monster Typhon.',
    ],
    image: 'pisces.gif',
    lightup: 'visible',
  },
  piscisaustrinis: {
    title: 'Piscis Austrinis', text: ['Piscis Austrinus is a constellation in the southern celestial hemisphere. The name is Latin for "the southern fish", in contrast with the larger constellation Pisces, which represents a pair of fishes. Prior to the 20th century, it was also known as Piscis Notius. Its only star brighter than fourth magnitude is Fomalhaut, which is a first-magnitude star and is the eighteenth-brightest star in the night sky.'], image: 'piscisaustrinis.png', lightup: 'hidden',
  },
  puppis: {
    title: 'Puppis', text: ['Puppis is a constellation in the southern sky. Puppis, the Poop Deck, was originally part of an over-large constellation, the ship of "Jason and the Argonauts", Argo Navis, which centuries after its initial description was divided into three parts, the other two being Carina, and Vela. Puppis is the largest of the three constellations in square degrees. It is one of the 88 modern constellations recognized by the International Astronomical Union.'], image: 'puppis.png', lightup: 'hidden',
  },
  pyxis: {
    title: 'Pyxis', text: ["Pyxis is a small and faint constellation in the southern sky. Abbreviated from Pyxis Nautica, its name is Latin for a mariner's compass. Pyxis was introduced by Nicolas-Louis de Lacaille in the 18th century, and is counted among the 88 modern constellations."], image: 'pyxis.png', lightup: 'hidden',
  },
  reticulum: {
    title: 'Reticulum', text: ['Reticulum is a small, faint constellation in the southern sky. Its name is Latin for a small net, or reticle—a net of crosshairs at the focus of a telescope eyepiece that is used to measure star positions. The constellation is best viewed between October and December, but cannot be seen from middle to northern latitudes.'], image: 'reticulum.png', lightup: 'hidden',
  },
  sagitta: {
    title: 'Sagitta', text: ['Sagitta is a dim but distinctive constellation in the northern sky. Its name is Latin for "arrow", and it should not be confused with the significantly larger constellation Sagittarius, the archer. Although Sagitta is an ancient constellation, it has no star brighter than 3rd magnitude and has the third-smallest area of all constellations. It was included among the 48 constellations listed by the 2nd century astronomer Ptolemy, and it remains one of the 88 modern constellations defined by the International Astronomical Union. Located to the north of the equator, Sagitta can be seen from every location on Earth except within the Antarctic circle.'], image: 'sagitta.png', lightup: 'hidden',
  },
  sagittarius: {
    title: 'Sagittaruis',
    duration: 'November 23 - December 22',
    text: [
      'Sagittarius is the ninth astrological sign, which spans between 240–270th degrees of the zodiac.',
      "The symbol of the archer is based on the centaur Chiron, who mentored the Greek hero Achilles in archery, which then became the greatest warrior of Homer's Iliad after the Trojan War.",
    ],
    image: 'sagittaruis.gif',
    lightup: 'hidden',
  },
  scorpius: {
    title: 'Scorpio',
    duration: 'October 24 - November 22',
    text: [
      'Scorpio is the eighth astrological sign in the Zodiac. It spans the 210–240th degree of the zodiac.',
      'In Greek mythology, Scorpius was a giant scorpion sent by Gaea the Earth to slay the giant Orion when he threatened to slay all the beasts of the world. Afterwards, Orion and the Scorpion were placed amongst the stars as constellations. The two opponents are never seen in the sky at the same time - for as one constellation rises, the other sets.',
    ],
    image: 'scorpius.gif',
    lightup: 'hidden',
  },
  sculptor: {
    title: 'Sculptor', text: ['Sculptor is a small and faint constellation in the southern sky. It represents a sculptor. It was introduced by Nicolas Louis de Lacaille in the 18th century. He originally named it Apparatus Sculptoris, but the name was later shortened.'], image: 'sculptor.png', lightup: 'hidden',
  },
  scutum: {
    title: 'Scutum', text: ['Scutum is a small constellation introduced in the seventeenth century. Its name is Latin for shield.'], image: 'scutum.png', lightup: 'hidden',
  },
  serpens: {
    title: 'Serpens', text: ['Serpens is a constellation of the northern hemisphere. One of the 48 constellations listed by the 2nd-century astronomer Ptolemy, it remains one of the 88 modern constellations defined by the International Astronomical Union. It is unique among the modern constellations in being split into two non-contiguous parts, Serpens Caput to the west and Serpens Cauda to the east. Between these two halves lies the constellation of Ophiuchus, the "Serpent-Bearer". In figurative representations, the body of the serpent is represented as passing behind Ophiuchus between Mu Serpentis in Serpens Caput and Nu Serpentis in Serpens Cauda.'], image: 'serpens.png', lightup: 'hidden',
  },
  sextans: {
    title: 'Sextans', text: ['Sextans is a minor equatorial constellation which was introduced in 1687 by Johannes Hevelius. Its name is Latin for the astronomical sextant, an instrument that Hevelius made frequent use of in his observations.'], image: 'sextans.png', lightup: 'hidden',
  },
  taurus: {
    title: 'Taurus',
    duration: 'April 21 - May 21',
    text: [
      'Taurus is the second astrological sign in the present zodiac. It spans the 30–60th degree of the zodiac. The symbol of the bull is based on the Cretan Bull, the white bull that fathered the Minotaur who was killed by Theseus.',
      'It is an ancient constellation, created by the Sumarians around 3000 B.C., to mark where the sun would be in the sky at the Spring Equinox. At that time the bull was a powerful fertility symbol, so was a very appropriate symbol for the return of Spring.',
    ],
    image: 'taurus.gif',
    lightup: 'visible',
  },
  telescopium: {
    title: 'Telescopium', text: ['Telescopium is a minor constellation in the southern celestial hemisphere, one of twelve named in the 18th century by French astronomer Nicolas-Louis de Lacaille and one of several depicting scientific instruments. Its name is a Latinized form of the Greek word for telescope. Telescopium was later much reduced in size by Francis Baily and Benjamin Gould.'], image: 'telescopium.png', lightup: 'hidden',
  },
  triangulum: {
    title: 'Triangulum', text: ["Triangulum is a small constellation in the northern sky. Its name is Latin for \"triangle\", derived from its three brightest stars, which form a long and narrow triangle. Known to the ancient Babylonians and Greeks, Triangulum was one of the 48 constellations listed by the 2nd century astronomer Ptolemy. The celestial cartographers Johann Bayer and John Flamsteed catalogued the constellation's stars, giving six of them Bayer designations."], image: 'triangulum.png', lightup: 'hidden',
  },
  triangulumaustrale: {
    title: 'Triangulum Australe', text: ['Triangulum Australe is a small constellation in the far Southern Celestial Hemisphere. Its name is Latin for "the southern triangle", which distinguishes it from Triangulum in the northern sky and is derived from the almost equilateral pattern of its three brightest stars. It was first depicted on a celestial globe as Triangulus Antarcticus by Petrus Plancius in 1589, and later with more accuracy and its current name by Johann Bayer in his 1603 Uranometria. The French explorer and astronomer Nicolas Louis de Lacaille charted and gave the brighter stars their Bayer designations in 1756.'], image: 'triangulumaustrale.png', lightup: 'hidden',
  },
  tucana: {
    title: 'Tucana', text: ["Tucana is a constellation of stars in the southern sky, named after the toucan, a South American bird. It is one of twelve constellations conceived in the late sixteenth century by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman. Tucana first appeared on a 35-centimetre-diameter (14 in) celestial globe published in 1598 in Amsterdam by Plancius and Jodocus Hondius and was depicted in Johann Bayer's star atlas Uranometria of 1603. French explorer and astronomer Nicolas Louis de Lacaille gave its stars Bayer designations in 1756. The constellations Tucana, Grus, Phoenix and Pavo are collectively known as the \"Southern Birds\"."], image: 'tucana.png', lightup: 'hidden',
  },
  ursamajor: {
    title: 'Ursa Major', text: ['Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory. Its Latin name means "greater she-bear", standing as a reference to and in direct contrast with nearby Ursa Minor, the lesser bear. In antiquity, it was one of the original 48 constellations listed by Ptolemy, and is now the third largest constellation of the 88 modern constellations.'], image: 'ursamajor.png', lightup: 'hidden',
  },
  ursaminor: {
    title: 'Ursa Minor', text: ['Ursa Minor, also known as the Little Bear, is a constellation in the Northern Sky. Like the Great Bear, the tail of the Little Bear may also be seen as the handle of a ladle, hence the North American name, Little Dipper: seven stars with four in its bowl like its partner the Big Dipper. It was one of the 48 constellations listed by the 2nd-century astronomer Ptolemy, and remains one of the 88 modern constellations. Ursa Minor has traditionally been important for navigation, particularly by mariners, because of Polaris being the North Star.'], image: 'ursaminor.png', lightup: 'hidden',
  },
  vela: {
    title: 'Vela', text: ['Vela is a constellation in the southern sky. Its name is Latin for the sails of a ship, and it was originally part of a larger constellation, the ship Argo Navis, which was later divided into three parts, the others being Carina and Puppis. With an apparent magnitude of 1.8, its brightest star is the hot blue multiple star Gamma Velorum, one component of which is the brightest Wolf-Rayet star in the sky. Delta and Kappa Velorum, together with Epsilon and Iota Carinae, form the asterism known as the False Cross. 1.95-magnitude Delta is actually a triple or quintuple star system.'], image: 'vela.png', lightup: 'hidden',
  },
  virgo: {
    title: 'Virgo',
    duration: 'August 22 - September 23',
    text: [
      'Virgo is the sixth astrological sign in the Zodiac, and the second-largest constellation. It spans the 150-180th degree of the zodiac.',
      'Virgo was drawn in the Egyptian zodiac and was said to represent the goddess Isis. To the Romans she was Astrea, the goddess of Justice, holding the Scales of Libra in her hand. The Greeks connected her with Ceres and Persephone, from a well known myth that describes the cycle of the harvest.',
    ],
    image: 'virgo.gif',
    lightup: 'hidden',
  },
  volans: {
    title: 'Volans', text: ["Volans is a constellation in the southern sky. It represents a flying fish; its name is a shortened form of its original name, Piscis Volans. Volans was one of twelve constellations created by Petrus Plancius from the observations of Pieter Dirkszoon Keyser and Frederick de Houtman and it first appeared on a 35-cm diameter celestial globe published in 1597 in Amsterdam by Plancius with Jodocus Hondius. The first depiction of this constellation in a celestial atlas was in Johann Bayer's Uranometria of 1603."], image: 'volans.png', lightup: 'hidden',
  },
  vulpecula: {
    title: 'Vulpecula', text: ['Vulpecula is a faint constellation in the northern sky. Its name is Latin for "little fox", although it is commonly known simply as the fox. It was identified in the seventeenth century, and is located in the middle of the Summer Triangle.'], image: 'vulpecula.png', lightup: 'hidden',
  },
};
