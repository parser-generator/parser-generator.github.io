/**
 * Funktion für das Sortieren der Nichtterminalsymbole in einer günstigen Reihenfolge für die Berechnung in {@link generateFirsts}.
 * Achtung: Ist keine vollständige Implementierung des Topologischen-Sortierens
 */
function topologicalSorting(){
    var dependencies = {};
    //Initialize dependencies
    for(let i = 0; i < nonTerminals.symbols.length; i++) {
        dependencies[nonTerminals.symbols[i]] = [];
    }
    //Iterate through NTs
    for(let i = 0; i < nonTerminals.symbols.length; i++){
        //Iterate through the according production rules
        log(productionRules.of(nonTerminals.symbols[i]));
        for(let j = 0; j < productionRules.of(nonTerminals.symbols[i]).length; j++){
            //Iterate through the characters of the production
            log("   "  + productionRules.of(nonTerminals.symbols[i])[j]);
            for(let k = 0; k < productionRules.of(nonTerminals.symbols[i])[j].length; k++){
                //Check if production contains NT
                log("       " + productionRules.of(nonTerminals.symbols[i])[j] + "(" + productionRules.of(nonTerminals.symbols[i])[j].length + ")" + ": " + productionRules.of(nonTerminals.symbols[i])[j][k]);
                if(isNT(productionRules.of(nonTerminals.symbols[i])[j][k])){
                    //Add as dependency
                    if(!(nonTerminals.symbols[i] in dependencies)){
                        dependencies[nonTerminals.symbols[i]] = [];
                        dependencies[nonTerminals.symbols[i]].push(productionRules.of(nonTerminals.symbols[i])[j][k]);
                    } else if(!dependencies[nonTerminals.symbols[i]].includes(productionRules.of(nonTerminals.symbols[i])[j][k])){
                        dependencies[nonTerminals.symbols[i]].push(productionRules.of(nonTerminals.symbols[i])[j][k]);
                    }
                }
            }
        }
    }
    log(dependencies);
    let maxDependencies = 0;
    for(let i = 0; i < nonTerminals.symbols.length; i++) {
        if(maxDependencies < dependencies[nonTerminals.symbols[i]].length){
            maxDependencies = dependencies[nonTerminals.symbols[i]].length;
        }
    }
    let sortedNonTerminals = [];
    for(let i = 0; i <= maxDependencies; i++) {
        for (let j = 0; j < nonTerminals.symbols.length; j++) {
            if (dependencies[nonTerminals.symbols[j]].length === i) {
                sortedNonTerminals.push(nonTerminals.symbols[j]);
            }
        }
    }
    return new Symbols(sortedNonTerminals);
}
