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
        initialiser(reponse.msg); // msg = Email deja utilise
        $("#modal-Membre").modal("hide");
      } else if (reponse.idMembre != null) {
        window.location.reload();
      }
    },
    fail: function (err) {},
  });
}

function connexion() {
  var form = new FormData(document.getElementById("form-connexion"));

  if (!document.getElementById("form-connexion").checkValidity()) {
    document.getElementById("validation-connexion").click();
  } else {
    $.ajax({
      type: "POST",
      url: "./Projet-Final/membre/membreController.php",
      data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (reponse) {
        if (reponse.msg != "") {
          initialiser(reponse.msg); // msg = erreur information connexion
          $("#modal-Connexion").modal("hide");
          document.getElementById("form-connexion").reset();
        } else {
          window.location.reload();
        }
      },
      fail: function (err) {},
    });
  }
}

function deconnexion() {
  var form = new FormData();
  form.append("action", "deconnexion");

  $.ajax({
    type: "POST",
    url: "Projet-Final/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {
      window.location.reload();
      membresVue(reponse);
    },
    fail: function (err) {},
  });
}
