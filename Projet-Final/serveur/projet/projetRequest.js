function loadPageProjet(destination, idProjet) {
  var form = new FormData();
  form.append("action", "loadProjet");
  form.append("destination", destination);
  form.append("idProjet", idProjet);

  $.ajax({
    type: "POST",
    url: "./Projet-Final/serveur/membre/membreController.php",
    data: form,
    dataType: "json",
    contentType: false,
    processData: false,
    success: function (reponse) {
      // window.location();
      projetVue(reponse);
    },
    fail: function (err) {},
  });
}
