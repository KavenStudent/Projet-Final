function loadPageProjet(destination, idProjet) {
  var form = new FormData();
  form.append("action", "loadProjet");
  form.append("destination", destination);
  form.append("idProjet", idProjet);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $(".lds-ring").addClass("hidden");

    },
  });
}

function loadPageAjouterProjet(idMembre) {
  var form = new FormData();
  form.append("action", "loadPageAjouterProjet");
  form.append("idMembre", idMembre);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}

function ajouterProjetRequete(idMembre) {
  var form = new FormData(document.getElementById("ajouterProjetForm"));
  form.append("action", "ajouterProjet");
  form.append("idMembre", idMembre);
  form.append("tags", getTagsValue("tagValueCreate"));
  form.append("participantsProjet", getTagsValue("participantValueCreate"));

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
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
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}

function modifierProjet(idProjet) {
  var form = new FormData(document.getElementById("formProjetEdit"));
  form.append("action", "modifierProjet");
  form.append("idProjet", idProjet);
  form.append("tagsEdit", getTagsValue("tagValueCreate"));
  form.append("participantsProjetEdit", getTagsValue("participantValueCreate"));

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      $(".lds-ring").addClass("hidden");
      projetVue(reponse);
    },
    fail: function (err) {$(".lds-ring").addClass("hidden"); },

  });
}

function getAlltags() {
  var form = new FormData();
  form.append("action", "getAllTags");

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}

function loadPageAutreProjet(idProjet) {
  var form = new FormData();
  form.append("action", "loadAutreProjet");
  form.append("idProjet", idProjet);

  $('#modalSignalisation').modal('hide');
  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}

function loadJsonRecherhe() {
  var form = new FormData();
  form.append("action", "loadJsonRecherhe");

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {
      projetVue(reponse);
      setData(reponse.tabMembres, reponse.tabProjets);
    },
    fail: function (err) { },
  });
}

function telechargerProjet(idProjet) {
  var form = new FormData();
  form.append("action", "telechargerProjet");
  form.append("idProjet", idProjet);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    beforeSend: function () {
      $(".lds-ring").removeClass("hidden");
    },
    success: function (reponse) {
      loadJsonRecherhe();
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}

function supprimerProjet(idProjet, idMembre) {
  var form = new FormData();
  form.append("action", "supprimerProjet");
  form.append("idProjet", idProjet);
  form.append("idMembre", idMembre);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
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
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}

function afficherRaison(idMembre) {
  var form = new FormData();
  form.append("action", "afficherRaison");
  form.append("idMembre", idMembre);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
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
      projetVue(reponse);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}

function adminCacherProjet(idProjet, valeur) {
  var form = new FormData();
  form.append("action", "adminCacherProjet");
  form.append("idProjet", idProjet);
  form.append("valeur", valeur);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/projet/projetController.php",
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
      projetVue(reponse);
      afficherSnackbar(reponse.msg);
    },
    fail: function (err) { },
    complete: function () {
    },
  });
}