/**
 * Diese Funktion vergleicht die Nutzereingabe in allen First-Feldern mit den berechneten Firstmengen.
 * Außerdem wird pro Eingabe ein neues Feld daneben erzeugt, in welchem die berechnete Firstmenge steht.
 * Die Korrektur selbst wird in der Funktion {@link correctFirst} durchgeführt.
 */
function correctAllFirsts(){
    hideFollow();
    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== STARTSYMBOL && nonTerminals.symbols[i] !== EMPTY){
            let nonTerminalSymbol = nonTerminals.symbols[i];
            correctFirst(nonTerminalSymbol);
            let output = document.getElementById("first-output-of-" + nonTerminalSymbol);

            let result = "";
            result += (first[nonTerminalSymbol].length !== 0)? first[nonTerminalSymbol][0] : "Ø";
            for (let i = 1; i < first[nonTerminalSymbol].length; i++) {
                result += ", " + first[nonTerminalSymbol][i];
            }
            output.value = result;
            output.style.visibility = "visible";
        }
    }
    showFollow();
}

/**
 * @param {string} nonTerminalSymbol ist das Symbol, dessen Firstmenge mit der des Nutzers verglichen wird.
 * correctFirst führt die Korrektur der vom Nutzer eingegebenen Firstmenge für ein spezifisches Symbol durch.
 * Sind die Mengen gleich, wird das Feld der Nutzereingabe grün gefärbt, falls sie nicht gleich sind, rot.
 */
function correctFirst(nonTerminalSymbol){
    let input = document.getElementById("first-input-of-" + nonTerminalSymbol);

    let counter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if(input.value[i] === ",") counter++;
        else if(input.value[i] === ";") counter--;
    }

    let inputArray;
    let commaCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") commaCounter--;
    }

    if(commaCounter !== 0){
        let string = input.value.replace(/\s/g, "");
        if(commaCounter > 0) inputArray = string.split(",");
        else inputArray = string.split(";");
    } else {
        inputArray = input.value.split(" ");
    }

    let processedInputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        if(inputArray[i] !== "") processedInputArray.push(inputArray[i]);
    }

    if(first.equals(nonTerminalSymbol, processedInputArray)){
        input.style.backgroundColor = correctColor;
    }
    else{
        input.style.backgroundColor = errorColor;
    }
}

/**
 * In dieser Funktion werden alle Felder korrigiert, in welchen der Nutzer Followmengen angeben soll.
 * Korrektur heißt hierbei, dass für jedes Nonterminalsymbol {@link correctFollow} aufgerufen wird.
 * Anschließend wird für jedes Eingabefeld ein weiteres erzeugt, in welchem die berechneten Followmengen stehen.
 */
function correctAllFollows(){
    hideThirdRow();
    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        if(nonTerminals.symbols[i] !== STARTSYMBOL && nonTerminals.symbols[i] !== EMPTY){
            let symbol = nonTerminals.symbols[i];
            correctFollow(symbol);
            let output = document.getElementById("follow-output-of-" + symbol);

            let result = "";
            result += (follow[symbol].length !== 0)? follow[symbol][0]: "Ø";
            for (let i = 1; i < follow[symbol].length; i++) {
                result += ", " + follow[symbol][i];
            }
            output.value = result;
            output.style.visibility = "visible";
        }
    }
    showTables();
}

/**
 * @param {string} symbol ist das Symbol, für welches diese Korrektur durchgeführt werden soll.
 * In dieser Funktion wird das Eingabefeld für die Followmenge eines gegebenen Symbols mit der berechneten Followmenge des Symbols abgeglichen.
 * Sind die beiden Felder gleich, so wird die Eingabe grün gefärbt, sonst rot.
 */
function correctFollow(symbol){
    let input = document.getElementById("follow-input-of-" + symbol);

    let inputArray;
    let commaCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") commaCounter--;
    }

    if(commaCounter !== 0){
        let string = input.value.replace(/\s/g, "");
        if(commaCounter > 0) inputArray = string.split(",");
        else inputArray = string.split(";");
    } else {
        inputArray = input.value.split(" ");
    }

    let processedInputArray = [];
    for (let i = 0; i < inputArray.length; i++) {
        if(inputArray[i] !== "") processedInputArray.push(inputArray[i]);
    }

    if(follow.equals(symbol, processedInputArray)){
        input.style.backgroundColor = correctColor;
    }
    else{
        input.style.backgroundColor = errorColor;
    }
}

/**
 * @param {boolean} fillMode gibt an, ob zuletzt noch jeder Zelleintrag mit der korrekten Läsung überschrieben werden soll.
 * correctParserTable korrigiert die Parser-Tabelle. Dabei wird jeder Zelleintrag mit dem berechneten Eintrag abgeglcihen.
 * Sind die Einträge gleich, so wird die Zelle grün gefärbt, sind sie nicht gleich, wird sie rot gefärbt.
 * Im Fall, dass in einer Zelle kein Eintrag vorliegt und der Nutzer nichts eingegeben hat, so bleibt sie weiß.
 */
