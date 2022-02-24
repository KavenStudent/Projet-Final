var membresVue = function (reponse) {
    var action = reponse.action;

    switch (action) {
        case "pageAccueil":
            afficherPageAccueil(reponse);
            break;
        case "pageMembre":
            afficherPageMembre(reponse, reponse.listProjet);
            break;
        case "pageMembreEdit":
            afficherPageMembreEdit(reponse);
            break;
        case "pageAdmin":
            afficherPageAdmin(reponse);
            break;
        case "autreMembre":
            afficherPageAutreMembre(reponse, reponse.listProjet);
            break;
        case "loadRecherche":
            afficherRecherche();
            break;
    }
}

function afficherPageAccueil(json) {
    let contenu = ` <div id="contenuRecherche"></div> <div class="container marketing customized-front-page-container">
    <!-- Three columns of text below the carousel -->
    <div class="row d-flex customized-row">
      <div class="col-lg-4 customized-item">
        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
        <h2>But</h2>
        <p>Nous voulions faire un site web social qui démontre les projets réalisés par chaque membre de notre site.</p>
        <p class="details"><a class="btn btn-primary" href="#">détails »</a></p>
      </div><!-- /.col-lg-4 -->

      <div class="col-lg-4 customized-item">
        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
        <h2>À propros de nous</h2>
        <p>Nous sommes une petite équipe de 5 étudiants au collège Ahuntsic.</p>
        <p class="details"><a class="btn btn-primary" href="#">détails »</a></p>
      </div><!-- /.col-lg-4 -->

      <div class="col-lg-4 customized-item">
        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
        <h2>Mission</h2>
        <p>Aider tous les jeunes programmeurs, désigners et développeur d'application. <!--Ils seront capable de montrer à des employeurs les compétences qui ont développées tout au long de leur vie --></p>
        <p class="details"><a class="btn btn-primary" href="#">détails  »</a></p>
      </div><!-- /.col-lg-4 -->

    </div><!-- /.row -->


    <!-- START THE FEATURETTES -->

    <hr class="featurette-divider  customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Comment fonctionne la recherche?</h2>
        <p class="lead">Tapez le nom de la personne ou bien vous pouvez aussi rechercher par tag.</p>
      </div>
      <div class="col-md-5">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Comment avoir accès au portfolio?</h2>
        <p class="lead">Cliquer sur le profil de la personne et vous allez avoir accès à ses informations de profil incluant son portfolio et tous ses projets.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7">
         <h2 class="featurette-heading">Version mobile<!-- <span class="text-muted">Checkmate.</span>--></h2> 
        <p class="lead">Ce site est dynamique entre autre vous pouvez le consulté avec votre appareil mobile!</p>
      </div>
      <div class="col-md-5">
        <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">
    <div id='type-abonnement'>`;

    if (json.id == null) {
        contenu += ` <div id='abonnement-free' class='case-abonnement'>
            <p class="titreAbonnementCase">GRATUIT</p>
            <ul>
                <li>Vous avez un profil</li>
                <li>Les informations de contacts incluses</li>
                <li>Un portfolio "LIMITÉ"</li>
            </ul>
            <button id='sign-button' data-bs-toggle="modal" data-bs-target="#modalInscription">Sign Up</button>
        </div>
        <div id='abonnement-premium' class='case-abonnement'>
            <p class="titreAbonnementCase">ABONNEMENT</p>
            <ul>
                <li>Vous avez un profil</li>
                <li>Les informations de contacts incluses</li>
                <li>Un portfolio "ILLIMITÉ"</li>
            </ul>
            <button id='upgrade-button'>Upgrade</button>
        </div>`;

    } else if (Number.isInteger(json.id) && json.isSub == false) {
        contenu += ` 
        <div id='abonnement-premium' class='case-abonnement'>
            <p class="titreAbonnementCase">ABONNEMENT</p>
            <ul>
                <li>Vous avez un profil</li>
                <li>Les informations de contacts incluses</li>
                <li>Un portfolio "ILLIMITÉ"</li>
            </ul>
            <button id='upgrade-button'>Upgrade</button>
        </div>`;
    }

    contenu += ` </div>
    <!-- /END THE FEATURETTES -->
    </div>`;

    $('#contenu').html(contenu);
}

