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
    case "AjouterProjetReussi":
      ajouterProjetReussi(response.idMembre);
      break;
    case "autreProjet":
      afficherPageAutreProjet(response);
      break;
  }
};

function afficherPageProjet(json) {
  let thumbnail;
  if (json.projet.thumbnail == "") {
    thumbnail = "defaultThumbnail.png";
  } else {
    thumbnail = json.projet.thumbnail;
  }
  var contenu = `<div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/${thumbnail}' class='img-fluid, img-thumbnail'"
            alt="Vignette">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Télécharger</button>
            <button class="btn btn-primary" type="button" onclick="loadPageProjet('pageProjetEdit', ${json.projet.id})">Modifier le projet</button>
        </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="javascript:loadAutreMembre(${json.projet.idCreator})" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.nomComplet}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">`;

  //List participants
  json.tabParticipants.forEach((membreProjet) => {
    contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="loadAutreMembre(${membreProjet.idMembre})">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
  });
  contenu += ` <li class="list-inline-item">${json.projet.autreParticipant}</li> </ul>`;

  //List tags
  contenu += `<ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline"
  aria-label="Tags: ">`;

  json.tabTags.forEach((tagProjet) => {
    contenu += ` <li class="list-inline-item">${tagProjet.nomTag},</li>`;
  });
  contenu += `</ul>`;

  //Description
  contenu += `  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> `;

  // array.forEach(tags => {
  //     //mettre les tags
  // });
  contenu += `Lien: <a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
        <div class="form-check form-switch">
        </div>
    </div>
</div>`;
  $("#contenu").html(contenu);
}

function afficherPageProjetEdit(json) {
  var contenu = `<form  class="editProj">


<div class="form-outline mb-69">
 <label class="form-label ftxt" for="form6Example3">Titre:</label>
 <input name="titreProjetEdit" type="text" id="form6Example3" class="form-control" placeholder="Example" value="${json.projet.titre}"/>
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Description:</label>
 <textarea name="descriptionProjetEdit" class="form-control ftxt" id="form6Example7" rows="4" placeholder="Description">${json.projet.description}</textarea>
</div>

<div class="form-outline mb-69">
     <label class="form-label" for="participantsProjet">Participants:</label>
      <!-- PARTICIPANTS TAGS -->
     <div class="participant-container">
        <input id="participantsInput" type="text" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un participant.</p>

      <div id='participantsReponse' class="suggestionsDivision"></div>
   </div>


<div class="form-outline mb-69">
 <label class="form-label" for="form6Example5">Lien:</label>
 <input name="lienProjetEdit" type="url" id="form6Example5" class="form-control" placeholder="Lien..." value="${json.projet.lienExterne}"/>
</div>

<!-- Message input -->
    <div class="form-outline mb-69">
      <label class="form-label" for="tagProjet">Tags:</label>

      <!-- TAGS ICI -->
      <div class="tag-container">

        <input id="monInputTag" type="text" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un tag.</p>
    
     <div id='tagsReponse' class="suggestionsDivision"></div>
   </div>

<div class="col-md-5 order-md-1 customize">
<img id="output" src="Projet-Final/client/public/images/${json.projet.thumbnail}" class="rounded mx-auto d-block" height="600px" width="600px">


<div class="form-outline-inpt inpt">
<input class="form-control" type="file" accept="image/*" onchange="loadFile(event)">
</div>

 <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${json.projet.prive} />
   <label class="form-check-label" for="flexSwitchCheckChecked">Visibilite</label>
   </div>
</div>

<button type="submit" class="btn btn-primary btn-block mb-4 canBtn">Cancel</button>
<button type="button" class="btn btn-primary btn-block mb-4" onclick="modifierProjet(${json.projet.id})">Sauvegarder</button>
</form>`;
  $("#contenu").html(contenu);
}

function ajouterProjetAffichage(json) {
  var contenu = `<form id='ajouterProjetForm' class="editProj">

    
    <!-- Text input -->
   <div class="form-outline mb-69">
     <label class="form-label ftxt" for="titreProjet">Titre:</label>
     <input type="text" name="titreProjet" class="form-control" placeholder="Titre">
     
   </div>
 

   <!-- Message input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="descriptionProjet">Description:</label>
     <textarea class="form-control ftxt" name="descriptionProjet" rows="4" placeholder="Description"></textarea>
     
   </div>
 
   <!-- Message input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="participantsProjet">Participants:</label>
      <!-- PARTICIPANTS TAGS -->
     <div class="participant-container">
        <input id="participantsInput" type="text" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" />
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

        <input id="monInputTag" type="text" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" />
      </div>
      <p class="noteEnter">Note: Utiliser "enter" pour ajouter un tag.</p>
    
     <div id='tagsReponse' class="suggestionsDivision"></div>
   </div>
   <div class="col-md-5 order-md-1 customize">
 
   <img id="outputThumbnail" src="Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png" class="rounded mx-auto d-block" height="600px" width="600px">
   
 
   <div class="form-outline-inpt inpt">
   <input class="form-control" type="file" accept="image/*" onchange="loadFileThumbnail(event)" name='imageVignette' id="imagView">
   </div>
 
 </div>
   <!-- Submit button -->
   <button type="reset" onclick="resetForm();" class="btn btn-primary btn-block mb-4 canBtn">Réinitialiser les champs</button>
   <button type="button" onclick="loadMembre('pageMembre', ${json.idMembre})" class="btn btn-primary btn-block mb-4 canBtn">Annuler</button>
   <button type="button" onclick="ajouterProjetRequete(${json.idMembre})" class="btn btn-primary btn-block mb-4">Ajouter</button>

 </form>`;

  $("#contenu").html(contenu);

  json.tabTags.forEach((element) => {
    tagsArray.push(element.nomTag);
  });

  //Système de tags
  setTagsBase(new Array());

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

  setParticipantsBase(new Array());

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

function ajouterProjetReussi(idMembre) {
  loadMembre("pageMembre", idMembre);
  afficherSnackbar("Projet ajouté avec succès!");
}

function afficherPageAutreProjet(json) {
  let thumbnail;
  if (json.projet.thumbnail == "") {
    thumbnail = "defaultThumbnail.png";
  } else {
    thumbnail = json.projet.thumbnail;
  }
  var contenu = `<div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/${thumbnail}' class='img-fluid, img-thumbnail'"
            alt="Vignette">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Télécharger</button>
            <button class="btn btn-primary" type="button">Signaler</button>
        </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="javascript:loadAutreMembre(${json.projet.idCreator})" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.nomComplet}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">`;

  //List participants
  json.tabParticipants.forEach((membreProjet) => {
    contenu += ` <li class="list-inline-item"><a href="javascript:;" onclick="loadAutreMembre(${membreProjet.idMembre})">${membreProjet.prenom} ${membreProjet.nom}</a></li>`;
  });
  contenu += ` <li class="list-inline-item">${json.projet.autreParticipant}</li> </ul>`;

  //List tags
  contenu += `<ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline"
  aria-label="Tags: ">`;

  json.tabTags.forEach((tagProjet) => {
    contenu += ` <li class="list-inline-item">${tagProjet.nomTag},</li>`;
  });
  contenu += `</ul>`;

  //Description
  contenu += `  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> `;

  // array.forEach(tags => {
  //     //mettre les tags
  // });
  contenu += `Lien: <a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
        <div class="form-check form-switch">
        </div>
    </div>
</div>`;
  $("#contenu").html(contenu);
}
