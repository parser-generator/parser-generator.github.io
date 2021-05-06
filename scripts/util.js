/**
 * Funktion zur Überprüfung eines Symbols, ob es sich um ein Nonterminalsymbol handelt.
 * @param symbol
 * @returns boolean
 */
function isNT(symbol) {
    return nonTerminals.symbols.includes(symbol);
}

function log(string) {
    if (logging === "ALL") console.log(string);
    if (logging === "OBJECTS") {
        if(typeof string !== 'string') console.log(string);
    }
}