function afficherPageMembre(json, listProjet) {


    let contenu = `<div id="contenuRecherche"></div><div class="container big-container">
            <div class="premiere-colonne">
                <img id='image-profil' src="Projet-Final/serveur/membre/images-profil/${json.membre.imageProfil}" alt="Image du profil" class="img-thumbnail" alt="...">
                <div class="container informations-profil">
                    <label class=""><strong>Nom:</strong> <span>${json.membre.prenom} ${json.membre.nom}</span></label>
                    
                    <label><strong>Courriel:</strong> <span>${json.membre.courriel}</span></label>
                    
                    <label><strong>Téléphone:</strong> <span>${json.membre.numeroTelephone}</span></label>
                    
                    <label><strong>Description:</strong><span ><div id='description-profil'>${json.membre.description}</div></span></label>
                    
                    <label><strong>Statut :</strong> <span>`;

    if (json.membre.membrePremium == 0) {
        contenu += `non-abonné`;
    } else if (json.membre.membrePremium == 1) {
        contenu += `Abonné`;
    }


    contenu += `</span></label>  <label><strong>Date fin d'abonnement :</strong> <span>${json.membre.dateFinAbonnement}</span></label>
                <!-- Content here -->
                </div>
                <button type="button" onclick='loadMembre( "pageMembreEdit" ,${json.membre.id});' class="btn btn-primary">Editer</button>
            </div>

            <div class="container deuxieme-colonne">
                <div class="container item1-deuxieme-colonne">
                    <button type="button" onclick="loadPageAjouterProjet(${json.membre.id});" class="btn btn-primary">Nouveau projet</button>
                </div>
                
                <div class='div-projets'>`;
    // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
    if (listProjet != null) {
        listProjet.forEach(function (item) {
            let myThumbnail;
            if (item.thumbnail == "") {
                myThumbnail = `https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp`;
            } else {
                myThumbnail = `Projet-Final/serveur/projet/thumbnail/${item.thumbnail}`;
            }
            contenu += ` <!-- CARD -->
                            <div class="card card-item" onclick="loadPageProjet('pageProjet','${item.id}');">
                            <img src="${myThumbnail}" class="card-img-top" alt="Fissure in Sandstone"/>
                            <div class="card-body card-item-body">
                                    <h5 class="card-title">${item.titre}</h5>
                                    <p class="card-text">${item.description}</p>
                        
                                </div>
                            </div>`
        });
    }

    contenu += `
                </div>
            </div>
        </div>`;

    $('#contenu').html(contenu);
}

function afficherPageMembreEdit(json) {

    let contenu = `<div id="contenuRecherche"></div><div class="container" id='containerEdit'>
        <form id='membreEditForm' name="membre-edit">
    
            <input type='hidden' name='idMembre' value="${json.membre.id}">
            <input type="hidden" name="action" value="modifierMembre">
            <input type="submit" id="validation-form-membre-edit" class="validation" />
    
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="prenomEdit">Prénom</label>
                        <input type="text" name="prenomEdit" class="form-control modalInput" value="${json.membre.prenom}" required/>
                    </div>
                </div>
    
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="nomEdit">Nom</label>
                        <input type="text" name="nomEdit" class="form-control modalInput" value="${json.membre.nom}" required/>
                    </div>
                </div>
            </div>
    
            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="courrielEdit">Courriel</label>
                <input type="email" name="courrielEdit" class="form-control modalInput" value="${json.membre.courriel}" required/>
            </div>
    
            <!-- Cell input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="numeroTelephoneEdit">Téléphone</label>
                <input type="tel" class="form-control modalInput" id="numeroTelephoneEdit" name="numeroTelephoneEdit" value="${json.membre.numeroTelephone}" pattern="^\\d{10}|(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s-]\\d{3}[\\s-]\\d{4}$" required>
            </div>
    
            <!-- Description input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="descriptionEdit">Description</label>
                <textarea class="form-control modalInput" name="descriptionEdit" rows="4">${json.membre.description}</textarea>
            </div>
    
            <div class="form-outline mb-4">
                <label for="validationCustom03" class="form-label">Mot de passe</label>
                <input type="password" class="form-control modalInput" id="passwordEdit" name="passwordEdit" value="${json.membre.motDePasse}" required>
                <span id="msg-password-erreur-edit">Le mot de passe doit contenir au moins 8 charactères </span>
            </div>
            <div class="form-outline mb-4">
                <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control modalInput" id="confirmPasswordEdit" value="${json.membre.motDePasse}" required>
                <span id="msg-confirm-password-erreur-edit">Confirmation invalide</span>
            </div>
            <!-- 3 column grid layout with preview, upload and visibile -->
            <div class="row mb-4" id='divCentrer'>
    
                <div class="col-sm profilEdit">
                    <img id="output" class="img-fluid" src="Projet-Final/serveur/membre/images-profil/${json.membre.imageProfil}" alt="imageProfil" />
                </div>
    
                <div class="col-sm profilEdit">
                    <input class="form-control" type="file" accept="image/*" onchange="loadFile(event)" name='imageProfil'>
                </div>
    
                <div class="col-sm profilEdit">
                    <div class="form-check form-switch" id='switchBox'>`;

    if (json.membre.prive == 0) {
        contenu += `<input class="form-check-input" type="checkbox"  name='profilPublic' value='0' checked />`;
        contenu += `<input class="form-check-input" type="hidden"  name='profilPublic' value='1' />`;
    }
    else {
        contenu += `<input class="form-check-input" type="checkbox"  name='profilPublic' value='1'/>`;
        contenu += `<input class="form-check-input" type="hidden"  name='profilPublic' value='0' />`;
    }

    contenu += `<label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
                    </div>
                </div>
            </div>
            <!-- Submit button -->
            <div class="col-md-12 text-center">
                <button type="button" onclick="validerMembreEdit();" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
            </div>
    
        </form>
    
    </div>
    
    `;
    $('#contenu').html(contenu);
}

