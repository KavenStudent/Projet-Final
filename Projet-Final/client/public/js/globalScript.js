// -----------------VARIABLES POUR SAUVEGARDER TOUT LES TAGS ET PARTICIPANTS DE LA BASE DE DONNÉES
let tagsArray = [];
let participantsArray = [];
let firstLoad = false;
// -----------------FUNCTION POUR SET LES TAGS
function setTagsArray(newArray) {
  tagsArray = newArray;
}
// -----------------FUNCTION POUR SET LES PARTICIPANTS
function setParticipantsArray(newArray) {
  participantsArray = newArray;
}

// SYSTEME DE RECHERCHE
// DEUX VARIABLES LOCALES SAUVEGARDENT LISTE DE MEMBRES ET LISTE DE PROJETS
let dataMembre = [];
let dataProjet = [];

// GETTER POUR LISTE DE MEMBRES
function getDataMembre() {
  return dataMembre;
}
// GETTER POUR LISTE DE PROJETS
function getDataProjet() {
  return dataProjet;
}
// SETTER POUR LA LISTE DE MEMBRES ET LISTE DE PROJETS DANS LES VARIABLES LOCALES
function setData(newDataMembres, newDataProjets) {
  dataMembre = new Array();
  dataProjet = new Array();

  if (newDataMembres != null || newDataMembres.length > 0) {
    newDataMembres.forEach(function (membre) {
      dataMembre.push(membre);
    });
  }

  if (newDataProjets != null || newDataProjets.length > 0) {
    newDataProjets.forEach(function (projet) {
      dataProjet.push(projet);
    });
  }
}
// FUNCTION POUR FILTRER LA LISTE DE MEMBRES
function filterDataMembre(input, membre) {
  let isExist = false;
  let nom = membre.nom.toLowerCase();
  let prenom = membre.prenom.toLowerCase();
  if (nom.includes(input) || prenom.includes(input)) {
    isExist = true;
  }
  return isExist;
}
// FUNCTION POUR FILTRER LA LISTE DE PROJETS
function filterDataProjet(input, projet) {
  let isExist = false;
  let prenomCreateur = projet.prenom.toLowerCase();
  let nomCreateur = projet.nom.toLowerCase();
  let tags = projet.tags;
  if (tags != null && tags.length > 0) {
    tags = tags.toLowerCase();
  }
  let titre = projet.titre.toLowerCase();
  if (
    prenomCreateur.includes(input) ||
    nomCreateur.includes(input) ||
    tags.includes(input) ||
    titre.includes(input)
  ) {
    isExist = true;
  }
  return isExist;
}
// FUNCTION POUR ENLEVER TOUT LES CHARACTÈRES DANS LE CHAMP DE RECHERCHE
function clearInputSearch() {
  let searchBar = document.getElementById("searchBar");
  searchBar.value = "";
  firstLoad = false;
}
// FUNCTION POUR AFFICHER LA LISTE DE MEMBRES ET LA LISTE DE PROJETS À PARTIR DE LA BASE DE DONNÉES LOCALES
function loadData() {
  let dataMembre = getDataMembre();
  let dataProjet = getDataProjet();
  let contenuMembre = "";
  let contenuProjet = "";

  let searchBar = document.getElementById("searchBar");
  let input = searchBar.value.toLowerCase();

  if (dataMembre != null || dataMembre.length > 0) {
    dataMembre.forEach(function (membre) {
      if (filterDataMembre(input, membre) && membre.prive != 1) {
        contenuMembre += `
              <div class="cardMembreSuggestion" onclick="loadAutreMembre(${membre.id});clearInputSearch(); ">
                  <img class="imageProfilMembreSuggestion" src="Projet-Final/serveur/membre/images-profil/${membre.imageProfil}">
                  <p class="nomMembreSuggestion">${membre.prenom} ${membre.nom}</p>
                  <p class="idMembreSuggestion"># ${membre.id}</p>
              </div> `;
      }
    });
  }

  if (dataProjet != null || dataProjet.length > 0) {
    dataProjet.forEach(function (projet) {
      if (filterDataProjet(input, projet) && projet.prive != 1) {
        contenuProjet += `<div class="cardProjetSuggestion" onclick="loadPageAutreProjet(${projet.idProjet}); clearInputSearch();">
          <p class="titreProjetSuggestion">${projet.titre}</p>
          <p class="createurProjetSuggestion">${projet.prenom} ${projet.nom}</p>
          <p class="nombreTelechargement">${projet.nbTelechargement}</p>
          </div>`;
      }
    });
  }

  $("#contenuCardsMembre").html(contenuMembre);
  $("#contenuCardsProjet").html(contenuProjet);
}

