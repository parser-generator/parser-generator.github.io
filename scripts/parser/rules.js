/**
 * Klasse für das Speichern der Produktionsregeln der Nichtterminalsymbole.
 */
class Rules {
    /**
     * @constructor
     * @param {string[]} symbols die Initialisiert werden sollen.
     * Konstruktor für ein {@link Rules}.
     * Initialisiert die Produktionsregeln für alle {@link symbols}.
     */
    constructor(symbols) {
        this.symbolToProduction = {};
        if (symbols === undefined) symbols = [];
        for (let i = 0; i < symbols.length; i++) {
            this.symbolToProduction[symbols[i]] = [];
        }
        this.productions = [];
    }

    /**
     * @param {string} symbol dessen Produktionsregeln gesucht sind.
     * @return {string[][]} Produktionsregeln des Symbols.
     * Funktion für den vereinfachten Zugriff auf die Produktionsregeln.
     */
    of(symbol){
        if(this.symbolToProduction[symbol] === undefined) return [];
        let rules = [];
        for (let i = 0; i < this.symbolToProduction[symbol].length; i++) {
            rules.push(this.productions[this.symbolToProduction[symbol][i]]);
        }
        return rules;
    }

    /**
     * @param {string} symbol dessen Produktionsregeln abgesucht werden.
     * @param {string[]} production ist die Produktion die gesucht werden soll.
     * Funktion für die Suche einer Produktion in den Produktionsregeln eines Symbols.
     */
    symbolHasProduction(symbol, production){
        for (let i = 0; i < this.symbolToProduction[symbol].length ; i++) {
            if(this.productions[this.symbolToProduction[symbol][i]] === production){
                return true;
            }
        }
        return false;
    }

    /**
     * @param {string} symbol für die eine Produktion hinzugefügt werden soll.
     * @param {string[]} production das hinzugefügt werden soll.
     * Funktion für das Hinzufügen einer Produktion zu einem Symbol.
     * Beachtet die Mengeneigenschaften (Ist als Vereinigung der Produktionen mit {produktion} umgesetzt).
     */
    append(symbol, production) {
        if(!this.symbolHasProduction(symbol, production)){
            this.productions.push(production);
            this.symbolToProduction[symbol].push(this.productions.length - 1);
            return true;
        }
        return false;
    }
}
