const tagsArray = [];
const participantsArray = [];

let dataMembre = [];
let dataProjet = [];

function getDataMembre(){
  return dataMembre;
}

function getDataProjet(){
  return dataProjet;
}

function setData(newDataMembres, newDataProjets){
  dataMembre = new Array();
  dataProjet = new Array();



  if(newDataMembres != null || newDataMembres.length > 0){
    newDataMembres.forEach(function(membre){
        dataMembre.push(membre);
    });
  }

   if(newDataProjets != null || newDataProjets.length > 0){
    newDataProjets.forEach(function(projet){
      dataProjet.push(projet);
    });
  }
}

function filterDataMembre(input, membre){
  let isExist = false;
  let nom = membre.nom.toLowerCase();
  let prenom = membre.prenom.toLowerCase();
  if(nom.includes(input) || prenom.includes(input)){
     isExist = true;
  }
  return isExist;
}

function filterDataProjet(input, projet){
  let isExist = false;
  let prenomCreateur = projet.prenom.toLowerCase();
  let nomCreateur = projet.nom.toLowerCase();
  let tags = projet.tags.toLowerCase();
  if(prenomCreateur.includes(input) || nomCreateur.includes(input) || tags.includes(input)){
    isExist = true;
  }
  return isExist;
}

function loadData(){
   let dataMembre = getDataMembre();
    let dataProjet = getDataProjet();
    let contenuMembre = '';
    let contenuProjet = '';

    let searchBar = document.getElementById("searchBar");
    let input = searchBar.value.toLowerCase();

      if(dataMembre != null || dataMembre.length > 0){
        dataMembre.forEach(function(membre){
        
            if(filterDataMembre(input, membre)){
              contenuMembre +=`
              <div class="cardMembreSuggestion">
                  <img class="imageProfilMembreSuggestion" src="Projet-Final/serveur/membre/images-profil/${membre.imageProfil}">
                  <p class="nomMembreSuggestion">${membre.prenom} ${membre.nom}</p>
                  <p class="idMembreSuggestion"># ${membre.id}</p>
              </div> `;
            }
            
        });

      }


      if(dataProjet != null || dataProjet.length > 0){
       dataProjet.forEach(function(projet){
         if(filterDataProjet(input, projet)){
           contenuProjet += `<div class="cardProjetSuggestion">
          <p class="titreProjetSuggestion">${projet.titre}</p>
          <p class="createurProjetSuggestion">${projet.prenom} ${projet.nom}</p>
          <p class="nombreTelechargement">${projet.nbTelechargement}</p>
          </div>`;
         }
      });

      }

      console.log(contenuMembre);
    
      $('#contenuCardsMembre').html(contenuMembre);
      $('#contenuCardsProjet').html(contenuProjet);
       
}


window.onload = function () {
  showConditions();
  loadPage();
  // empeche d'utiliser la touche entrer dans les forms
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
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });

  //EYE CONFIRM INSCRIPTION 
  const togglePasswordConfirm = document.querySelector("#togglePasswordConfirm");
  const confirmPassword = document.querySelector("#confirmPassword");

  togglePasswordConfirm.addEventListener("click", function () {
    // toggle the type attribute
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });


  //EYE CONNEXION
  const togglePasswordConnexion = document.querySelector("#togglePasswordConnexion");
  const passwordConnexion = document.querySelector("#passwordConnexion");

  togglePasswordConnexion.addEventListener("click", function () {
    // toggle the type attribute
    const type = passwordConnexion.getAttribute("type") === "password" ? "text" : "password";
    passwordConnexion.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
  });


  // SEARCH BAR
  let searchBar = document.getElementById("searchBar");
  let firstTime = false;
  $('#searchBar').keyup(function (event) {
    if (searchBar.value == '') {
      loadPage();
      firstTime = false;
    } else {
      if(firstTime ==false){
          loadPageRecherche();
          firstTime = true;
      }else{
        if(firstTime){
          loadData();
        }
      }
    
      
    }
    
  });





};

// fonction show terme et conditions
function showConditions() {
  var coll = document.getElementsByClassName("collapsible");

  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

// valide le form devenir membre
function valider() {
  let myForm = document.getElementById('form-enregistrer-membre');
  let password = myForm.password.value;
  let confirmPassword = myForm.confirmPassword.value;
  let pattern = /^[A-Za-z0-9\p{P}\p{S}]{8,}$/;
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById('validation-form-membre').click();
    valide = false;

  } else if (!(password.trim() === confirmPassword.trim())) {

    document.getElementById('msg-confirm-password-erreur').style.display = 'block';
    valide = false;

  } else if (!pattern.test(password)) {

    document.getElementById('msg-password-erreur').style.display = 'block';
    valide = false;
  }

  if (valide) {
    enregistrerMembre();
  }

}

// valide le form modifier
function validerMembreEdit() {
  let myForm = document.getElementById('membreEditForm');
  let password = myForm.passwordEdit.value;
  let confirmPassword = myForm.confirmPasswordEdit.value;
  let pattern = /^[A-Za-z0-9\p{P}\p{S}]{8,}$/;
  let valide = true;

  if (!myForm.checkValidity()) {
    document.getElementById('validation-form-membre-edit').click();
    valide = false;

  } else if (!(password.trim() === confirmPassword.trim())) {

    document.getElementById('msg-confirm-password-erreur-edit').style.display = 'block';
    valide = false;

  } else if (!pattern.test(password)) {

    document.getElementById('msg-password-erreur-edit').style.display = 'block';
    valide = false;

  }

  if (valide) {
    modifierMembre();
  }

}


