/**
 * Class for Terminal- and Nonterminal-Symbols
 * @constructor: Creates Array with given symbols (can be empty).
 * @append: Adds a new symbol to symbols if it is not already included.
 */
class Symbols {
    constructor(symbols) {
        if(symbols === undefined) symbols = [];
        this.symbols = symbols
    }

    append(symbol) {
        if(!(this.symbols.includes(symbol))){
            this.symbols.push(symbol);
            return true;
        }
        return false;
    }
}