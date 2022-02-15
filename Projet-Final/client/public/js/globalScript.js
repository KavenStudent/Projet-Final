const tagsArray = [];

window.onload = function () {
  showConditions();
  loadPageAccueil();
  // empeche d'utiliser la touche entrer dans les forms
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
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


function displayTagMatches() {
  let value = document.getElementById('tagCreate').value;

  if (value.length > 0) {
    const matchArray = findTag(value, tagsArray);
    console.log(matchArray);
  }

}
const searchInput = document.querySelector('.tagCreate');


