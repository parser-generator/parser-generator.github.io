/**
 * Klasse für die Speicherung von einer Menge von Symbolen (Terminal- and NichtterminalSymbole).
 * @append: Adds a new symbol to symbols if it is not already included.
 */
class Symbols {
    /**
     * @constructor
     * @param {string[]} symbols die enthalten sein sollen.
     * Konstruktor für ein {@link Symbols}
     */
    constructor(symbols) {
        if(symbols === undefined) symbols = [];
        this.symbols = symbols
    }

    /**
     * @param {string} symbol ist das Symbol welches hinzugefügt werden soll.
     * Funktion für das Hinzufügen eines Symbols zu einer Symbol-Menge.
     * Beachtet die Mengeneigenschaften (Ist als Vereinigung der Symbol-Menge mit {symbol} umgesetzt).
     */
    append(symbol) {
        if(!(this.symbols.includes(symbol))){
            this.symbols.push(symbol);
            return true;
        }
        return false;
    }
}