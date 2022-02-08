function ajouterProjetAffichage(json) {
   var rep = `<div id='projetMainDiv' class="container"> <div id="projetLeftDiv" class="container"> 
 <img src='Projet-Final/serveur/projet/thumbnail/defaultThumbnail.png' class='img-fluid, img-thumbnail'"
            alt="...">
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Télécharger</button>
        </div>
    </div>
    <div id='projetRightDiv' class="container">
        <h1>${json.projet.titre}</h1>

        <h5><span id="projetCreateurTitle">'Createur:' </span><a href="mon profil.page" id="projetCreateurContent"
                name="projetCreateurContent">${json.projet.idCreator}</a></h5>

        <ul id="projetParticipantDiv" name="projetParticipantDiv" class="list-inline"
            aria-label="Autres participants: ">
            <li class="list-inline-item">${json.projet.autreParticipant}</li>
        </ul>`
        array.forEach(membreProjet => {
            //mettre participants clickable + autres participants
        });
       rep+=`  <p id="projetDescription" name="projetDescription">${json.projet.description}</p> 

       <ul id="projetTagsDiv" name="projetTagsDiv" class="list-inline" aria-label="Autres participants: ">
            <li class="list-inline-item"><a href="participant.page">Web</a></li>
            <li class="list-inline-item"><a href="participant.page">Portfolio</a></li>
            <li class="list-inline-item"><a href="participant.page">Recherche d'emploi</a></li>
        </ul>`
        array.forEach(tags => {
            //mettre les tags
        });
       rep+= `<a href=${json.projet.lienExterne}>
            <p class="lead">${json.projet.lienExterne}</p>
        </a>
        <div class="form-check form-switch">
        </div>
    </div>
</div>`;
}


function modifierProjetAffichage(response) {
var rep =  `<form class="editProj">


<div class="form-outline mb-69">
 <label class="form-label ftxt" for="form6Example3">Titre:</label>
 <input type="text" id="form6Example3" class="form-control" placeholder="Example" />
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Description:</label>
 <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Description..."></textarea>
</div>

<div class="form-outline mb-69">
 <label class="form-label" for="form6Example7">Participants:</label>
 <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Patricipants..."></textarea>
</div>


<div class="form-outline mb-69">
 <label class="form-label" for="form6Example5">Lien:</label>
 <input type="url" id="form6Example5" class="form-control" placeholder="Lien..." />
</div>

<div class="col-md-5 order-md-1 customize">
<img id="output" src="Projet-Final/client/public/images/default-image.png" class="rounded mx-auto d-block" height="600px" width="600px">


<div class="form-outline-inpt inpt">
<input class="form-control" type="file" accept="image/*" onchange="loadFile(event)">
</div>

 <div class="form-check form-switch">
   <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
   <label class="form-check-label" for="flexSwitchCheckChecked">Visibilite</label>
   </div>
</div>

<button type="submit" class="btn btn-primary btn-block mb-4 canBtn">Cancel</button>
<button type="submit" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
</form>`;
}



var projetVue=function(response) {
    var action=response.action;
    switch(action){
        case "ajouterProjet" : 
        ajouterProjetAffichage(response);
        break;
        case "modifierProjet" : 
        modifierProjetAffichage(response);
        break;
    }
}
var membreVue=function(reponse){
    var action=reponse.action;
    switch(action){
        case "deleteMembreVue" : deleteMembreVue(reponse.deleted); break;
        case "modifierMembreVue" : modifierMembreVue(reponse.membre, reponse.modifierMembreStatus); break;
        case "afficherMembreVue" : afficherMembreInfo(reponse.membre); break;
        case "afficherTransactionsVue" : afficherTransactionsVue(reponse.listPaiement); break;
        case "connexionAffichage" : connexionAffichage(reponse.message, reponse.pseudo, reponse.idM); break;
        case "affichageMembreConnecterVue" :affichageMembreConnecterVue(reponse.pseudo, reponse.message, reponse.idM);break;
        case "deconnexionVue" : deconnexionVue(); break;
    }
}