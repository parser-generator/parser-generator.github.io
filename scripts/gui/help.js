/**
 * Diese Funktion erzeug ein Popup mit Hilfestellung für den Nutzer.
 */
function popup() {
    let popup = document.getElementById("help-" + step);
    popup.classList.toggle("show");
    if(step === 1){
        document.getElementById("error").classList.remove("show");
    }
    setTimeout(function(){popup.classList.remove("show");},10000);
}

/**
 * Diese Funktion wird benötigt, um dem Nutzer Fehler mittels Popups mitzuteilen.
 * @param {string} errorMsg ist der Inhalt der Nachricht an den Nutzer.
 * @param {string} color ist die Farbe des Popups und gibt Auskunft über die Schwere des Fehlers.
 */
function error(errorMsg, color){
    let popup = document.getElementById("error");
    if(popup.classList.contains("show") && errorMsg !== "error"){
        popup.classList.remove("show");
    }
    popup.innerHTML = errorMsg;
    popup.style.backgroundColor = color;
    popup.style.color = "black";
    popup.classList.toggle("show");
}