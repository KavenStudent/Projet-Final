window.onload = function () {
  showConditions();
};

// fonction show terme et conditions
function showConditions() {
  var coll = document.getElementsByClassName("collapsible");

  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

// initialise les toast
// let initialiser = (message) => {
//     let textToast = document.getElementById("textToast");
//     let toastElList = [].slice.call(document.querySelectorAll('.toast'))
//     let toastList = toastElList.map(function (toastEl) {
//         return new bootstrap.Toast(toastEl)
//     })

//     if (message.length > 0) {
//         textToast.innerHTML = message;
//         $(".toast-container").css("display", "block");
//         toastList[0].show();
//     }
// }

function afficherToastMiseAJourReussi(text, header) {
  let textBody = document.getElementById("toastBody");
  let headerToast = document.getElementById("headerToast");
  let headerDivToast = document.getElementById("toastHeader");
  let toastDiv = document.getElementById("toast");

  textBody.innerHTML = text;
  textBody.style.color = "black";
  textBody.style.backgroundColor = "#cac7c7";

  headerToast.innerHTML = header;
  headerToast.style.color = "black";

  headerDivToast.style.backgroundColor = "#4169E1";
  toastDiv.style.backgroundColor = "#4169E1";

  $("#toast").toast("show");
  document.getElementById("toast").scrollIntoView();
}

//Permet de fermer les toasts
function closeToast() {
  $("#toast").toast("hide");
  $("#toastForm").toast("hide");
}

var loadFile = function(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};