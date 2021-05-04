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

function getBracketGrammar() {
    EMPTY = '-';
    return {"S'": ['S'], S: ['S S', '( S ) | ( )', '[ S ] | [ ]']}
}

function getDistinctNumberOfTSGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['T', 'U'], T: ['V a T', 'V a V', 'T a V'], U: ['V b U', 'V b V', 'U b V'], V: ['a V b V', 'b V a V', '-']}
}

function getMathGrammar(){
    EMPTY = '-';
    return {"S'": ['Expr'], Expr: ['Expr + Term', 'Term'], Term: ['Term * Faktor', 'Faktor'], Faktor: ['( Expr )', 'Konst']}
}

function getSmallGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['A + S | A'], A: ['a']}
}

function getFirstExamGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['a | ( L )'], L: ['S | L . S']}
}

function getSecondExamGrammar(){
    EMPTY = '-';
    return{"S'": ['S'], S: ['N'], N: ['a', 'N b a']}
}