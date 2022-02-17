<form class="editProj">

   <!-- Text input -->
  <div class="form-outline mb-69">
    <label class="form-label ftxt" for="form6Example3">Titre:</label>
    <input type="text" id="form6Example3" class="form-control" placeholder="Example"/>
    
  </div>

  <!-- Message input -->
  <div class="form-outline mb-69">
    <label class="form-label" for="form6Example7">Description:</label>
    <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Description"></textarea>
    
  </div>

  <!-- Message input -->
  <div class="form-outline mb-69">
    <label class="form-label" for="form6Example7">Participants:</label>
    <textarea class="form-control ftxt" id="form6Example7" rows="4" placeholder="Patricipants"></textarea>
    
  </div>

  <!-- Email input -->
  <div class="form-outline mb-69">
    <label class="form-label" for="form6Example5">Lien:</label>
    <input type="url" id="form6Example5" class="form-control" placeholder="Lien" />
    
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
  <!-- Submit button -->
  <button type="reset" class="btn btn-primary btn-block mb-4 canBtn">Cancel</button>
  <button type="submit" class="btn btn-primary btn-block mb-4">Sauvegarder</button>
</form>