
var projetVue=function(response) {
    var action=response.action;
    switch(action){
        case "pageProjet" : 
        afficherPageProjet(response);
        break;
        case "pageProjetEdit" : 
        afficherPageProjetEdit(response);
        break;
        case "pageProjetAjouter" :
        ajouterProjetAffichage(response);
        break;
        case "AjouterProjetReussi" : 
        ajouterProjetReussi(response.idMembre);
        break;
        
    }
}

function afficherPageProjet(json) {
  var contenu = `<div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png' class='img-fluid, img-thumbnail'"
            alt="...">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Télécharger</button>
        </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">Createur: </span><a href="mon profil.page" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.nomComplet}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">
            <li class="list-inline-item">${json.projet.autreParticipant}</li>
        </ul>`
  // array.forEach(membreProjet => {
  //     //mettre participants clickable + autres participants
  // });
  contenu += `  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> 

       <ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline" aria-label="Autres participants: ">
            <li class="list-inline-item"><a href="participant.page">${json.projet.idTag}</a></li>
            <li class="list-inline-item"><a href="participant.page">Portfolio</a></li>
            <li class="list-inline-item"><a href="participant.page">Recherche d'emploi</a></li>
        </ul>`
  // array.forEach(tags => {
  //     //mettre les tags
  // });
  contenu += `<a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
        <div class="form-check form-switch">
        </div>
    </div>
</div>`;
  $('#contenu').html(contenu);
}


function afficherPageProjetEdit(json) {
  var contenu = `<form  class="editProj">


<div class="form-outline mb-69">
 <label class="form-label ftxt" for="form6Example3">Titre:</label>
 <input type="text" id="form6Example3" class="form-control" placeholder="Example" value="${json.projet.titre}"/>
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Description:</label>
 <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Description...">${json.projet.description}</textarea>
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Participants:</label>
 <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Patricipants...">${json.projet.autreParticipant}</textarea>
</div>


<div class="form-outline mb-69">
 <label class="form-label" for="form6Example5">Lien:</label>
 <input type="url" id="form6Example5" class="form-control" placeholder="Lien..." value="${json.projet.lienExterne}"/>
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
<button type="submit" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
</form>`;
  $('#contenu').html(contenu);
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
     <textarea class="form-control ftxt" name="participantsProjet" rows="4" placeholder="Patricipants"></textarea>
     
   </div>
 
   <!-- Email input -->
   <div class="form-outline mb-69">
     <label class="form-label" for="lienProjet">Lien:</label>
     <input type="url" name="lienProjet" class="form-control" placeholder="Lien">
     
   </div>
 <!-- Message input -->
    <div class="form-outline mb-69">
      <label class="form-label" for="tagProjet">tags:</label>

      <!-- TAGS ICI -->
      <div class="tag-container">

        <input id="monInputTag" type="text" onkeypress="return /[0-9a-zA-Z]/i.test(event.key)" />
      </div>
    
     <div id='tagsReponse' class="suggestionsDivision"></div>
   </div>
   <div class="col-md-5 order-md-1 customize">
 
   <img id="output" src="Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png" class="rounded mx-auto d-block" height="600px" width="600px">
   
 
   <div class="form-outline-inpt inpt">
   <input class="form-control" type="file" accept="image/*" onchange="loadFile(event)" name='imageVignette' id="imagView">
   </div>
 
 </div>
   <!-- Submit button -->
   <button type="reset" onclick="resetForm();" class="btn btn-primary btn-block mb-4 canBtn">Réinitialiser les champs</button>
   <button type="button" onclick="loadMembre('pageMembre', ${json.idMembre})" class="btn btn-primary btn-block mb-4 canBtn">Annuler</button>
   <button type="button" onclick="ajouterProjetRequete(${json.idMembre})" class="btn btn-primary btn-block mb-4">Ajouter</button>

 </form>`;
 
  json.tabTags.forEach(element => {
    tagsArray.push(element.nomTag);
  });

  $('#contenu').html(contenu);

  

  //Système de tags : VIM
  setTagsBase(new Array());

  const tagContainer = document.querySelector('.tag-container');
  let monInputTag = document.getElementById('monInputTag');

  //Ajoute la fonction de add des tags quand je press enter.
  monInputTag.addEventListener('keyup', function(e){
    if(e.key === 'Enter' && (monInputTag.value != "")){
      addTag(monInputTag.value);
    }

    displayTagMatches2();
  })




  

}

function ajouterProjetReussi(idMembre){

  loadMembre('pageMembre', idMembre);
  afficherSnackbar("Projet ajouté avec succès!");
}





