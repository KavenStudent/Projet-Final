function enregistrerMembre() {
  var form = new FormData(document.getElementById("form-enregistrer-membre"));

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {
      if (reponse.msg != null) {
        afficherToast(reponse.msg, "Erreur");
        $("#modalInscription").modal("hide");
      } else if (reponse.idMembre != null) {
        window.location.reload();
      }
    },
    fail: function (err) { },
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
      success: function (reponse) {
        if (reponse.msg != "") {
          afficherToast(reponse.msg, "Erreur de connexion");
          $("#modalConnexion").modal("hide");
          document.getElementById("form-connexion").reset();
        } else {
          window.location.reload();
        }
      }
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
    success: function (reponse) {
      window.location.reload();
    }
  });
}

function getMembre() {
  var form = new FormData();
  form.append("action", "getMembre");
  form.append("id", document.getElementById("myMemberid").value);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {
      membresVue(reponse);
    },
    fail: function (err) { },
  });
}

function modifierMembre() {
  var form = new FormData(document.getElementById("membreEditForme"));
  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {

      if (reponse.msg != null) {
        loadMembre("pageMembre", reponse.idDuMembre);
        afficherToast(reponse.msg, "Message");
      }
    }
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
    success: function (reponse) {
      membresVue(reponse);
    }
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
    success: function (reponse) {
      membresVue(reponse);

    }
  });
}
