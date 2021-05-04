class FollowSet {
    constructor() {
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



/**
 * This function generates the follow sets of all given symbols. It has to be called after first is calculated.
 */
function generateFollow(){
    let changed = true;
    let counter = 0;

    while(changed){
        changed = false;
        log("Going through all production rules");
        for (let i = 0; i < nonTerminals.symbols.length; i++) {
            log("   Going through production rules " + productionRules.of(nonTerminals.symbols[i]) + " of " + nonTerminals.symbols[i]);
            if(nonTerminals.symbols[i] === STARTSYMBOL){
                log("   Start Symbol. Follow is $ " + nonTerminals.symbols[i]);
                if(follow.append(nonTerminals.symbols[i], "$")){
                    changed = true;
                    continue;
                }
            }
            for (let j = 0; j < productionRules.of(nonTerminals.symbols[i]).length; j++) {
                log("       Going through production rule " + productionRules.of(nonTerminals.symbols[i])[j] + " of " + nonTerminals.symbols[i]);
                    for (let k = 0; k < productionRules.of(nonTerminals.symbols[i])[j].length - 1; k++) {
                        log("               Checking " + productionRules.of(nonTerminals.symbols[i])[j][k]);
                        if(!isNT(productionRules.of(nonTerminals.symbols[i])[j][k])) {
                            log("               Checking " + productionRules.of(nonTerminals.symbols[i])[j][k]+ " is not NT");
                            continue;
                        }
                        let firstSet = first[productionRules.of(nonTerminals.symbols[i])[j][k+1]];
                        log("                   First of next symbol: " + firstSet);
                        for (let l = 0; l < firstSet.length; l++) {
                            if(follow.append(productionRules.of(nonTerminals.symbols[i])[j][k], firstSet[l])){
                                changed = true;
                                log("                       Changed was set to true because of first of next");
                                log("                       " + firstSet[l] + " added to follow of " + productionRules.of(nonTerminals.symbols[i])[j][k]);
                                log(follow[productionRules.of(nonTerminals.symbols[i])[j][k]]);
                            }
                        }
                        if(firstSet.includes(EMPTY)){
                            log("                       It contains empty symbol");
                            for (let l = 0; l < follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]].length; l++) {
                                if(follow.append(productionRules.of(nonTerminals.symbols[i])[j][k], follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]][l])){
                                    changed = true;
                                    log("                       Changed was set to true because of follow of next");
                                    log("                       " + follow[productionRules.of(nonTerminals.symbols[i])[j][k+1]][l] + " added to follow of ");
                                    log(follow[productionRules.of(nonTerminals.symbols[i])[j][k]]);
                                }
                            }

                        }
                    }
                log("           Checking last element " + productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1]);
                for (let k = 0; k < follow[nonTerminals.symbols[i]].length; k++) {
                    if(!isNT(productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1])) {
                        log("                   last element not nt");
                        continue;
                    }
                    log("           Follow of non terminal " + nonTerminals.symbols[i] + " to be added: " + follow[nonTerminals.symbols[i]][k]);
                    if(follow.append(productionRules.of(nonTerminals.symbols[i])[j][productionRules.of(nonTerminals.symbols[i])[j].length - 1], follow[nonTerminals.symbols[i]][k])){
                        changed = true;
                        log("               Changed was set to true");
                    }
                }
            }
        }
        log(counter + ". iteration complete. Follow: ");
        log(follow);
        counter++;
    }
    log("Follow was generated");

    log("Empty Symbols get removed.");

    let defined = true;
    for (let i = 0; i < nonTerminals.symbols.length; i++) {
        log("   Filtering rule " + follow[nonTerminals.symbols[i]] + " of " + nonTerminals.symbols);
        if(nonTerminals.symbols[i] === EMPTY){
            delete follow[nonTerminals.symbols[i]];
        } else {
            let followSet = follow[nonTerminals.symbols[i]];
            for (let j = 0; j < followSet.length; j++) {
                if (followSet[j] === EMPTY) {
                    followSet.splice(j, 1);
                }
            }
        }
        log("         Result of filter: " + follow[nonTerminals.symbols[i]]);
        log("         Checking if " + follow[nonTerminals.symbols[i]] + " is defined.");
        if(typeof follow[nonTerminals.symbols[i]][0] === "undefined"){
            log("               It is not defined.");
            let nts = document.getElementsByClassName("nonterminal");
            for (let j = 0; j < nts.length; j++) {
                if(nts[j].value === nonTerminals.symbols[i]){
                    nts[j].style.backgroundColor = warningColor;
                    defined = false;
                }
            }

        }
    }
    if(!defined) {
        error("Unerreichbare Produktionsregel enthalten.", warningColor);
    }
    log(follow);
}
