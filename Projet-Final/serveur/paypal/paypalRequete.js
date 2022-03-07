const PRIX_ABONNEMENT = 4.99;

function afficherPaypal(){
    cleanButtons();
    item = {
      prix: PRIX_ABONNEMENT,
      abonnement_creation: Date.now(),
    }
    
    paypal.Buttons({
      createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: PRIX_ABONNEMENT
                  }
              }]
          });
      },
      onApprove: function () {

          $.ajax({
              type: 'POST',
              url: './Projet-Final/serveur/paypal/paypalController.php',
              data: {"action": 'payer', "item": item},
              dataType: 'json',
              success: function (reponse) {
                  // viderPanier();
                  // initialiser(reponse.msg);
              },
              fail: function (err) {}
          });

      }
  }).render('#paypal-button-container');
    
  }

  function cleanButtons(){
    let divPaypalButtons = document.getElementById('paypal-button-container');
    divPaypalButtons.innerHTML = "";
  }