// ---------------------------------------QUAND LA PAGE EST LOAD--------EXECUTE PLUSIEURS ACTIONS
window.onload = function () {
  loadPage();
  // empeche d'utiliser la touche entrer dans les forms -----LE ENTER CAUSE UN BOGUE, SA FAIT RELOAD LA PAGE À LA PLACE D'ACTIVER UNE FONCTION (SUBMIT LE FORM DANS LE VIDE)
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  //EYE INSCRIPTION
  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#password");

  togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });

  //EYE CONFIRM INSCRIPTION
  const togglePasswordConfirm = document.querySelector(
    "#togglePasswordConfirm"
  );
  const confirmPassword = document.querySelector("#confirmPassword");

  togglePasswordConfirm.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });

  //EYE CONNEXION
  const togglePasswordConnexion = document.querySelector(
    "#togglePasswordConnexion"
  );
  const passwordConnexion = document.querySelector("#passwordConnexion");

  togglePasswordConnexion.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      passwordConnexion.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordConnexion.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });

  // SEARCH BAR
  let searchBar = document.getElementById("searchBar");

  $("#searchBar").keyup(function (event) {
    //Si la valeur est vide, elle efface le contenu de Recherche
    if (searchBar.value == "" || searchBar.value === null) {
      $("#contenuRecherche").html("");
      firstLoad = false;
    }

    //Si ya une valeur et il n'est pas sur la page de recherche return la page de recherche
    if (searchBar.value != "" && firstLoad === false) {
      firstLoad = true;
      loadPageRecherche();
    }

    //Si ya une valeur et sur la page de recherche, il load le data
    if (searchBar.value != "" && firstLoad === true) {
      loadData();
    }
  });
};
// --------------------------------------------------------------FIN QUAND LA PAGE EST LOAD----------------
// FUNCTION POUR SETTER LE EYE DU PASSWORD DANS LA PAGE EDIT MEMBRE LORSQUE QUAND LOAD LA PAGE MEMBRE EDIT
function setEyesDansFormEdit() {
  //EYE DANS FORM MODFICATION
  const togglePasswordModification = document.querySelector(
    "#togglePasswordModification"
  );
  const passwordModification = document.querySelector("#passwordEdit");

  togglePasswordModification.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      passwordModification.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordModification.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });

  //EYE DANS FORM MODFICATION CONFIRMATION
  const togglePasswordModificationConfirmation = document.querySelector(
    "#togglePasswordModificationConfirmation"
  );
  const passwordModificationConfirmation = document.querySelector(
    "#confirmPasswordEdit"
  );

  togglePasswordModificationConfirmation.addEventListener("click", function () {
    // toggle the type attribute
    const type =
      passwordModificationConfirmation.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordModificationConfirmation.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });
}
// FUNCTION LORSQUE QU'ON CLIQUE SUR UN TAG LA RECHERCHE SERA APPELÉ AUTOMATIQUEMENT POUR CE TAG
function tagCliquable(input) {
  document.getElementById("searchBar").value = input;
  //Si ya une valeur et il n'est pas sur la page de recherche return la page de recherche
  if (input != "" && firstLoad === false) {
    firstLoad = true;
    loadPageRecherche();
  }

  //Si ya une valeur et sur la page de recherche, il load le data
  if (input != "" && firstLoad === true) {
    loadData();
  }
}

// VALIDER LE FORM DEVENIR MEMBRE
function valider() {
  let myForm = document.getElementById("form-enregistrer-membre");
  let password = myForm.password.value;
  let confirmPassword = myForm.confirmPassword.value;
  let pattern = /^[A-Za-z0-9\p{S}]{8,}$/;
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById("validation-form-membre").click();
    valide = false;
  } else if (!(password.trim() === confirmPassword.trim())) {
    document.getElementById("msg-confirm-password-erreur").style.display =
      "block";
    valide = false;
  } else if (!pattern.test(password)) {
    document.getElementById("msg-password-erreur").style.display = "block";
    valide = false;
  }

  if (valide) {
    enregistrerMembre();
  }
}

