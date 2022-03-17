var projetVue = function (response) {
  var action = response.action;
  switch (action) {
    case "pageProjet":
      afficherPageProjet(response);
      break;
    case "pageProjetEdit":
      afficherPageProjetEdit(response);
      break;
    case "pageProjetAjouter":
      ajouterProjetAffichage(response);
      break;
    case "autreProjet":
      afficherPageAutreProjet(response);
      break;
    case "afficherRaison":
      afficherModalRaison(response);
      break;
    case "redirigerPageMembre":
      redirigerPageMembre(response.idMembre, response.message);
  }
};

function afficherPageProjet(json) {
  let thumbnail;
  if (json.projet.thumbnail == "") {
    thumbnail = "defaultThumbnail.png";
  } else {
    thumbnail = json.projet.thumbnail;
  }
  var contenu = `<!-- modal confirmation supression de projet -->
  <div class="modal fade" id="modalConfirmationSupprProj" tabindex="-1">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header modalHeader">
                  <h5 class="modal-title"><strong>Supprimer projet</strong></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <!-- Form confirmation -->
  
                  <p>Êtes vous certains de vouloir supprimer ce projet? Cette action est irréversible.</p>
  
                      <div class="modal-footer">
                          <button data-bs-dismiss="modal" id="projetSupprSubmit" type="button" class="btn btn-primary" onclick="supprimerProjet(${json.projet.id}, ${json.projet.idCreator})">Confirmer</button>
                      </div>
  
                  <!-- Fin form confirmation -->
              </div>
  
          </div>
      </div>
  </div> <!-- Fin modal confirmation -->
  <div id="contenuRecherche"></div><div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/${thumbnail}' class='img-fluid, img-thumbnail'"
            alt="Vignette">
        <div class="d-grid gap-2">`;

  if (json.projet.path.length > 0) {
    contenu += `<a onclick="telechargerProjet(${json.projet.id})" class="btn btn-primary"href="Projet-Final/serveur/projet/fichiersProjet/${json.projet.path}" download>
          Télécharger
         </a>`;
  }

  contenu += `<button class="btn btn-primary" type="button" onclick="loadPageProjet('pageProjetEdit', ${json.projet.id})">Modifier le projet</button>
            <button data-bs-toggle="modal" data-bs-target="#modalConfirmationSupprProj" class="btn btn-danger" type="button">Supprimer</button>    
  </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="javascript:loadAutreMembre(${json.projet.idCreator})" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.nomComplet}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">`;

  //List participants
  if (json.tabParticipantsProjet.length > 0) {
    json.tabParticipantsProjet.forEach((membreProjet) => {
      if (membreProjet.prive != 1) {
        contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="loadAutreMembre(${membreProjet.idMembre})">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
      } else {
        contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="afficherSnackbar('Ce membre est privé')" class="memberLink">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
      }
    });
  }

  let partArray = json.projet.autreParticipant.split(",");
  partArray.forEach((participant) => {
    contenu += ` <li class="list-inline-item">${participant}</li>`;
  });

  //List tags
  contenu += `</ul><ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline" aria-label="Tags:">`;

  if (json.tabTagsProjet.length > 0) {
    json.tabTagsProjet.forEach((tagProjet) => {
      contenu += `<li class="list-inline-item"><a href="#navbarNavAltMarkup" onclick="tagCliquable('${tagProjet.nomTag}')">${tagProjet.nomTag}</a> |</li>`;
    });
    contenu = contenu.substring(0, contenu.length - 7) + "</li>";
  }


  contenu += `</ul>`;

  //Description
  contenu += `  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> `;

  // array.forEach(tags => {
  //     //mettre les tags
  // });
  contenu += `Lien: <a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
    
        </div>
    </div>
</div>`;
  $("#contenu").html(contenu);
}

