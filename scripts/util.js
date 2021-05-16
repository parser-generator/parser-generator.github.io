/**
 * Funktion zur Überprüfung eines Symbols, ob es sich um ein Nonterminalsymbol handelt.
 * @param symbol
 * @returns boolean
 */
function isNT(symbol) {
    return nonTerminals.symbols.includes(symbol);
}

function log(string, object, string2, object2) {
    if (logging === "ALL") {
        if (object !== undefined) {
            if(string2 !== undefined){
                if(object2 !== undefined){
                    console.log(string + object + string2 + object2);
                } else {
                    console.log(string + object + string2);
                }
            } else {
                console.log(string + object);
            }
        } else {
            console.log(string);
        }
    }
    if (logging === "OBJECTS") {
        if(typeof string !== 'string') console.log(string);
    }
}

String.prototype.decode = function(){
    let j;
    let hexes = this.match(/.{1,4}/g) || [];
    let back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}


String.prototype.encode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

