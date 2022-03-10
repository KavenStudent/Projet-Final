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
    case "ajouterSignalisation":
      console.log("Entre dans la vue");
      ajouterSignalisationVue();
      break;
  }
};

function afficherPageAccueil(json) {
  let contenu = ` <div id="contenuRecherche"></div>

    <!-- partie paiment -->
		<!-- canvas panier paypal-->
		<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
			<div class="offcanvas-header">
				<h3 id="offcanvasRightLabel">Contenu de votre panier</h3>
				<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>

			<div class="offcanvas-body">

                <div id="panier">
                <p>Abonnement 1 mois : 4,99$</p>
                </div>

                <div id="total">
                <p>Total : 4,99$</p>
                </div>

				<div id="paypal-button-container">

				</div>
			</div>
		</div>

    <div class="container marketing customized-front-page-container">
    <!-- Three columns of text below the carousel -->
    <div class="row d-flex customized-row">
      <div class="col-lg-4 customized-item">
      <img class="imageFrontPage logoEyes" src="Projet-Final/client/public/images/eyes_logo.png" class="img-thumbnail" alt="...">
        <h2>Vision</h2>
        <p>Nous rêvions d'un réseau social permettant de facilement visualiser le portfolio de nos membres. Plus besoin de passer des heures à créer un site web. Vous pouvez maintenant faire un portfolio en quelques cliques!</p>
      </div><!-- /.col-lg-4 -->

      <div class="col-lg-4 customized-item">
      <img class="imageFrontPage logo" src="Projet-Final/client/public/images/about.png" class="img-thumbnail" alt="...">
        <h2>À propros de nous</h2>
        <p>Notre équipe est formé de cinq étudiants en informatique au Collège Ahuntsic. Ce projet était originalement notre projet de fin d'études.</p>
      </div><!-- /.col-lg-4 -->

      <div class="col-lg-4 customized-item">
      <img class="imageFrontPage logo" src="Projet-Final/client/public/images/cible.png" class="img-thumbnail" alt="...">
        <h2>Mission</h2>
        <p>Nous cherchons à centraliser le processus création et de visualisation d'un portfolio. Créer un seul endroit ou employeurs et employés peuvent facilement gérer l'image de leurs compétences.<!--Ils seront capable de montrer à des employeurs les compétences qui ont développées tout au long de leur vie --></p>
      </div><!-- /.col-lg-4 -->

    </div><!-- /.row -->


    <!-- START THE FEATURETTES -->

    <hr class="featurette-divider  customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Comment fonctionne la recherche?</h2>
        <p class="lead">Faites une recherche par nom d'un membre, titre de projet ou tag. Les résultats seront affichés en haut de la page et le contenu de la page pourra être trouvé en dessous. Les résultats sont séparés en deux parties : à gauche, les membres et à droite, les projets. Cliquez sur l'un ou l'autre pour être rediriger vers la page correspondante.</p>
      </div>
      <div class="col-md-5">
        <img class="imageFrontPage" src="Projet-Final/client/public/images/Capture.png" class="img-thumbnail" alt="...">
      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Comment avoir accès au portfolio?</h2>
        <p class="lead">Commencez par vous connecter (ou vous créer un compte). Une fois sur votre page de membre, cliquez sur le bouton "Nouveau projet" et renseignez tous les champs. Il peut être bénéfique de détailler sur quelles parties du projet vous avez travaillés si vous n'étiez pas le seul contributeur. Une fois le projet créé, la liste de projets de votre portfolio sera affiché sur votre page de profil.</p>
      </div>
      <div class="col-md-5 order-md-1">
      <img class="imageFrontPage" src="Projet-Final/client/public/images/CapturePorfolio.PNG" class="img-thumbnail" alt="...">
      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">

    <div class="row featurette">
      <div class="col-md-7">
         <h2 class="featurette-heading">Version mobile<!-- <span class="text-muted">Checkmate.</span>--></h2> 
        <p class="lead">Notre site peut être navigué sur mobile! Le site est dynamique et facile à utiliser. Vous pouvez naviguer confortablement avec des appareils de n'importe quel format.</p>
      </div>
      <div class="col-md-5">
      <img class="imageFrontPage" src="Projet-Final/client/public/images/phone.png" class="img-thumbnail" alt="...">

      </div>
    </div>

    <hr class="featurette-divider customized-colorHR">
    <div id='type-abonnement'>`;

  if (json.id == null) {
    contenu += ` <div id='abonnement-free' class='case-abonnement'>
            <p class="titreAbonnementCase">GRATUIT</p>
            <ul>
              <li>Informations de profil complètes</li>
              <li>Fichiers de projet de taille limité à 8MB</li>
              <li>Portfolio limité à 3 projets</li>
            </ul>
            <button id='sign-button' data-bs-toggle="modal" data-bs-target="#modalInscription">Sign Up</button>
        </div>
        <div id='abonnement-premium' class='case-abonnement'>
            <p class="titreAbonnementCase">ABONNEMENT</p>
            <ul>
              <li>Informations de profil complètes</li>
              <li>Fichiers de projet de taille illimité</li>
              <li>Portfolio de taille illimité</li>
            </ul>
            <button id='upgrade-button' data-bs-toggle="modal" data-bs-target="#modalConnexion">Upgrade</button>
        </div>`;
  } else if (Number.isInteger(json.id) && json.isSub == false) {
    contenu += ` 
        <div id='abonnement-premium' class='case-abonnement'>
            <p class="titreAbonnementCase">ABONNEMENT</p>
            <ul>
              <li>Informations de profil complètes</li>
              <li>Fichiers de projet de taille illimité</li>
              <li>Portfolio de taille illimité</li>
            </ul>
            <button id='upgrade-button' onclick='afficheSlidePayment()'>Upgrade</button>
        </div>`;
  }

  contenu += ` </div>
    <!-- /END THE FEATURETTES -->
    </div>`;

  $("#contenu").html(contenu);
}

