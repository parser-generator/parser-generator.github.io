class FirstSet {
    constructor() {
        for(let i = 0; i < terminals.symbols.length; i++){
            this[terminals.symbols[i]] = [terminals.symbols[i]];
        }
        for(let i = 0; i < nonTerminals.symbols.length; i++){
            this[nonTerminals.symbols[i]] = [];
        }
    }

    append(position, newSymbol){
        if(!this[position].includes(newSymbol)){
            this[position].push(newSymbol);
            return true;
        }
        return false;
    }

    equals(correctSymbol, inputSet){
        let equal = true;
        for (let i = 0; i < this[correctSymbol].length; i++) {
            if(!inputSet.includes(this[correctSymbol][i])){
                equal = false;
                break;
            }
        }
        if(equal){
            for (let i = 0; i < inputSet.length; i++) {
                if(!this[correctSymbol].includes(inputSet[i])){
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}

function checkFirsts(){
    let undefinedSymbols = [];
    for (let i = 1; i < nonTerminals.symbols.length; i++) {
        if(first[nonTerminals.symbols[i]].length === 0){
            undefinedSymbols.push(nonTerminals.symbols[i]);
        }
    }
    if (undefinedSymbols.length !== 0) {
        let nonTerminalInput = document.getElementsByClassName("nonterminal");
        for (let i = 0; i < nonTerminalInput.length; i++) {
            if(undefinedSymbols.includes(nonTerminalInput[i].value.replace(/\s/g, ""))){
                nonTerminalInput[i].style.backgroundColor = warningColor;

            }
        }
        error("Rekursiver Aufruf eines Nonterminalsymbols ohne Rekursionsanker.", warningColor);
    }

}

/**
 * @param terminals: Array of all terminal-symbols represented by uppercase letters
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented as uppercase letters
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirsts() {
    let sortedNonTerminals = topologicalSorting();
    let changed = true;
    let i = 1;
    while(changed){
        log(i + ". iteration");
        changed = false;
        for(let i = 0; i < sortedNonTerminals.symbols.length; i++){
            log("Next symbol: " + sortedNonTerminals.symbols[i]);
            if(generateFirstOfNT(sortedNonTerminals.symbols[i])){
                changed = true;
                log(sortedNonTerminals.symbols[i] + ":    Changes detected");
            } else {
                log(sortedNonTerminals.symbols[i] + ":    No changes detected");
            }
        }
        if(changed) log("Another iteration needed because of changes");
        i++;
    }
    log("Results after " + i + " iterations:");
    log(first);
}

/**
 * @param nonTerminal: nonterminal-symbol represented by uppercase letter
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirstOfNT(nonTerminal) {
    let changed = false;
    log(nonTerminal + ":    Rules: " + productionRules.of(nonTerminal));
    for(let i = 0; i < productionRules.of(nonTerminal).length; i++){
        log(nonTerminal + ":        Next Rule: " + productionRules.of(nonTerminal)[i]);
        if(productionRules.of(nonTerminal)[i] === EMPTY){
            if(first.append(nonTerminal, EMPTY)){
                log(nonTerminal + ":            Adding EMPTY");
                changed = true;
            } else {
                log(nonTerminal + ":            EMPTY already included");
            }
        } else {
            log(nonTerminal + ":        Current First: " + first[nonTerminal]);
            for (let j = 0; j < productionRules.of(nonTerminal)[i].length; j++) {
                log(nonTerminal + ":            Next symbol: " + productionRules.of(nonTerminal)[i][j]);
                log(nonTerminal + ":            First of " + productionRules.of(nonTerminal)[i][j] + ": " + first[productionRules.of(nonTerminal)[i][j]]);
                for (let k = 0; k < first[productionRules.of(nonTerminal)[i][j]].length; k++) {
                    if(!(first[productionRules.of(nonTerminal)[i][j]][k] === EMPTY)) {
                        if (first.append(nonTerminal, first[productionRules.of(nonTerminal)[i][j]][k])) {
                            log(nonTerminal + ":                Adding: " + first[productionRules.of(nonTerminal)[i][j]][k]);
                            changed = true;
                        } else {
                            log(nonTerminal + ":                " + first[productionRules.of(nonTerminal)[i][j]][k] + " already included");
                        }
                    }
                }
                if (first[productionRules.of(nonTerminal)[i][j]].includes(EMPTY)) {
                    if ((j + 1) === productionRules.of(nonTerminal)[i].length) {
                        log(nonTerminal + ":                First of last symbol contains EMPTY");
                        if (first.append(nonTerminal, EMPTY)) {
                            log(nonTerminal + ":                    Adding EMPTY");
                            changed = true;
                        } else {
                            log(nonTerminal + ":                    EMPTY already included");
                        }
                        break;
                    } else {
                        log(nonTerminal + ":                First of current symbol contains EMPTY");
                        log(nonTerminal + ":                    Continuing with next symbol");
                    }
                } else {
                    log(nonTerminal + ":                First of current symbol contains no EMPTY");
                    log(nonTerminal + ":                    Exiting current rule");
                    break;
                }
            }
        }
        if(changed) log(nonTerminal + ":        Updating First to: " + first[nonTerminal]);
    }
    return changed;
}