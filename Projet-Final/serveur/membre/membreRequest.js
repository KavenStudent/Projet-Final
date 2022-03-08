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

function loadMembre(pageType, idMembre, msg) {
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
      if (msg != undefined && msg.length > 0)
        afficherSnackbar(msg);
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

function loadPageRecherche() {
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
      membresVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $('.lds-ring').addClass('hidden');
    },

  });
}

function ajouterSignalerRequete() {
  var form = new FormData(document.getElementById('form-signaler'));
  form.append("action", "ajouterSignalisation");

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
      console.log('succes');
      membresVue(reponse);
    },
    fail: function (err) {
      console.log('fail');
    },
    complete: function () {
      console.log('complete');
      $('.lds-ring').addClass('hidden');
    },

  });

}

function adminCacherMembre(idMembre, valeur) {
  var form = new FormData();
  form.append("action", "adminCacherMembre");
  form.append("idMembre", idMembre);
  form.append("valeur", valeur);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      $(".lds-ring").addClass("hidden");
      membresVue(reponse);
      afficherSnackbar(reponse.msg);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}

function devenirPremium() {
  var form = new FormData();
  form.append("action", "devenirPremium");
  form.append("idMembre", document.getElementById("typePage").value);


  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      $(".lds-ring").addClass("hidden");
      membresVue(reponse);
      afficherSnackbar(reponse.msg);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}