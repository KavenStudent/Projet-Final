var membresVue = function (reponse) {
    var action = reponse.action;

    switch (action) {
        case "pageAccueil":
            afficherPageIndex();
            break;
        case "pageMembre":
            afficherPageMembre(reponse);
            break;
        case "pageMembreEdit":
            afficherPageMembreEdit(reponse)
            break;
    }

    function afficherPageIndex() {
        let contenu = ` <div class="container marketing customized-front-page-container">
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
    <div id='type-abonnement'>
            <div id='abonnement-free' class='case-abonnement'>
                <p class="titreAbonnementCase">GRATUIT</p>
                <ul>
                    <li>Vous avez un profil</li>
                    <li>Les informations de contacts incluses</li>
                    <li>Un portfolio "LIMITÉ"</li>
                </ul>
                <button id='sign-button'>Sign Up</button>
            </div>
            <div id='abonnement-premium' class='case-abonnement'>
                <p class="titreAbonnementCase">ABONNEMENT</p>
                <ul>
                    <li>Vous avez un profil</li>
                    <li>Les informations de contacts incluses</li>
                    <li>Un portfolio "ILLIMITÉ"</li>
                </ul>
                <button id='upgrade-button'>Upgrade</button>
            </div>
        </div>

    <!-- /END THE FEATURETTES -->
  </div>`

        $('#contenu').html(contenu);
    }

    function afficherPageMembre(json) {

    }

    function afficherPageMembreEdit(json) {

        let contenu = `<div class="container" id='containerEdit'>
        <form id='membreForme' name="membre-edit">
    
            <input type='hidden' name='idMembre' value="<?php $_SESSION['membre'] ?>">
            <input type="hidden" name="action" value="modifierMembre">
            <!-- <input type="submit" id="validation-form-membre-edit" class="validation" /> -->
    
            <!-- 2 column grid layout with text inputs for the first and last names -->
            <div class="row mb-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="prenomEdit">Prénom</label>
                        <input type="text" name="prenomEdit" class="form-control modalInput value=${json.membre.prenom}" />
                    </div>
                </div>
    
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="nomEdit">Nom</label>
                        <input type="text" name="nomEdit" class="form-control modalInput value=${json.membre.nom}" />
                    </div>
                </div>
            </div>
    
            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="courrielEdit">Courriel</label>
                <input type="email" name="courrielEdit" class="form-control modalInput value=${json.membre.courriel}" />
            </div>
    
            <!-- Cell input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="numeroTelephoneEdit">Téléphone</label>
                <input type="number" name="numeroTelephoneEdit" class="form-control modalInput value=${json.membre.numeroTelephone}" />
            </div>
    
            <!-- Description input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="descriptionEdit">Description</label>
                <textarea class="form-control modalInput" name="descriptionEdit" rows="4" value=${json.membre.description}></textarea>
            </div>
    
            <div class="form-outline mb-4">
                <label for="validationCustom03" class="form-label">Mot de passe</label>
                <input type="password" class="form-control modalInput" id="passwordEdit" name="passwordEdit value=${json.membre.motDePasse}" required>
                <span id="msg-password-erreur-edit">Le mot de passe doit contenir au moins 8 charactères </span>
            </div>
            <div class="form-outline mb-4">
                <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control modalInput" id="confirmPasswordEdit" value=${json.membre.motDePasse} required>
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
            contenu += `<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />`;
        }
        else {
            contenu += `<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>`
        }

        contenu += `<label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
                    </div>
                </div>
            </div>
            <!-- Submit button -->
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
            </div>
    
        </form>
    
    </div>
    
    `;
        $('#contenu').html(contenu);
    }
}