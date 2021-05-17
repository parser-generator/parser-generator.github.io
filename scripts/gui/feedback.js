/* Email form: SmtpJS.com - v3.0.0 */
var Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
                var t = JSON.stringify(a);
                Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) })
            })
        },
    ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
            a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                a.onload = function () {
                    var e = a.responseText; null != t && t(e)
                }, a.send(n)
    },
    ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e); t.onload = function () {
            var e = t.responseText; null != n && n(e)
        },
        t.send()
    },
    createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest;
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
    }
};


function feedback(){
    document.getElementById("feedbackModal").style.display = "block";

}

function closeFeedback(){
    document.getElementById("feedbackModal").style.display = "none";
}

function sendEmail() {
    let useful = document.querySelector('input[name="useful"]:checked').value;
    let ordered = document.querySelector('input[name="ordered"]:checked').value;
    let helpful = document.querySelector('input[name="helpful"]:checked').value;
    let exam = document.querySelector('input[name="exam"]:checked').value;
    let intuitive = document.querySelector('input[name="intuitive"]:checked').value;
    let crowded = document.querySelector('input[name="crowded"]:checked').value;
    let comment = document.getElementById("feedback-input").value;

    let mailContent = useful + "," + ordered + "," + helpful + "," + exam + "," + intuitive + "," + crowded + "," + "\"" + comment + "\"";

    closeFeedback();
    Email.send({
        Host: "smtp.gmail.com",
        Username: "slrparsergenerator.feedback@gmail.com",
        Password: getPassword().decode(),
        To: 'slrparsergenerator@gmail.com',
        From: "slrparsergenerator.feedback@gmail.com",
        Subject: "Feedback",
        Body: mailContent,
    }).then();
}