function afficherPageProjetEdit(json) {
  var contenu = `<div id="contenuRecherche"></div><form id="formProjetEdit" class="editProj">

  <input type="submit" id="validation-form-projet-edit" class="validation" />

<div class="form-outline mb-69">
 <label class="form-label ftxt" for="form6Example3">Titre:</label>
 <input name="titreProjetEdit" type="text" id="form6Example3" class="form-control" placeholder="Example" value="${json.projet.titre}" required/>
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Description:</label>
 <textarea name="descriptionProjetEdit" class="form-control ftxt" id="form6Example7" rows="4" placeholder="Description" required>${json.projet.description}</textarea>
</div>

<div class="form-outline mb-69">
     <label class="form-label" for="participantsProjet">Participants:</label>
      <!-- PARTICIPANTS TAGS -->
     <div class="participant-container">`;
  if (
    json.tabParticipantsProjet != null ||
    json.tabParticipantsProjet.length > 0
  ) {
    json.tabParticipantsProjet.forEach((participant) => {
      contenu += `<div class="tag participant">
      <span class="participantValueCreate" >${participant.prenom} ${participant.nom} ${participant.idMembre}</span>
      <i class="material-icons btnCloseParticipant" data-item="${participant.prenom} ${participant.nom} ${participant.idMembre}">close</i>
    </div>`;
    });
  }

  if (
    json.projet.autreParticipant != null &&
    json.projet.autreParticipant.trim() != ""
  ) {
    json.projet.autreParticipant.split(",").forEach((participant) => {
      contenu += `<div class="tag participant">
        <span class="participantValueCreate" >${participant}</span>
        <i class="material-icons btnCloseParticipant" data-item="${participant}">close</i>
      </div>`;
    });
  }

  contenu += `<input id="participantsInput" type="text" onkeypress="return /[0-9a-zA-Z -]/i.test(event.key)" />
  </div>
  <p class="noteEnter">Note: Utiliser "enter" pour ajouter un participant.</p>

  <div id='participantsReponse' class="suggestionsDivision"></div> </div>


      <div class="form-outline mb-69">
 <label class="form-label" for="form6Example5">Lien:</label>
 <input name="lienProjetEdit" type="url" id="form6Example5" class="form-control" placeholder="Lien..." value="${json.projet.lienExterne}"/>
</div>

<!-- Message input -->
    <div class="form-outline mb-69">
      <label class="form-label" for="tagProjet">Tags:</label>

      <!-- TAGS ICI -->
      <div class="tag-container">`;
  if (json.tabTagsProjet != null && json.tabTagsProjet != "") {
    json.tabTagsProjet.forEach((tags) => {
      contenu += `<div class="tag etiquette">
    <span class="tagValueCreate" >${tags.nomTag}</span>
    <i class="material-icons btnCloseEtiquette" data-item="${tags.nomTag}">close</i>
    </div>`;
    });
  }

  contenu += `<input id="monInputTag" type="text" onkeypress="return /[0-9a-zA-Z -]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un tag.</p>
    
     <div id='tagsReponse' class="suggestionsDivision"></div>
   </div>

<div class="col-md-5 order-md-1 customize">
<img id="output" src="Projet-Final/serveur/projet/thumbnail/${json.projet.thumbnail}" class="rounded mx-auto d-block" height="600px" width="600px">


<div class="form-outline-inpt inpt">
<input class="form-control" name="thumbnail" type="file" accept="image/*" onchange="loadFile(event)">
</div>

<h3>Fichier du projet</h3>
   <div class="form-outline-inpt inpt">
   <input class="form-control" type="file" accept=".zip,.rar,.7zip" name='inputFichierEdit' id="inputFichierEdit" onchange="validationFichier('inputFichierEdit', ${json.premium})">
   </div>
   <p class="noteEnter">Note: Choisissez un fichier compresser que les utilisateurs pourront télécharger</p>

   <div class="col-sm profilEdit">
<div class="form-check form-switch" id='projetSwitchBox'>`;

  if (json.projet.prive == 0) {
    contenu += `<input class="form-check-input" type="hidden"  name='projetPublicEdit' value='0' />`;
    contenu += `<input class="form-check-input" type="checkbox"  name='projetPublicEdit' value='1' />`;
  } else {
    contenu += `<input class="form-check-input" type="hidden"  name='projetPublicEdit' value='0' />`;
    contenu += `<input class="form-check-input" type="checkbox"  name='projetPublicEdit' value='1' checked />`;
  }

  contenu += `<label class="form-check-label" for="flexSwitchCheckChecked">Projet prive</label>
  </div>
 </div>
  <button type="submit" class="btn btn-primary btn-block mb-4 canBtn">Cancel</button>
<button type="button" class="btn btn-primary btn-block mb-4" onclick="validerProjetEdit(${json.projet.id})">Sauvegarder</button>
</form>`;
  $("#contenu").html(contenu);

  setTagsArray(new Array());

  json.tabTags.forEach((element) => {
    tagsArray.push(element.nomTag);
  });

  //Système de tags
  clearTagsBase();
  setTagsBase();

  let monInputTag = document.getElementById("monInputTag");

  //Ajoute la fonction de add des tags quand je press enter.
  monInputTag.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && monInputTag.value != "") {
      addTag(
        monInputTag.value,
        "monInputTag",
        ".tag-container",
        "#tagsReponse",
        tags,
        "tagValueCreate",
        "etiquette"
      );
    }

    displayTagMatches2();
  });

  clearParticipantsBase();
  setParticipantsBase();

  json.tabParticipants.forEach((element) => {
    participantsArray.push(element);
  });

  let monInputParticipant = document.getElementById("participantsInput");

  monInputParticipant.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && monInputParticipant.value != "") {
      addTag(
        monInputParticipant.value,
        "participantsInput",
        ".participant-container",
        "#participantsReponse",
        participants,
        "participantValueCreate",
        "participant"
      );
    }

    displayParticipantsMatches();
  });
}

