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
      url: "./Projet-Final/serveur/membre/membreController.php",
      data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (reponse) {
        if (reponse.msg != "") {
          afficherToastMiseAJourReussi(reponse.msg, "Fail");
          //   initialiser(reponse.msg); // msg = erreur information connexion
          $("#modalConnexion").modal("hide");
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
    url: "./Projet-Final/serveur/membre/membreController.php",
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

function getMembre(){
	var form = new FormData();
	form.append('action', 'getMembre');
	form.append('id', document.getElementById('myMemberid').value);

	$.ajax({
		type : 'POST',
    url: "./Projet-Final/serveur/membre/membreController.php",
		data : form,
		dataType : 'json',
		contentType : false,
		processData : false,
		success : function (reponse){
				membresVue(reponse);
			
		},
		fail : function (err){
		 
		}
	});
}

function modifierMembre(){
	var form = new FormData(document.getElementById('membre-edit'));
	$.ajax({
		type : 'POST',
    url: "./Projet-Final/serveur/membre/membreController.php",
		data : form,
		dataType : 'json', 
		contentType : false,
		processData : false,
		success : function (reponse){
			if(reponse.msg != null){
				initialiser(reponse.msg); // msg = Profil à jour
				$("#modal-profil-Membre").modal('hide');

			}else{
				membresVue(reponse);
			}
		},
		fail : function (err){
		 
		}
	});
}