// VALIDER LE FORM MODIFIER MEMBRE
function validerMembreEdit() {
  let myForm = document.getElementById("membreEditForm");
  let password = myForm.passwordEdit.value;
  let confirmPassword = myForm.confirmPasswordEdit.value;
  let pattern = /^[A-Za-z0-9\p{P}\p{S}]{8,}$/;
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById("validation-form-membre-edit").click();
    valide = false;
  } else if (!(password.trim() === confirmPassword.trim())) {
    document.getElementById("msg-confirm-password-erreur-edit").style.display =
      "block";
    valide = false;
  } else if (!pattern.test(password)) {
    document.getElementById("msg-password-erreur-edit").style.display = "block";
    valide = false;
  }

  if (valide) {
    modifierMembre();
  }
}

// VALIDER LE FORM CREER PROJET
function validerProjetCreate(idProjet) {
  let myForm = document.getElementById("ajouterProjetForm");
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById("validation-form-projet-create").click();
    valide = false;
  }

  if (valide) {
    ajouterProjetRequete(idProjet);
  }
}

// VALIDER LE FORM MODIFIER PROJET
function validerProjetEdit(idProjet) {
  let myForm = document.getElementById("formProjetEdit");
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById("validation-form-projet-edit").click();
    valide = false;
  }

  if (valide) {
    modifierProjet(idProjet);
  }
}
// AFFICHER UN SNACKBAR
function afficherSnackbar(text) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}

//PERMET DE FERMER LES TOASTS
function closeToast() {
  $("#toast").toast("hide");
  $("#toastForm").toast("hide");
}

//FUNCTION POUR LOAD UNE IMAGE

var loadFile = function (event) {
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

// FUNCTION POUR LOAD UN IMAGE THUMBNAIL
var loadFileThumbnail = function (event) {
  var output = document.getElementById("outputThumbnail");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

// FUNCTION POUR RESET LE FORM ET UNLOAD L'IMAGE

function resetForm() {
  setTimeout(function () {
    var output = document.getElementById("outputThumbnail");
    output.src = "Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png";
  }, 0);
}
// FUNCTION POUR CHERCHER UN TAG DANS UNE LISTE DE TAGS
function findTag(tag, tagsArray) {
  return tagsArray.filter((t) => {
    if (t.toLowerCase().includes(tag.toLowerCase())) {
      return t;
    }
  });
}
// FUNCTION POUR CHERCHER UN PARTICIPANT DANS UNE LISTE DE PARTICIPANTS
function findParticipant(participant, participantsArray) {
  return participantsArray.filter((p) => {
    let nomComplet = p.prenom + " " + p.nom;
    if (nomComplet.toLowerCase().includes(participant.toLowerCase())) {
      return p;
    }
  });
}

// TAGS SYSTEM
// LISTE DE TAGS D'UN PROJET ET LISTE DE PARTICIPANTS D'UN PROJET
let tags = [];
let participants = [];

//Setter la liste de tags
function setTagsBase() {
  getTagsValue("tagValueCreate").forEach(function (item) {
    tags.push(item);
  });
}

//Setter la liste de participants
function setParticipantsBase() {
  getTagsValue("participantValueCreate").forEach(function (item) {
    participants.push(item);
  });
}

//Clear les tags
function clearTagsBase() {
  tags = new Array();
}

//Cleat les participants
function clearParticipantsBase() {
  participants = new Array();
}

//Creer un Tag
function createTag(label, nomDeClasse, classTag) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  div.classList.add(classTag);
  const span = document.createElement("span");
  span.setAttribute("class", nomDeClasse);
  span.innerHTML = label;
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "material-icons");
  if (classTag == "etiquette") {
    closeBtn.classList.add("btnCloseEtiquette");
  } else {
    closeBtn.classList.add("btnCloseParticipant");
  }

  closeBtn.setAttribute("data-item", label);
  closeBtn.innerHTML = "close";
  // ------------------VIEW DU TAG------------------------------------------
  // <div class="tag etiquette">
  // <span class="tagValueCreate" >label</span>
  // <i class="material-icons btnCloseEtiquette" data-item='label'>close</i>
  // </div>

  // <div class="tag participant">
  // <span class="participantValueCreate" >label</span>
  // <i class="material-icons btnCloseParticipant" data-item='label'>close</i>
  // </div>

  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

//Permet de prendre toutes les tags présents
function getTagsValue(nomDeClasse) {
  let allTags = [].slice.call(document.getElementsByClassName(nomDeClasse));
  let allTagsValue = new Array();
  if (allTags != null) {
    allTags.forEach((unSpanTag) => {
      allTagsValue.push(unSpanTag.innerHTML);
    });
  }

  return allTagsValue;
}

//Ajoute un tag
function addTag(
  label,
  idInput,
  classContainer,
  idSuggestionReponse,
  list,
  nomDeClasse,
  classTag
) {
  if (isLabelExist(label, list)) {
    afficherSnackbar("Le tag est déja là!");
  } else {
    list.push(label);
    addTags(classContainer, idSuggestionReponse, list, nomDeClasse, classTag);
    let input = document.getElementById(idInput);
    input.value = "";
  }
}

//Ajoute ma liste de tags dans la div
function addTags(
  classContainer,
  idSuggestionReponse,
  list,
  nomDeClasse,
  classTag
) {
  clearTags(classTag);
  list
    .slice()
    .reverse()
    .forEach(function (item) {
      const input = createTag(item, nomDeClasse, classTag);
      const tagsContainer = document.querySelector(classContainer);
      tagsContainer.prepend(input);
      $(idSuggestionReponse).html("");
    });
}

//Clear ma liste de tags
function clearTags(classTag) {
  let myTag = "." + classTag;
  document.querySelectorAll(myTag).forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

// Permet de cut un tag parmi la liste de tags
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btnCloseEtiquette")) {
    const value = e.target.getAttribute("data-item");
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags(
      ".tag-container",
      "#tagsReponse",
      tags,
      "tagValueCreate",
      "etiquette"
    );
  }

  if (e.target.classList.contains("btnCloseParticipant")) {
    const value = e.target.getAttribute("data-item");
    const index = participants.indexOf(value);
    participants = [
      ...participants.slice(0, index),
      ...participants.slice(index + 1),
    ];
    addTags(
      ".participant-container",
      "#participantsReponse",
      participants,
      "participantValueCreate",
      "participant"
    );
  }
});