function ajouterProjetAffichage(json) {
  var contenu = `<div id="contenuRecherche"></div><form id='ajouterProjetForm' class="editProj">

  <input type="submit" id="validation-form-projet-create" class="validation" />

    <!-- Text input -->
   <div class="form-outline mb-69">
     <label class="form-label ftxt" for="titreProjet">Titre:</label>
     <input type="text" name="titreProjet" class="form-control" placeholder="Titre" required>
     
   </div>
 

   <!-- Message input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="descriptionProjet">Description:</label>
     <textarea class="form-control ftxt" name="descriptionProjet" rows="4" placeholder="Description" required></textarea>
     
   </div>
 
   <!-- Message input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="participantsProjet">Participants:</label>
      <!-- PARTICIPANTS TAGS -->
     <div class="participant-container">
        <input id="participantsInput" type="text" onkeypress="return /[0-9a-zA-Z -]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un participant.</p>

      <div id='participantsReponse' class="suggestionsDivision"></div>
   </div>
 
   <!-- Lien input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="lienProjet">Lien:</label>
     <input type="url" name="lienProjet" class="form-control" placeholder="Lien">
     
   </div>
 <!-- Message input -->
    <div class="form-outline mb-69">
      <label class="form-label" for="tagProjet">Tags:</label>

      <!-- TAGS ICI -->
      <div class="tag-container">

        <input id="monInputTag" type="text" onkeypress="return /[0-9a-zA-Z -]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un tag.</p>
    
     <div id='tagsReponse' class="suggestionsDivision"></div>
   </div>
   <div class="col-md-5 order-md-1 customize">
 
   <img id="outputThumbnail" src="Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png" class="rounded mx-auto d-block" height="600px" width="600px">
   
 
   <div class="form-outline-inpt inpt">
   <input class="form-control" type="file" accept="image/*" onchange="loadFileThumbnail(event)" name='imageVignette' id="imagView">
   </div>

   <h3>Fichier du projet</h3>
   <div class="form-outline-inpt inpt">
   <input class="form-control" type="file" accept=".zip,.rar,.7zip" name='inputFichier' id="inputFichier" onchange="validationFichier('inputFichier', ${json.premium})">
   </div>
   <p class="noteEnter">Note: Choisissez un fichier compresser que les utilisateurs pourront télécharger</p>
 
 </div>
   <!-- Submit button -->
   <button type="reset" onclick="resetForm();" class="btn btn-primary btn-block mb-4 canBtn">Réinitialiser les champs</button>
   <button type="button" onclick="loadMembre('pageMembre', ${json.idMembre}, '')" class="btn btn-primary btn-block mb-4 canBtn">Annuler</button>
   <button type="button" onclick="validerProjetCreate(${json.idMembre})" class="btn btn-primary btn-block mb-4">Ajouter</button>

 </form>`;

  $("#contenu").html(contenu);

  setTagsArray(new Array());

  json.tabTags.forEach((element) => {
    tagsArray.push(element.nomTag);
  });

  //Système de tags
  clearTagsBase();

  let monInputTag = document.getElementById("monInputTag");

  //Ajoute la fonction de add des tags quand je press enter.
  monInputTag.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && monInputTag.value != "") {
      addTag(
        monInputTag.value,
        "monInputTag",
        ".tag-container",
        "#tagsReponse",
        tags,
        "tagValueCreate",
        "etiquette"
      );
    }

    displayTagMatches2();
  });
  setParticipantsArray(new Array());
  clearParticipantsBase();

  json.tabParticipants.forEach((element) => {
    participantsArray.push(element);
  });

  let monInputParticipant = document.getElementById("participantsInput");

  monInputParticipant.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && monInputParticipant.value != "") {
      addTag(
        monInputParticipant.value,
        "participantsInput",
        ".participant-container",
        "#participantsReponse",
        participants,
        "participantValueCreate",
        "participant"
      );
    }

    displayParticipantsMatches();
  });
}
function afficherPageAutreProjet(json) {
  let thumbnail;
  if (json.projet.thumbnail == "") {
    thumbnail = "defaultThumbnail.png";
  } else {
    thumbnail = json.projet.thumbnail;
  }
  var contenu = `<!-- modal signalisation -->
  <div class="modal fade" id="modalSignaler" tabindex="-1">
  
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header modalHeader">
                  <h5 class="modal-title"><strong>Signalisation</strong></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <!-- Form signaler -->
  
                  <form class="form-connexion connexionContainer" id="form-signaler">
  
                    <input type="hidden" name="idMembre" value="${json.projet.idCreator}">
  
                      <div class="myInput">
                          <label for="pages" class="form-label">Raison</label>
                          <textarea id="raison-input" name="description" rows="4" cols="50" required></textarea>
                      </div>
  
                      <!-- La liste des projets -->
                      <div id='list-projet'>`;

  contenu += `
                        <div class="col-sm">
                          <input class="form-check-input" type="radio" name="projetRadio" id="projetRadio" value="${json.projet.id}" checked>
                          <label class="form-check-label" for="projetRadio" name="titre">${json.projet.titre}</label>
                        </div>`;

  contenu += `</div>
  
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" onclick="ajouterSignalerRequete()">Signaler</button>
                      </div>
                  </form>
  
                  <!-- Form signaler -->
              </div>
  
          </div>
      </div>
  </div>
  </div> <!-- fin modal signalisation -->`;

  contenu += `<div id="contenuRecherche"></div><div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/${thumbnail}' class='img-fluid, img-thumbnail'"
            alt="Vignette">
        <div class="d-grid gap-2">`;

  if (json.projet.path.length > 0) {
    contenu += `<a  class="btn btn-primary"href="Projet-Final/serveur/projet/fichiersProjet/${json.projet.path}" download>
          Télécharger
          </a>`;
  }

  if (document.getElementById("typePage").value === "admin") {
    if (json.projet.prive == 1) {
      contenu += `<button class="btn btn-danger" type="button" onclick="adminCacherProjet(${json.projet.id}, 0)">Rendre visible le projet</button>`;
    } else {
      contenu += `<button class="btn btn-danger" type="button" onclick="adminCacherProjet(${json.projet.id}, 1)">Cacher le projet</button>`;
    }
  } else {
    contenu += `<button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalSignaler">Signaler</button>`;
  }

  contenu += `</div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="javascript:loadAutreMembre(${json.projet.idCreator})" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.nomComplet}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">`;

  //List participants
  json.tabParticipantsProjet.forEach((membreProjet) => {
    if (membreProjet.prive != 1) {
      contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="loadAutreMembre(${membreProjet.idMembre})">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
    } else {
      contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="afficherSnackbar('Ce membre est privé')" class="memberLink">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
    }
  });

  let partArray = json.projet.autreParticipant.split(",");
  partArray.forEach((participant) => {
    contenu += ` <li class="list-inline-item">${participant}</li>`;
  });

  contenu += `</ul>`;
  //List tags
  contenu += `<ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline"
  aria-label="Tags: ">`;

  json.tabTagsProjet.forEach((tagProjet) => {
    contenu += `<li class="list-inline-item"><a href="#navbarNavAltMarkup" onclick="tagCliquable('${tagProjet.nomTag}')">${tagProjet.nomTag}</a> |</li>`;
  });
  contenu = contenu.substring(0, contenu.length - 7) + "</li>";
  contenu += `</ul>`;


  //Description
  contenu += `  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> `;

  // array.forEach(tags => {
  //     //mettre les tags
  // });
  contenu += `Lien: <a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
        </div>
    </div>
</div>`;
  $("#contenu").html(contenu);
}

function redirigerPageMembre(idMembre, message) {
  loadMembre("pageMembre", idMembre, message);
}

function afficherModalRaison(json) {
  let contenu = "";
  let compteur = 1;
  if (json.tabRaison.length > 0) {
    json.tabRaison.forEach((raison) => {
      if (raison.idProjet != null) {
        contenu += `  <div class="card descriptionCard" onclick="loadPageAutreProjet(${raison.idProjet})">`;
        contenu += `<div class="card-header">
          Raison #${compteur} :
        </div>
        <div class="card-body">
     
          <p><span style="color:red">Projet signalé :</span> ${raison.titre} #${raison.idProjet}</p>
          <p>Description : ${raison.description}</p>
     
        </div>
      </div>`;
      }
      else {
        contenu += `  <div class="card descriptionCard">`;
        contenu += `<div class="card-header">
        Raison #${compteur} : 
        </div>
        <div class="card-body">
     
          <p>Description : ${raison.description}</p>
     
        </div>
      </div>`;
      }
      compteur++;

    });
  } else if (json.tabRaison.length == 0) {
    contenu += `<div> Aucune signalisation </div>`;
  }


  $(".divSignalisation").html(contenu);
  $("#modalSignalisation").modal("show");
}