function correctParserTable(fillMode) {
    let tbody = document.getElementById("parse-table-body");
    let pseudoTerminals = new Symbols();
    for (let i = 0; i < terminals.symbols.length; i++) {
        if(terminals.symbols[i] !== EMPTY) pseudoTerminals.append(terminals.symbols[i]);
    }
    let allCorrect = true;

    for (let i = 0; i < tbody.rows.length; i++) {
        let row = tbody.rows[i];

        //Terminals
        for (let j = 0; j < pseudoTerminals.symbols.length; j++) {
            row.cells[j + 1].style.backgroundColor = "white";
            //Get Input
            let input = row.cells[j + 1].innerHTML;

            //Get Output
            let correct = "";
            for (let k = 0; k < states.collections[i].jumps[pseudoTerminals.symbols[j]].length; k++) {
                let currentJump = states.collections[i].jumps[pseudoTerminals.symbols[j]][k];
                if(currentJump !== undefined){
                    correct += "s" + currentJump;
                }
            }
            for (let k = 0; k < states.collections[i].reductions[pseudoTerminals.symbols[j]].length; k++) {
                let currentReduction = states.collections[i].reductions[pseudoTerminals.symbols[j]][k];
                if(currentReduction !== undefined){
                    correct += "r" + currentReduction;
                }
            }

            //Compare Input and Output
            if(correct === "" && input.replace(/[\s]/g, "") !== ""){
                row.cells[j + 1].style.backgroundColor = errorColor;
                allCorrect = false;
            } else if (correct !== ""){
                if (input.replace(/[^sSrR1234567890]/g, "").toLowerCase() !== correct){
                    row.cells[j + 1].style.backgroundColor = errorColor;
                    allCorrect = false;
                } else {
                    row.cells[j + 1].style.backgroundColor = correctColor;
                }
            }
            if(fillMode) row.cells[j + 1].innerHTML = correct;
        }

        //END - Symbol

        //Get Input
        let input = row.cells[pseudoTerminals.symbols.length + 1].innerHTML;

        //Get Output
        let correct = "";
        for (let k = 0; k < states.collections[i].reductions[END].length; k++) {
            let currentReduction = states.collections[i].reductions[END][k];
            if(currentReduction !== undefined){
                if(currentReduction === 0) {
                    correct += "Fertig";
                } else {
                    correct += "r" + currentReduction;
                }
            }
        }

        //Compare Input and Output
        if(correct === "" && input.replace(/[\s]/g, "") !== ""){
            row.cells[pseudoTerminals.symbols.length + 1].style.backgroundColor = errorColor;
            allCorrect = false;
        } else if (correct !== ""){
            if(correct === "Fertig" && input !== "" && input.replace(/[^1234567890]/g, "") === ""){
                row.cells[pseudoTerminals.symbols.length + 1].style.backgroundColor = correctColor;
            }
            else if (input.replace(/[^sSrR1234567890]/g, "").toLowerCase() !== correct){
                row.cells[pseudoTerminals.symbols.length + 1].style.backgroundColor = errorColor;
                allCorrect = false;
            } else {
                row.cells[pseudoTerminals.symbols.length + 1].style.backgroundColor = correctColor;
            }
        }
        if(fillMode) row.cells[pseudoTerminals.symbols.length + 1].innerHTML = correct;

        //Non-Terminals
        for (let j = 1; j < nonTerminals.symbols.length; j++) {
            row.cells[pseudoTerminals.symbols.length + j + 1].style.backgroundColor = "invisible";

            //Get Input
            let input = row.cells[pseudoTerminals.symbols.length + j + 1].innerHTML;

            //Get Output
            let correct = "";
            for (let k = 0; k < states.collections[i].jumps[nonTerminals.symbols[j]].length; k++) {
                let currentJump = states.collections[i].jumps[nonTerminals.symbols[j]][k];
                if(currentJump !== undefined){
                    correct += currentJump.toString();
                }
            }

            //Compare Input and Output
            if(correct === "" && input.replace(/[^\s]/g, "") !== ""){
                row.cells[pseudoTerminals.symbols.length + j + 1].style.backgroundColor = errorColor;
                allCorrect = false;
            } else if (correct !== ""){
                if (input.replace(/[^1234567890]/g, "") !== correct){
                    row.cells[pseudoTerminals.symbols.length + j + 1].style.backgroundColor = errorColor;
                    allCorrect = false;
                } else {
                    row.cells[pseudoTerminals.symbols.length + j + 1].style.backgroundColor = correctColor;
                }
            }
            if(fillMode) row.cells[pseudoTerminals.symbols.length + j + 1].innerHTML = correct;
        }
    }
    if(allCorrect) setTimeout(function (){feedback()},3000);
}