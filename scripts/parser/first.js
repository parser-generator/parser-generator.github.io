/**
 * Klasse für das Speichern der generierten First-Mengen.
 */
class FirstSet {
    /**
     * @constructor
     * Konstruktor für ein {@link FirstSet}.
     * Initialisiert die First-Mengen für alle Terminal- und Nichtterminalsymbole.
     */
    constructor() {
        for(let i = 0; i < terminals.symbols.length; i++){
            this[terminals.symbols[i]] = [terminals.symbols[i]];
        }
        for(let i = 0; i < nonTerminals.symbols.length; i++){
            this[nonTerminals.symbols[i]] = [];
        }
    }
    /**
     * @param {string} position identifiziert die First-Menge.
     * @param {string} newSymbol ist das Symbol welches hinzugefügt werden soll.
     * Funktion für das Hinzufügen eines Symbols zu einer First-Menge.
     * Beachtet die Mengeneigenschaften (Ist als Vereinigung der First-Menge mit {newSymbol} umgesetzt).
     */
    append(position, newSymbol){
        if(!this[position].includes(newSymbol)){
            this[position].push(newSymbol);
            return true;
        }
        return false;
    }
    /**
     * @param {string} correctSymbol identifiziert die First-Menge.
     * @param {string[]} inputSet ist die Menge welche verglichen werden soll.
     * Funktion für den Vergleich einer Menge von Symbolen zu einer First-Menge.
     * Beachtet die Mengeneigenschaften (Ist als prüfung auf gegenseitige Inklusion umgesetzt).
     */
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

/**
 * Funktion für den Check der generierten First-Mengen.
 * Prüft ob die First-Mengen undefiniert sind und gibt gegebenenfalls eine Warnung aus.
 */
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
 * Funktion für die Generierung der First-Mengen.
 * Generiert die First-Mengen pro Nichtterminalsymbol einzeln durch den Aufruf von {@link generateFirstOfNT}.
 */
function generateFirsts() {
    let sortedNonTerminals = topologicalSorting();
    let changed = true;
    let i = 1;
    while(changed){
        log(i + ". iteration");
        changed = false;
        for(let i = 0; i < sortedNonTerminals.symbols.length; i++){
            log("Next symbol: ", sortedNonTerminals.symbols[i]);
            if(generateFirstOfNT(sortedNonTerminals.symbols[i])){
                changed = true;
                log("", sortedNonTerminals.symbols[i], ":    Changes detected");
            } else {
                log("", sortedNonTerminals.symbols[i], ":    No changes detected");
            }
        }
        if(changed) log("Another iteration needed because of changes");
        i++;
    }
    log("Results after " + i + " iterations:");
    log(first);
}

/**
 * @param {string} nonTerminal für die die First-Menge berechnet werden soll.
 * Berechnet die First-Menge eines Nichtterminalsymbols.
 */
function generateFirstOfNT(nonTerminal) {
    let changed = false;
    log("", nonTerminal , ":    Rules: " , productionRules.of(nonTerminal));
    for(let i = 0; i < productionRules.of(nonTerminal).length; i++){
        log("", nonTerminal , ":        Next Rule: " , productionRules.of(nonTerminal)[i]);
        if(productionRules.of(nonTerminal)[i] === EMPTY){
            if(first.append(nonTerminal, EMPTY)){
                log("", nonTerminal , ":            Adding EMPTY");
                changed = true;
            } else {
                log("",nonTerminal , ":            EMPTY already included");
            }
        } else {
            log("", nonTerminal , ":        Current First: " , first[nonTerminal]);
            for (let j = 0; j < productionRules.of(nonTerminal)[i].length; j++) {
                log("", nonTerminal , ":            Next symbol: " , productionRules.of(nonTerminal)[i][j]);
                log( nonTerminal + ":            First of " , productionRules.of(nonTerminal)[i][j] , ": " , first[productionRules.of(nonTerminal)[i][j]]);
                for (let k = 0; k < first[productionRules.of(nonTerminal)[i][j]].length; k++) {
                    if(!(first[productionRules.of(nonTerminal)[i][j]][k] === EMPTY)) {
                        if (first.append(nonTerminal, first[productionRules.of(nonTerminal)[i][j]][k])) {
                            log("", nonTerminal , ":                Adding: " , first[productionRules.of(nonTerminal)[i][j]][k]);
                            changed = true;
                        } else {
                            log(nonTerminal + ":                " , first[productionRules.of(nonTerminal)[i][j]][k] , " already included");
                        }
                    }
                }
                if (first[productionRules.of(nonTerminal)[i][j]].includes(EMPTY)) {
                    if ((j + 1) === productionRules.of(nonTerminal)[i].length) {
                        log("", nonTerminal , ":                First of last symbol contains EMPTY");
                        if (first.append(nonTerminal, EMPTY)) {
                            log("", nonTerminal , ":                    Adding EMPTY");
                            changed = true;
                        } else {
                            log("", nonTerminal , ":                    EMPTY already included");
                        }
                        break;
                    } else {
                        log("", nonTerminal , ":                First of current symbol contains EMPTY");
                        log("", nonTerminal , ":                    Continuing with next symbol");
                    }
                } else {
                    log("", nonTerminal , ":                First of current symbol contains no EMPTY");
                    log("", nonTerminal , ":                    Exiting current rule");
                    break;
                }
            }
        }
        if(changed) log("", nonTerminal , ":        Updating First to: " , first[nonTerminal]);
    }
    return changed;
}

/**
 * @param {String[]} symbols
 */
function firstOf(symbols) {
    var ret = [];
    if(symbols.length !== 0) {
        if (first[symbols[0]].includes(EMPTY)) {
            for (let j = 0; j < first[symbols[0]].length; j++) {
                if (first[symbols[0]][j] !== EMPTY) {
                    ret.push(first[symbols[0]][j])
                }
            }
            ret.push(firstOf(symbols.shift()))
        } else {
            for (let i = 0; i < first[symbols[0]].length; i++) {
                ret.push(first[symbols[0]][i])
            }
        }
    } else {
        ret.push(EMPTY)
    }
    return ret
}