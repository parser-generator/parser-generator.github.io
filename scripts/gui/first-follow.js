function showFirst(){
    const container = document.getElementById("first-form");
    container.innerHTML = "";

    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== STARTSYMBOL) {
            const firstField = document.createElement("div");
            firstField.id = "first-filed-of-" + nonTerminals.symbols[i];
            firstField.classList.add("first-field");

            firstField.innerHTML = "<text class=\"symbol-text\">" + nonTerminals.symbols[i] + "</text" +
                "><br><input type=\"text\" id=\"first-input-of-" + nonTerminals.symbols[i] + "\" class=\"first-input\"" +
                "/><button class=\"button\" onclick=\"correctFirst(\'" + nonTerminals.symbols[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"first-output-of-" + nonTerminals.symbols[i] + "\" class=\"first-output\"/>";

            container.appendChild(firstField);
        }
    }
    document.getElementById("first-container").style.visibility = "visible";
    let popup = document.getElementById("help-" + step);
    popup.classList.remove("show");
    step++;
}

function showFollow(){
    const container = document.getElementById("follow-form");
    container.innerHTML = "";

    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== EMPTY && nonTerminals.symbols[i] !== STARTSYMBOL) {
            const followField = document.createElement("div");
            followField.classList.add("follow-field");
            followField.id = "follow-field-of-" + nonTerminals.symbols[i];

            followField.innerHTML = "<text class=\"symbol-text\">" + nonTerminals.symbols[i] + "</text" +
                "><br><input type=\"text\" id=\"follow-input-of-" + nonTerminals.symbols[i] + "\" class=\"follow-input\"" +
                "/><button class=\"button\" onclick=\"correctFollow(\'" + nonTerminals.symbols[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"follow-output-of-" + nonTerminals.symbols[i] + "\" class=\"follow-output\"/>";

            container.appendChild(followField);
        }
    }
    document.getElementById("follow-container").style.visibility = "visible";
    let popup = document.getElementById("help-" + step);
    popup.classList.remove("show");
    step++;
}