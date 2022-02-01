
  <!-- Modal Inscription-->
  <div class="modal fade" id="modalInscription" tabindex="-1" aria-labelledby="titreModalInscription" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="titreModalInscription">Inscription</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <!-- Formulaire devenir membre -->
              <!-- <form class="row needs-validation" action="serveur/membres/enregistrerMembre.php" method="POST"> -->

              <div class="col-md-6">
                <label for="validationCustom02" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" required>
              </div>
              <div class="col-md-6">
                <label for="validationCustom01" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" name="prenom" required>
              </div>
              <div class="col-md-6">
                <label for="validationCustomUsername" class="form-label">Courriel</label>
                <input type="email" class="form-control" id="courriel" name="courriel" required>
              </div>
              <div class="col-md-6">
                <label for="validationCustomUsername" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" name="telephone" required>
              </div>
              <div class="col-md-6">
                <label for="validationCustomUsername" class="form-label">Description</label>
                <textarea id="description" name="description" rows="4" cols="50" required></textarea>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>
              <div class="col-md-6">
                <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="cpassword" required>
              </div>
              <br>
              <div class="col-md-6">
                <button type="button" class="collapsible">Termes et conditions</button>
                <div class="contentConditions">
                  <p>Inserer termes et conditions</p>
                </div>
              </div>
      
              <div class="col-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">
                      Accepter les termes et conditions.
                    </label>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-primary">Sauvegarder</button>
              </div>
          </div>      
      </div>
    </div>
  </div>
