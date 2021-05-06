/**
 * Befüllt anstelle des Nutzers die Felder der Grammatik mit den übergebenen Regeln.
 * @param productionRules sind die übergebenen Regeln als Map. Das Key-Element ist dabei das Nontermial.
 */
function fillInput(productionRules){
    resetAll();
    const container = document.getElementById("input-form");
    let counter = 0;
    for (let i = 0; i < Object.keys(productionRules).length; i++) {
        for (let j = 0; j < productionRules[Object.keys(productionRules)[i]].length; j++) {
            if(container.getElementsByClassName("nonterminal").length <= counter){
                addField();
            }
            container.getElementsByClassName("nonterminal")[counter].value = Object.keys(productionRules)[i];
            container.getElementsByClassName("production-rule")[counter].value = productionRules[Object.keys(productionRules)[i]][j];
            counter++;
        }
    }
}

/**
 * @return {{S: [string, string, string], "S'": [string]}}
 * Mit dieser Grammatik sind Wörter eine Folge runder und eckiger Klammern, welche syntaktisch korrekt angeordnet sind.
 */
function getBracketGrammar() {
    EMPTY = '-';
    return {"S'": ['S'], S: ['S S', '( S ) | ( )', '[ S ] | [ ]']}
}

/**
 * @return {{S: [string, string], "S'": [string], T: [string, string, string], U: [string, string, string], V: [string, string, string]}}
 * Wörter dieser Grammatik enthalten nur 'a' und 'b', allerdings immer ungleich viele.
 */
function getDistinctNumberOfTSGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['T', 'U'], T: ['V a T', 'V a V', 'T a V'], U: ['V b U', 'V b V', 'U b V'], V: ['a V b V', 'b V a V', '-']}
}

/**
 * @return {{"S'": [string], Expr: [string, string], Term: [string, string], Faktor: [string, string]}}
 * Diese Grammatik stellt mathematische Ausdrücke dar, welche durch '+', '*' und Klammern erzeugt werden können.
 */
function getMathGrammar(){
    EMPTY = '-';
    return {"S'": ['Expr'], Expr: ['Expr + Term', 'Term'], Term: ['Term * Faktor', 'Faktor'], Faktor: ['( Expr )', 'Konst']}
}

/**
 * @return {{A: [string], S: [string], "S'": [string]}}
 * Eine kleine Grammatik, zum einfachen Übungen.
 */
function getSmallGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['A + S | A'], A: ['a']}
}

/**
 * @return {{S: [string], "S'": [string], L: [string]}}
 * Eine Grammatik, wie sie in der Klausur vorkommen könnte.
 */
function getFirstExamGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['a | ( L )'], L: ['S | L . S']}
}

/**
 * @return {{S: [string], "S'": [string], N: [string, string]}}
 * Eine Grammatik, wie sie in der Klausur vorkommen könnte.
 */
function getSecondExamGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['N'], N: ['a', 'N b a']}
}