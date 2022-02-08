<div class="container" id='containerEdit'>
    <form id='membre-edit' name="membre-edit">

        <input type='hidden' name='idMembreEdit' value="<?php $_SESSION['membre'] ?>">
        <input type="hidden" name="action" value="modifierMembre">
        <!-- <input type="submit" id="validation-form-membre-edit" class="validation" /> -->

        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
            <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="prenomEdit">Prénom</label>
                    <input type="text" name="prenomEdit" class="form-control modalInput" />
                </div>
            </div>

            <div class="col">
                <div class="form-outline">
                <label class="form-label" for="nomEdit">Nom</label>
                    <input type="text" name="nomEdit" class="form-control modalInput" />
                </div>
            </div>
        </div>

        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="courrielEdit">Courriel</label>
            <input type="email" name="courrielEdit" class="form-control modalInput" />
        </div>

        <!-- Cell input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="numeroTelephoneEdit">Téléphone</label>
            <input type="number" name="numeroTelephoneEdit" class="form-control modalInput" />
        </div>

        <!-- Description input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="descriptionEdit">Description</label>
            <textarea class="form-control modalInput" name="descriptionEdit" rows="4"></textarea>
        </div>

        <div class="form-outline mb-4">
            <label for="validationCustom03" class="form-label">Mot de passe</label>
            <input type="password" class="form-control modalInput" id="passwordEdit" name="passwordEdit" required>
            <span id="msg-password-erreur-edit">Le mot de passe doit contenir au moins 8 charactères </span>
        </div>
        <div class="form-outline mb-4">
            <label for="validationCustom05" class="form-label">Confirmer le mot de passe</label>
            <input type="password" class="form-control modalInput" id="confirmPasswordEdit" required>
            <span id="msg-confirm-password-erreur-edit">Confirmation invalide</span>
        </div>
        <!-- 3 column grid layout with preview, upload and visibile -->
        <div class="row mb-4" id='divCentrer'>

            <div class="col-sm profilEdit">
                <img id="output" class="img-fluid" src="Projet-Final/client/public/images/defaultProfil.png" alt="imageProfil" />
            </div>

            <div class="col-sm profilEdit">
                <input class="form-control" type="file" accept="image/*" onchange="loadFile(event)" name='imageProfil'>
            </div>

            <div class="col-sm profilEdit">
                <div class="form-check form-switch" id='switchBox'>
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Visibilite</label>
                </div>
            </div>
        </div>
        <!-- Submit button -->
        <div class="col-md-12 text-center">
            <button type="submit" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
        </div>

    </form>

</div>