window.onload = function () {
    showConditions();
}

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
let initialiser = (message) => {
    let textToast = document.getElementById("textToast");
    let toastElList = [].slice.call(document.querySelectorAll('.toast'))
    let toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })

    if (message.length > 0) {
        textToast.innerHTML = message;
        $(".toast-container").css("display", "block");
        toastList[0].show();
    }
}