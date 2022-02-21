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
      projetVue(reponse);
    },
    fail: function (err) {},
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
      projetVue(reponse);
    },
    fail: function (err) {},
    complete: function () {
      $(".lds-ring").addClass("hidden");
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
      projetVue(reponse);
    },
    fail: function (err) {},
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
      projetVue(reponse);
    },
    fail: function (err) {},
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
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
    fail: function (err) {},
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}

function loadPageAutreProjet(idProjet) {
  var form = new FormData();
  form.append("action", "loadAutreProjet");
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
      projetVue(reponse);
    },
    fail: function (err) {},
    complete: function () {
      $(".lds-ring").addClass("hidden");
    },
  });
}
