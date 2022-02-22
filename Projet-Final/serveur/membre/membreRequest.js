function enregistrerMembre() {
  var form = new FormData(document.getElementById("form-enregistrer-membre"));

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      if (reponse.msg != null) {
        afficherSnackbar(reponse.msg);
        $("#modalInscription").modal("hide");
      } else if (reponse.idMembre != null) {
        window.location.reload();
      }
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}

function connexion() {
  var form = new FormData(document.getElementById("form-connexion"));

  if (!document.getElementById("form-connexion").checkValidity()) {
    document.getElementById("validation-connexion").click();
  } else {
    $.ajax({
      type: "POST",
      url: "./Projet-Final/serveur/membre/membreController.php",
      data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      beforeSend: function () {
        $('.lds-ring').removeClass('hidden');
      },
      success: function (reponse) {
        if (reponse.msg != "") {
          afficherSnackbar(reponse.msg);
          $("#modalConnexion").modal("hide");
          document.getElementById("form-connexion").reset();
        } else {
          window.location.reload();
        }
      },
      fail: function (err) { },
      complete: function () {
        $('.lds-ring').addClass('hidden');
      },
    });
  }

}

function deconnexion() {
  var form = new FormData();
  form.append("action", "deconnexion");

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      window.location.reload();

      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },
  });
}




function modifierMembre() {
  var form = new FormData(document.getElementById("membreEditForm"));

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      if (reponse.msg != null) {
        loadMembre("pageMembre", reponse.idDuMembre);
        afficherSnackbar(reponse.msg);
      }
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },
  });

}

function loadMembre(pageType, idMembre) {
  var form = new FormData();
  form.append("action", "loadMembre");
  form.append("idMembre", idMembre);
  form.append("page", pageType);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      loadJsonRecherhe();
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}


function loadAutreMembre(idMembre) {
  var form = new FormData();
  form.append("action", "loadAutrePageMembre");
  form.append("idMembre", idMembre);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      loadJsonRecherhe();
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}



function loadPageAccueil() {
  var form = new FormData();
  form.append("action", "loadPageAccueil");
  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      loadJsonRecherhe();
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}

function loadPageAdmin() {
  var form = new FormData();
  form.append("action", "loadPageAdmin");

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      loadJsonRecherhe();
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}

function loadPageRecherche(){
  var form = new FormData();
  form.append("action", "loadPageRecherche");

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $('.lds-ring').removeClass('hidden');
    },
    success: function (reponse) {
      loadJsonRecherhe();
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}