function afficherSnackbar(text) {
  var x = document.getElementById("snackbar");
  x.innerHTML = text;
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//Permet de fermer les toasts
function closeToast() {
  $("#toast").toast("hide");
  $("#toastForm").toast("hide");
}

// fonction onload Image

var loadFile = function (event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src) // free memory
  }
};

// fonction onload Image Thumbnail 
var loadFileThumbnail = function (event) {
  var output = document.getElementById('outputThumbnail');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src) // free memory
  }
};

// fonction reset form et Image vide

function resetForm() {
  setTimeout(function () {
    var output = document.getElementById('outputThumbnail');
    output.src = "Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png";
  }, 0);
}


function findTag(tag, tagsArray) {
  return tagsArray.filter(t => {

    if (t.toLowerCase().includes(tag.toLowerCase())) {
      return t;
    }

  });
}

function findParticipant(participant, participantsArray) {
  return participantsArray.filter(p => {
    let nomComplet = p.prenom + " " + p.nom;
    if (nomComplet.toLowerCase().includes(participant.toLowerCase())) {
      return p;
    }

  });
}


// TAGS SYSTEM

let tags = [];
let participants = [];

//Setter la liste de tags
function setTagsBase(originalTags) {
  tags = originalTags;
}

//Setter la liste de participants
function setParticipantsBase(originalParticipants) {
  participants = originalParticipants;
}

//Creer un Tag
function createTag(label, nomDeClasse, classTag) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  div.classList.add(classTag);
  const span = document.createElement('span');
  span.setAttribute('class', nomDeClasse);
  span.innerHTML = label;
  const closeBtn = document.createElement('i');
  closeBtn.setAttribute('class', 'material-icons');
  if (classTag == 'etiquette') {
    closeBtn.classList.add('btnCloseEtiquette');
  } else {
    closeBtn.classList.add('btnCloseParticipant');
  }

  closeBtn.setAttribute('data-item', label);
  closeBtn.innerHTML = 'close';

  // <div class="tag" id="">
  // <span class="tagValueCreate" >label</span>
  // <i class="material-icons" data-item='label'>close</i>
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
    allTags.forEach(unSpanTag => {
      allTagsValue.push(unSpanTag.innerHTML);
    })
  }

  return allTagsValue;
}


//Ajoute un tag
function addTag(label, idInput, classContainer, idSuggestionReponse, list, nomDeClasse, classTag) {
  if (isLabelExist(label, list)) {
    afficherSnackbar("Le tag est déja là!");
  } else {
    list.push(label);
    addTags(classContainer, idSuggestionReponse, list, nomDeClasse, classTag);
    let input = document.getElementById(idInput);
    input.value = '';
  }
}


//Ajoute ma liste de tags dans la div
function addTags(classContainer, idSuggestionReponse, list, nomDeClasse, classTag) {
  clearTags(classTag);
  list.slice().reverse().forEach(function (item) {
    const input = createTag(item, nomDeClasse, classTag);
    const tagsContainer = document.querySelector(classContainer);
    tagsContainer.prepend(input);
    $(idSuggestionReponse).html("");
  })
}

//Clear ma liste de tags
function clearTags(classTag) {
  let myTag = "." + classTag;
  document.querySelectorAll(myTag).forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

// Permet de cut un tag parmi la liste de tags
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btnCloseEtiquette')) {
    const value = e.target.getAttribute('data-item');
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    addTags('.tag-container', "#tagsReponse", tags, 'tagValueCreate', 'etiquette');
  }

  if (e.target.classList.contains('btnCloseParticipant')) {
    const value = e.target.getAttribute('data-item');
    const index = participants.indexOf(value);
    participants = [...participants.slice(0, index), ...participants.slice(index + 1)];
    addTags('.participant-container', '#participantsReponse', participants, 'participantValueCreate', 'participant');
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
    })
  }
  return exist;
}

//Ajoute des suggestions et add le tag lors du click de la suggestion
function displayTagMatches2() {
  let value = document.getElementById('monInputTag').value;
  let contenu = '';
  if (value.length > 0) {
    const matchArray = findTag(value, tagsArray);
    matchArray.forEach(element => {
      contenu += `<p class="suggestion" onclick="addTag('${element}', 'monInputTag' , '.tag-container' , '#tagsReponse', tags, 'tagValueCreate' ,'etiquette' )">${element}</p>`;
    });
  }
  $('#tagsReponse').html(contenu);
}


function displayParticipantsMatches() {
  let value = document.getElementById('participantsInput').value;
  let contenu = '';
  if (value.length > 0) {
    const matchArray = findParticipant(value, participantsArray);
    matchArray.forEach(element => {
      contenu += `<p class="suggestion" onclick="addTag('${element.prenom} ${element.nom} ${element.id}', 'participantsInput', '.participant-container', '#participantsReponse', participants, 'participantValueCreate' ,'participant' )">${element.prenom} ${element.nom} ${element.id}</p>`;
    });
  }
  $('#participantsReponse').html(contenu);
}











function loadPage() {

  var typePage = document.getElementById('typePage').value;

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

