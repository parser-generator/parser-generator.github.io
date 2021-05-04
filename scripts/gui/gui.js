function addField(){
    const container = document.getElementById("input-form");

    const inputField = document.createElement("div");
    inputField.classList.add("input-field");

    const input1 = document.createElement("input");
    input1.classList.add("nonterminal");
    input1.type = "text";
    input1.onchange =  hideFirst;

    const arrow = document.createElement("span");
    arrow.innerHTML = "&#8594;";


    const input2 = document.createElement("input");
    input2.classList.add("production-rule");
    input2.type = "text";
    input2.onchange =  hideFirst;

    inputField.innerHTML = "<button class=\"button\" onclick=\"deleteField(this)\"><img src=\"../resources/trashcan.png\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.appendChild(inputField);
}

function deleteField(button){
    hideFirst();
    let field = button.parentNode;
    field.parentElement.removeChild(field);
}


function hideAll() {
    hideFirst();
    document.getElementById("input-form").innerHTML = "<div id=\"input-form\">\n" +
        "                    <div id=\"disabled-start-field\" class=\"input-field\">\n" +
        "                        <button class=\"button\"></button\n" +
        "                        ><input id=\"startsymbol-input\" disabled type=\"text\" class=\"nonterminal\" value=\"S'\"\n" +
        "                        /><span>&#8594;</span\n" +
        "                        ><input id=\"startproduction-input\" type=\"text\" class=\"production-rule\" value=\"S\"/>\n" +
        "                    </div>\n" +
        "                    <div class=\"input-field\">\n" +
        "                        <button class=\"button\" onclick=\"deleteField(this)\"\n" +
        "                        ><img src=\"../resources/trashcan.png\"\n" +
        "                        /></button><input type=\"text\" class=\"nonterminal\" onchange=\"hideFirst()\"\n" +
        "                    /><span>&#8594;</span><input type=\"text\" class=\"production-rule\"  onchange=\"hideFirst()\"/>\n" +
        "                    </div>\n" +
        "                </div>";
}

function hideFirst() {
    hideFollow();
    document.getElementById("first-form").innerHTML = "";
    document.getElementById("first-container").style.visibility = "collapse";

    document.getElementById("parse-grammar-button").style.backgroundColor = "white";
    document.getElementById("startproduction-input").style.backgroundColor = "white";
    let nts = document.getElementsByClassName("nonterminal");
    let rules = document.getElementsByClassName("production-rule");
    for (let i = 1; i < nts.length; i++) {
        nts[i].style.backgroundColor = "white";
        rules[i].style.backgroundColor = "white";
    }

    document.getElementById("help-" + step).classList.remove("show");
    document.getElementById("error").classList.remove("show");

    step = 1;
}

function hideFollow() {
    hideThirdRow();
    document.getElementById("follow-form").innerHTML = "";
    document.getElementById("follow-container").style.visibility = "collapse";

    let popup = document.getElementById("help-" + step);
    popup.classList.remove("show");

    step = 2;
}

function hideThirdRow() {
    document.getElementById("state-table-container").innerHTML = "";
    document.getElementById("parse-table-container").innerHTML = "";
    document.getElementById("third-row").style.visibility = "collapse";

    let popup = document.getElementById("help-" + step);
    popup.classList.remove("show");

    step = 3;
}

function resetAll(){
    hideAll();
    terminals = new Symbols();
    nonTerminals = new Symbols();
    productionRules = new Rules();
    first = new FirstSet();
    follow = new FollowSet();
}
