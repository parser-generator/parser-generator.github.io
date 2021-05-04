/**
 * Class for productionrules of nonterminal symbosl
 */
class Rules {
    /**
     * Creates productions array and symbolToProduction map.
     * @param symbols for which the productions and the map needs to be created. Can not be extended.
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
     * @param symbol of which the rules are needed
     * @return rules of symbol
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
     * @return {boolean} whether production is a production of symbol
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
     * @param symbol with new production rule
     * @param production is the new production rule
     * @return {boolean} whether the rule was added (true) or already included (false)
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
