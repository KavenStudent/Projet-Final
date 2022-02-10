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
let valider = (id) => {
  let myForm = document.getElementById(id);
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

function afficherToast(text, header) {
  let textBody = document.getElementById("toastBody");
  let headerToast = document.getElementById("headerToast");
  let headerDivToast = document.getElementById("toastHeader");
  let toastDiv = document.getElementById("toast");

  textBody.innerHTML = text;
  textBody.style.color = "black";
  textBody.style.backgroundColor = "#cac7c7";

  headerToast.innerHTML = header;
  headerToast.style.color = "black";

  headerDivToast.style.backgroundColor = "#4169E1";
  toastDiv.style.backgroundColor = "#4169E1";

  $("#toast").toast("show");
  document.getElementById("toast").scrollIntoView();
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
