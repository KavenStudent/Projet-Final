const tagsArray = [];

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

// fonction reset form et Image vide

function resetForm() {
  setTimeout(function () {
    var output = document.getElementById('output');
    output.src = "Projet-Final/client/public/images/default-image.png";
  }, 0);
}


function findTag(tag, tagsArray) {
  return tagsArray.filter(t => {

    if (t.toLowerCase().includes(tag.toLowerCase())) {
      return t;
    }

  });
}


// TAGS VIM

let tags = [];

//Setter la liste de tags
function setTagsBase(originalTags){
  tags = originalTags;
}

//Creer un Tag
function createTag(label){
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeBtn = document.createElement('i');
  closeBtn.setAttribute('class', 'material-icons');
  closeBtn.setAttribute('data-item', label);
  closeBtn.innerHTML = 'close';

  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}


//Ajoute un tag
function addTag(label){
  if(isLabelExist(label)){
    afficherSnackbar("Le tag est déja là!");
  }else{
    tags.push(label);
    addTags();
    let monInputTag = document.getElementById('monInputTag');
    monInputTag.value = '';
  }
}


//Ajoute ma liste de tags dans la div
function addTags(){
    clearTags();
    tags.slice().reverse().forEach(function(tag){
    const input = createTag(tag);
    const tagContainer = document.querySelector('.tag-container');
    tagContainer.prepend(input);
    $('#tagsReponse').html("");
    })
  }

//Clear ma liste de tags
function clearTags(){
  document.querySelectorAll('.tag').forEach(function(tag){
    tag.parentElement.removeChild(tag);
  });
}

// Permet de cut un tag parmi la liste de tags
document.addEventListener('click', function(e){
  if(e.target.tagName === 'I'){
    const value = e.target.getAttribute('data-item');
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index),  ...tags.slice(index + 1)];
    addTags();
    
  }
})

//Permet de Vérifier si le tag est déja dans la list
function isLabelExist(label){
  let exist = false;
  if(tags.length > 0){
    tags.forEach(function(tag){
      if(tag === label){
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
    console.log(matchArray);
    matchArray.forEach(element => {
      contenu += `<p class="suggestionTags" onclick="addTag('${element}')">${element}</p>`;
    });
  }
  $('#tagsReponse').html(contenu);
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