function afficherPageAutreMembre(json, listProjet) {


    let contenu = `<div id="contenuRecherche"></div><div class="container big-container">
            <div class="premiere-colonne">
                <img id='image-profil' src="Projet-Final/serveur/membre/images-profil/${json.membre.imageProfil}" alt="Image du profil" class="img-thumbnail" alt="...">
                <div class="container informations-profil">
                    <label class=""><strong>Nom:</strong> <span>${json.membre.prenom} ${json.membre.nom}</span></label>
                    
                    <label><strong>Courriel:</strong> <span>${json.membre.courriel}</span></label>
                    
                    <label><strong>Téléphone:</strong> <span>${json.membre.numeroTelephone}</span></label>
                    
                    <label><strong>Description:</strong><span ><div id='description-profil'>${json.membre.description}</div></span></label>
                    
                    <label><strong>Statut :</strong> <span>`;

    if (json.membre.membrePremium == 0) {
        contenu += `non-abonné`;
    } else if (json.membre.membrePremium == 1) {
        contenu += `Abonné`;
    }


    contenu += `</div>
    <button class="btn btn-primary" type="button">Signaler</button>
            </div>

            <div class="container deuxieme-colonne">`;

    // pour admin
    if (document.getElementById('typePage').value === "admin") {
        contenu += `  <div class="container item1-deuxieme-colonne">
                <div class="form-check form-switch item-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Visibilite</label>
                </div>
            </div>`;
    }

    contenu += ` <div class='div-projets'>`;
    // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
    if (listProjet != null) {
        listProjet.forEach(function (item) {
            let myThumbnail;
            if (item.thumbnail == "") {
                myThumbnail = `https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp`;
            } else {
                myThumbnail = `Projet-Final/serveur/projet/thumbnail/${item.thumbnail}`;
            }
            contenu += ` <!-- CARD -->
                            <div class="card card-item" onclick="loadPageAutreProjet(${item.id});">
                            <img src="${myThumbnail}" class="card-img-top" alt="Fissure in Sandstone"/>
                            <div class="card-body card-item-body">
                                    <h5 class="card-title">${item.titre}</h5>
                                    <p class="card-text">${item.description}</p>
                                </div>
                            </div>`
        });
    }

    contenu += `
                </div>
            </div>
        </div>`;

    $('#contenu').html(contenu);
}

function afficherPageAdmin(json) {

    let contenu = `<div id="contenuRecherche"></div><div id="adminContainer">
    <div id="report">
        <div class="card myReportCard">`;

    for (let i = 0; i < json.listeSignalisation.length; i++) {
        contenu += `<div class="card-body">
                <div id="card-contenu">
                    <img id='image-profil-report' src="Projet-Final/serveur/membre/images-profil/${json.listeSignalisation[i].imageProfil}" class="img-thumbnail" alt="profilImage">
                    <h5>${json.listeSignalisation[i].prenom} ${json.listeSignalisation[i].nom}</h5>
                    <h5 data-bs-toggle="modal" data-bs-target="#modalSignalisation">${json.listeSignalisation[i].nb} signalisations</h5>
                </div>

            </div>`;

    }


    contenu += `</div> </div> </div>`;

    $('#contenu').html(contenu);
}

function afficherRecherche(){
    
   


    let contenu = `<div id='containerRecherche' class="container">

    <div class="list container" id='listMembre'>
        <div class="headerListMembre">
            <p>Avatar</p>
            <p>Nom Complet</p>
            <p>#Id</p>
        </div><div id='contenuCardsMembre'></div>`;
    
   
     
    contenu +=`</div>`;


    contenu += `<div class="list container" id='listProjet'>
        <div class="headerListProjet">
                <p>Titre</p>
                <p>Nom Createur</p>
                <p>#nbTelecharment</p>
        </div><div id='contenuCardsProjet'></div>`;

   
        

   contenu += ` </div></div>`;




$('#contenuRecherche').html(contenu);
loadData();
}