function afficherPageMembre(json, listProjet) {
  let contenu = ` <!-- partie paiment -->
    <!-- canvas panier paypal-->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h3 id="offcanvasRightLabel">Contenu de votre panier</h3>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body">

            <div id="panier">
            <p>Abonnement 1 mois : 4,99$</p>
            </div>

            <div id="total">
            <p>Total : 4,99$</p>
            </div>

            <div id="paypal-button-container">

            </div>
        </div>
    </div>
    
    
    <div id="contenuRecherche"></div><div class="container big-container">
            <div class="premiere-colonne">
                <img id='image-profil' src="Projet-Final/serveur/membre/images-profil/${json.membre.imageProfil}" alt="Image du profil" class="img-thumbnail" alt="...">
                <div class="container informations-profil">

                    <label><strong>Numéro identifiant:</strong> <span>${json.membre.id}</span></label>

                    <label><strong>Nom:</strong> <span>${json.membre.prenom} ${json.membre.nom}</span></label>
                    
                    <label><strong>Courriel:</strong> <span>${json.membre.courriel}</span></label>
                    
                    <label><strong>Téléphone:</strong> <span>${json.membre.numeroTelephone}</span></label>
                    
                    <label><strong>Description:</strong><span ><div id='description-profil'>${json.membre.description}</div></span></label>
                    
                    <label><strong>Statut :</strong> <span>`;

  if (json.membre.membrePremium == 0) {
    contenu += `non-abonné </span></label> 
        <button id="upgrade-button" class="upgrade-button-membre" onclick="afficheSlidePayment(${json.membre.courriel});">Upgrade</button>`;
  } else if (json.membre.membrePremium == 1) {
    contenu += `Abonné </span></label>
        <label><strong>Date fin d'abonnement :</strong> <span>${json.membre.dateFinAbonnement}</span></label>`;
  }

  contenu += ` <!-- Content here -->
                </div>
                <button type="button" onclick='loadMembre( "pageMembreEdit" ,${json.membre.id},"");' class="btn btn-primary">Editer</button>
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
                            <img src="${myThumbnail}" class="card-img-top thumbnail-in-Card" alt="Fissure in Sandstone"/>
                            <div class="card-body card-item-body">
                                    <h5 class="card-title card-title-item">${item.titre}</h5>
                                    <p class="card-text card-text-item">${item.description}</p>
                        
                                </div>
                            </div>`;
    });
  }

  contenu += `
                </div>
            </div>
        </div>`;

  $("#contenu").html(contenu);
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
                <div class="passwordDivModification">
                    <input type="password" class="form-control modalInput passwordCustomModification" id="passwordEdit" name="passwordEdit" value="${json.membre.motDePasse}" required>
                    <i class="bi bi-eye-slash" id="togglePasswordModification"></i>
                </div>
                <span id="msg-password-erreur-edit">Le mot de passe doit contenir au moins 8 charactères </span>
            </div>
            <div class="form-outline mb-4">
                <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
                <div class="passwordDivModificationConfirm">
                    <input type="password" class="form-control modalInput passwordCustomModificationConfirm" id="confirmPasswordEdit" value="${json.membre.motDePasse}" required>
                    <i class="bi bi-eye-slash" id="togglePasswordModificationConfirmation"></i>
                </div>
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
    contenu += `<input class="form-check-input" type="hidden"  name='profilPublic' value='0'/>`;
    contenu += `<input class="form-check-input" type="checkbox"  name='profilPublic' value='1' />`;
  } else {
    contenu += `<input class="form-check-input" type="hidden"  name='profilPublic' value='0' />`;
    contenu += `<input class="form-check-input" type="checkbox"  name='profilPublic' value='1' checked />`;
  }

  contenu += `<label class="form-check-label" for="flexSwitchCheckChecked">Privé</label>
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
  $("#contenu").html(contenu);
  setEyesDansFormEdit();
}

function afficherPageAutreMembre(json, listProjet) {
  let contenu = `

    
     <div class="modal fade" id="modalSignaler" tabindex="-1">
    
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <h5 class="modal-title"><strong>Signalisation</strong></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> 
                     
    
                    <form class="form-connexion connexionContainer" id="form-signaler">
    
                        <input type="hidden" name="idMembre" value="${json.membre.id}">
    
                        <div class="myInput">
                            <label for="pages" class="form-label">Raison</label>
                            <textarea id="raison-input" name="description" rows="4" cols="50" required></textarea>
                        </div> 
    
                        <div id='list-projet'>`;

  // list projet
  listProjet.forEach((projet) => {
    contenu += `
                            <div class="col-sm">
                                <input class="form-check-input" type="radio" name="projetRadio" value="${projet.id}" id="projetRadio">
                                <label class="form-check-label" name="titre" for="projetRadio">${projet.titre}</label>
                            </div>`;
  });

  contenu += `
                             </div>
                                <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onclick="ajouterSignalerRequete()">Signaler</button>
                        </div>
                    </form>
    
                    
                </div>
    
            </div>
        </div>
    </div> 
  </div> 
    
    
    <div id="contenuRecherche"></div><div class="container big-container">
            <div class="premiere-colonne">
                <img id='image-profil' src="Projet-Final/serveur/membre/images-profil/${json.membre.imageProfil}" alt="Image du profil" class="img-thumbnail" alt="...">
                <div class="container informations-profil">

                    <label><strong>Numéro identifiant:</strong> <span>${json.membre.id}</span></label>

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

  if (document.getElementById("typePage").value === "admin") {
    if (json.membre.prive == 1) {
      contenu += `</div>
            <button class="btn btn-danger" type="button" onclick="adminCacherMembre(${json.membre.id}, 0)">Rendre visible le membre</button>
                    </div>
        
                    <div class="container deuxieme-colonne">  `;
    } else {
      contenu += `</div>
            <button class="btn btn-danger" type="button" onclick="adminCacherMembre(${json.membre.id}, 1)">Cacher le membre</button>
                    </div>
        
                    <div class="container deuxieme-colonne">  `;
    }
  } else {
    contenu += `</div>
        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalSignaler">Signaler</button>
                </div>
    
                <div class="container deuxieme-colonne">`;
  }

  contenu += ` <div class='div-projets'>`;
  // src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
  if (listProjet != null) {
    listProjet.forEach(function (item) {
      if (item.prive != 1) {
        let myThumbnail;
        if (item.thumbnail == "") {
          myThumbnail = `https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp`;
        } else {
          myThumbnail = `Projet-Final/serveur/projet/thumbnail/${item.thumbnail}`;
        }
        contenu += ` <!-- CARD -->
                                <div class="card card-item" onclick="loadPageAutreProjet(${item.id});">
                                <img src="${myThumbnail}" class="card-img-top thumbnail-in-Card" alt="Fissure in Sandstone"/>
                                <div class="card-body card-item-body">
                                        <h5 class="card-title card-title-item">${item.titre}</h5>
                                        <p class="card-text card-text-item">${item.description}</p>
                                    </div>
                                </div>`;
      }
    });
  }

  contenu += `
                </div>
            </div>
        </div>`;

  $("#contenu").html(contenu);
}

