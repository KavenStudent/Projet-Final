<!-- Modal Inscription-->
<div class="modal fade" id="modalInscription" tabindex="-1" aria-labelledby="titreModalInscription" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content modalCustom">
      <div class="modal-header modalHeader">
        <h5 class="modal-title" id="titreModalInscription"><strong>Inscription</strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modalCustom">

        <!-- Formulaire devenir membre -->
        <form id="form-enregistrer-membre">
          <input type="hidden" name="action" value="enregistrerMembre">
          <input type="submit" id="validation-form-membre" class="validation" />

          <div class="col-md-8 itemInput">
            <label for="validationCustom01" class="form-label">Prénom</label>
            <input type="text" class="form-control modalInput" id="prenom" name="prenom" required>
          </div>
          <div class="col-md-8 itemInput">
            <label for="validationCustom02" class="form-label">Nom</label>
            <input type="text" class="form-control modalInput" id="nom" name="nom" required>
          </div>

          <div class="col-md-8 itemInput">
            <label for="validationCustomUsername" class="form-label">Courriel</label>
            <input type="email" class="form-control modalInput" id="courriel" name="courriel" required>
          </div>
          <div class="col-md-8 itemInput">
            <label for="validationCustomUsername" class="form-label">Téléphone</label>
            <input type="tel" class="form-control modalInput" id="numeroTelephone" name="numeroTelephone" pattern="^\d{10}|(\+\d{1,2}\s)?\(?\d{3}\)?[\s-]\d{3}[\s-]\d{4}$" required>
          </div>
          <div class="col-md-8 itemInput">
            <label for="validationCustomUsername" class="form-label">Description</label>
            <textarea id="description" name="description" rows="4" cols="50" required></textarea>
          </div>
          <div class="col-md-8 itemInput">
            <label for="validationCustom03" class="form-label">Mot de passe</label>
            <div class="passwordDivInscription">
              <input type="password" class="form-control modalInput passwordCustomInscription" id="password" name="password" required>
              <i class="bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <span id="msg-password-erreur">Le mot de passe doit contenir au moins 8 charactères </span>
          </div>
          <div class="col-md-8 itemInput">
            <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
            <div class="passwordConfirmDivInscription">
              <input type="password" class="form-control modalInput passwordConfirmCustomInscription" id="confirmPassword" required>
              <i class="bi bi-eye-slash" id="togglePasswordConfirm"></i>
            </div>
            <span id="msg-confirm-password-erreur">Confirmation invalide</span>
          </div>
          <br>
          <div class="col-md-8 itemInput">
            <button type="button" class="collapsible">Termes et conditions</button>
            <div class="contentConditions">
              <p>Inserer termes et conditions</p>
            </div>
          </div>

          <div class="col-8 itemInput">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
              <label class="form-check-label" for="invalidCheck">
                Accepter les termes et conditions.
              </label>
            </div>
          </div>

          <div class="modal-footer modalFooter">
            <button type="button" class="btn btn-primary" onClick="valider();">Envoyer</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</div>


<!-- modal connexion -->
<div class="modal fade" id="modalConnexion" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHeader">
        <h5 class="modal-title"><strong>Connexion</strong></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Form connexion -->

        <form class="form-connexion connexionContainer" id="form-connexion">

          <input type="hidden" name="action" value="connexion">
          <input type="submit" id="validation-connexion" class="validation">
          <div class="myInput">
            <label for="pages" class="form-label"> Courriel</label>
            <input type="email" class="form-control inputConnexion" id="email-Connexion" name="email" required>
          </div>

          <div class="myInput">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="passwordDivConnexion">
              <input type="password" class="form-control passwordCustomConnexion" id="passwordConnexion" name="password" required>
              <i class="bi bi-eye-slash" id="togglePasswordConnexion"></i>
            </div>
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="connexion()">Connexion</button>
          </div>
        </form>

        <!-- Fin form connexion -->
      </div>

    </div>
  </div>
</div> <!-- Fin modal connexion -->

<!-- modal signalisation -->
<div class="modal fade" id="modalSignalisation" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content modalCustom">
      <div class="modal-header modalHeader">
        <h5 class="modal-title titreModalInscription">Raisons</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modalCustom">

        <div class="card descCard">
          <div class="card-header">
            nom projet
          </div>
          <div class="card-body">

            <p>raison</p>

          </div>
        </div>

        <div class="card descCard">
          <div class="card-header">
            nom projet
          </div>
          <div class="card-body">

            <p>raison</p>

          </div>
        </div>

      </div>

    </div>
  </div>
</div> <!-- modal signalisation -->