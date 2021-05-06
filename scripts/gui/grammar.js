/**
 * getInput durchläuft die vom Nutzer eingegebene Grammatik und ermittelt daraus Produktionsregeln, Terminal und Nonterminalregeln.
 * Diese werden in globalen Variablen abgespeichert.
 */
function getInput() {
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRulesInput = container.getElementsByClassName("production-rule");

    nonTerminals = new Symbols();
    terminals = new Symbols();
    let processedProductionRules = [];
    let processedNonTerminals = [];

    let valid = true;
    for (let i = 0; i < nonTerminalInput.length; i++) {
        let symbols = nonTerminalInput[i].value.split(' ');
        let symbolCounter = 0;
        for (let i = 0; i < symbols.length; i++) {
            if(symbols[i] !== ""){
                symbolCounter++;
            }
        }
        if(symbolCounter > 1) {
            nonTerminalInput[i].style.backgroundColor = errorColor;
            valid = false;
        }
    }
    if(!valid){
        error("Mehr als ein Symbol als Nonterminalsymbol eingetragen.", errorColor);
        throw "Invalid Nonterminal";
    }

    for (let i = 0; i < nonTerminalInput.length; i++) {
        if(i > 0 && nonTerminalInput[i].value.replace(/\s/g, "") === "S\'"){
            nonTerminalInput[i].style.backgroundColor = errorColor;
            error("Das Startsymbol darf nur einmal verwendet werden.", errorColor);
            throw "Startsymbol used more than once.";
        }
        if(i > 0 && nonTerminalInput[i].value.replace(/\s/g, "") === EMPTY){
            nonTerminalInput[i].style.backgroundColor = errorColor;
            error("Leeres Symbol ist als Nonterminalsymbol eingetragen.", errorColor);
            throw "EMPTY is used as Nonterminalsymbol.";
        }
        if(nonTerminalInput[i].value.replace(/\s/g, "") !== ""){
            nonTerminals.append(nonTerminalInput[i].value.replace(/\s/g, ""));
        }
    }

    productionRules = new Rules(nonTerminals.symbols);

    for (let i = 0; i < productionRulesInput.length; i++) {
        if(nonTerminalInput[i].value.replace(/\s/g, "") !== ""){
            let rules = productionRulesInput[i].value.split('|');
            for (let j = 0; j < rules.length; j++) {
                if(rules[j].replace(/\s/g, "") === ""){
                    processedProductionRules.push(EMPTY);
                }
                else {
                    let symbols = rules[j].split(" ");
                    for (let k = 0; k < symbols.length; k++) {
                        if(symbols[k] === EMPTY){
                            productionRulesInput[i].style.backgroundColor = errorColor;
                            error("Leeres Symbol ist als Zeichen in Regel enthalten.", errorColor);
                            throw "EMPTY is used as symbol in rule";
                        }
                    }
                    processedProductionRules.push(rules[j]);
                }
                processedNonTerminals.push(nonTerminalInput[i].value.replace(/\s/g, ""))
            }
        }
        else {
            nonTerminalInput[i].style.backgroundColor = warningColor;
            error("Die linke Seite der Grammatik ist nicht befüllt.", warningColor);
        }
    }

    if(!nonTerminals.symbols.includes(STARTPRODUCTION[0])){
        productionRulesInput[0].style.backgroundColor = errorColor;
        error("Startregel kann nicht weiter abgeleitet werden.", errorColor);
        throw "Invalid grammar.";
    }

    log(processedProductionRules);

    for (let i = 0; i < processedNonTerminals.length; i++) {
        let symbolInput = processedProductionRules[i].split(' ');
        let isEmpty = true;
        let processedSymbols = [];

        for (let j = 0; j < symbolInput.length; j++) {
            if(symbolInput[j] !== ''){
                if(!(isNT(symbolInput[j]))){
                    terminals.append(symbolInput[j]);
                }
                isEmpty = false;
                processedSymbols.push(symbolInput[j]);
            }
        }
        if(isEmpty){
            processedSymbols.push(EMPTY);
        }

        productionRules.append(processedNonTerminals[i], processedSymbols);
    }
}

/**
 * Der globalen Variable STARTPRODUCTION wird hier die Produktionsregel des Startsymbols zugewiesen.
 * Zuvor werden einige Tests durchgeführt, um sicherzustellen, dass es sich um eine valide Regel handelt.
 */
function getStartproduction() {
    let input = document.getElementById("startproduction-input");
    let symbols = input.value.split(' ');
    let symbol;
    let symbolCounter = 0;
    for (let i = 0; i < symbols.length; i++) {
        if(symbols[i] !== ""){
            symbolCounter++;
            symbol = symbols[i];
        }
    }
    if(symbolCounter !== 1) {
        input.style.backgroundColor = errorColor;
        error("Startproduktion darf nicht mehrere Symbole enthalten.", errorColor);
        throw "Invalid Startproduction";
    }
    STARTPRODUCTION = [symbol];
}