function afficherPageAdmin(json) {
  let contenu = `<div id="contenuRecherche"></div><div id="adminContainer" class="container">
    <div class="separator"><h4> Profils non suspendus</h4>  
    <div class="report">  
      `;

  for (let i = 0; i < json.listeSignalisation.length; i++) {
    if (json.listeSignalisation[i].adminLock == 0) {
      contenu += ` <div class="card myReportCard">
            <div class="card-body">
            <div id="card-contenu">
                <img id='image-profil-report' src="Projet-Final/serveur/membre/images-profil/${json.listeSignalisation[i].imageProfil}" class="img-thumbnail" alt="profilImage" 
                onclick="loadAutreMembre(${json.listeSignalisation[i].idMembre})">
                <h5 onclick="loadAutreMembre(${json.listeSignalisation[i].idMembre})">${json.listeSignalisation[i].prenom} ${json.listeSignalisation[i].nom} #${json.listeSignalisation[i].idMembre}</h5>
                <h5 onclick="afficherRaison(${json.listeSignalisation[i].idMembre})">${json.listeSignalisation[i].nb} signalisations</h5>
            </div>

        </div>
        </div>`;
    }
  }
  contenu += `</div></div> 
    <div class="separator"><h4> Profils suspendus</h4>  
    <div class="report">`;

  for (let i = 0; i < json.listeSignalisation.length; i++) {
    if (json.listeSignalisation[i].adminLock == 1) {
      contenu += `<div class="card myReportCard">
            <div class="card-body">
            <div id="card-contenu">
                <img id='image-profil-report' src="Projet-Final/serveur/membre/images-profil/${json.listeSignalisation[i].imageProfil}" class="img-thumbnail" alt="profilImage" 
                onclick="loadAutreMembre(${json.listeSignalisation[i].idMembre})">
                <h5 onclick="loadAutreMembre(${json.listeSignalisation[i].idMembre})">${json.listeSignalisation[i].prenom} ${json.listeSignalisation[i].nom} #${json.listeSignalisation[i].idMembre}</h5>
                <h5 onclick="afficherRaison(${json.listeSignalisation[i].idMembre})">${json.listeSignalisation[i].nb} signalisations</h5>
            </div>

        </div>
        </div>`;
    }
  }
  contenu += `</div> </div> </div>`;

  $("#contenu").html(contenu);
}

function afficherRecherche() {
  let contenu = `<div id='containerRecherche' class="container">
    
    <div class="list container" id='listMembre'>
        <p class="titreMembres">Membres</p>
        <div class="headerListMembre">
            <p>Avatar</p>
            <p>Nom Complet</p>
            <p>#Id</p>
        </div><div id='contenuCardsMembre'></div>`;

  contenu += `</div>`;

  contenu += `<div class="list container" id='listProjet'>
        <p class="titreProjets">Projets</p>
        <div class="headerListProjet">
                <p>Titre</p>
                <p>Nom Createur</p>
                <p>Nb Téléchargement</p>
        </div><div id='contenuCardsProjet'></div>`;
  contenu += ` </div></div>`;

  $("#contenuRecherche").html(contenu);
  loadData();
}

function ajouterSignalisationVue() {
  $("#modalSignaler").modal("hide");
  $("#form-signaler")[0].reset();
  afficherSnackbar("Signalement ajouté avec succès");
}
