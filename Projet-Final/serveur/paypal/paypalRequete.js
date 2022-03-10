const PRIX_ABONNEMENT = 4.99;

function afficherPaypal() {
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
            devenirPremium();
        }
    }).render('#paypal-button-container');

}

function cleanButtons() {
    let divPaypalButtons = document.getElementById('paypal-button-container');
    divPaypalButtons.innerHTML = "";
}