//Permet de Vérifier si le tag est déja dans la list
function isLabelExist(label, list) {
  let exist = false;
  if (list.length > 0) {
    list.forEach(function (tag) {
      if (tag === label) {
        exist = true;
      }
    });
  }
  return exist;
}

//Permet de chercher s'il existe puis afficher les tags en suggestion
function displayTagMatches2() {
  let value = document.getElementById("monInputTag").value;
  let contenu = "";
  if (value.length > 0) {
    const matchArray = findTag(value, tagsArray);
    matchArray.forEach((element) => {
      contenu += `<p class="suggestion" onclick="addTag('${element}', 'monInputTag' , '.tag-container' , '#tagsReponse', tags, 'tagValueCreate' ,'etiquette' )">${element}</p>`;
    });
  }
  $("#tagsReponse").html(contenu);
}
// Permet de chercher s'il existe puis afficher les participants en suggestion
function displayParticipantsMatches() {
  let value = document.getElementById("participantsInput").value;
  let contenu = "";
  if (value.length > 0) {
    const matchArray = findParticipant(value, participantsArray);
    matchArray.forEach((element) => {
      contenu += `<p class="suggestion" onclick="addTag('${element.prenom} ${element.nom} ${element.id}', 'participantsInput', '.participant-container', '#participantsReponse', participants, 'participantValueCreate' ,'participant' )">${element.prenom} ${element.nom} ${element.id}</p>`;
    });
  }
  $("#participantsReponse").html(contenu);
}
// function pour loader soit la page d'acceuil, soit la page admin ou la page Membre
function loadPage() {
  var typePage = document.getElementById("typePage").value;

  switch (typePage) {
    case "visiteur":
      loadPageAccueil();
      break;
    case "admin":
      loadPageAdmin();
      break;
    default:
      loadMembre(`pageMembre`, typePage);
  }
}

// Permet d'afficher le slider avec le paiement par paypal.
function afficheSlidePayment() {
  let bsOffcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasRight")
  );
  bsOffcanvas.show(); // affiche le canvas du panier
  afficherPaypal();
}
