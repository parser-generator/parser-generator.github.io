/**
 * Klasse für die Speicherung eines LRElementes einer {@link LRCollection}}.
 */
class LRElement {
    /**
     * @constructor
     * @param {String} nonTerminalSymbol der entsprechenden Produktionsregel.
     * @param {String[]} rule der entsprechenden Produktionsregel.
     * @param {Number} index der Produktionsregel in {@link productionRules}.
     * @param {Number} point entspricht der Stelle der Punktes in einer Produktionsregel.
     * @param {String[]} previews Vorschau Symbole
     * Konstruktor für ein {@link LRElement}.
     */
    constructor(nonTerminalSymbol, rule, index, point, previews) {
        if(nonTerminalSymbol === undefined){
            throw "Invalid element";
        }
        if(rule === undefined){
            throw "Invalid element";
        }
        if(index === undefined){
            throw "Invalid element";
        }
        if(point === undefined){
            point = 0;
        }
        if(previews === undefined){
            previews = [];
        }
        if(point <= rule.length) {
            this.nonTerminalSymbol = nonTerminalSymbol;
            this.rule = rule;
            this.index = index;
            this.point = point;
            this.previewSymbols = previews;
        } else {
            throw "Invalid element";
        }
    }

    /**
     * @param {String} symbol ist das Vorschausymbol welches hinzugefügt werden soll.
     * Funktion für das Hinzufügen eines Vorschausymboles.
     */
    appendPreview(symbol){
        if(this.previewSymbols.includes(symbol)){
            return false;
        } else {
            this.previewSymbols.push(symbol);
            return true;
        }
    }

    /**
     * @param {LRElement} element ist das Element welches verglichen werden soll.
     * Funktion für den Vergleich zweier Elemente.
     */
    equals(element){
        let equals = false;
        if(element.nonTerminalSymbol === this.nonTerminalSymbol
            && element.point === this.point
            && element.rule.length === this.rule.length) {
            equals = true;
            for (let i = 0; i < this.rule.length; i++) {
                if(this.rule[i] !== element.rule[i]){
                    equals = false;
                    break;
                }
            }
        }
        if(equals){
            for (let i = 0; i < element.previewSymbols.length; i++) {
                if(!this.previewSymbols.includes(element.previewSymbols[i])){
                    equals = false;
                    break;
                }
            }
            for (let i = 0; i < this.previewSymbols.length; i++) {
                if(!element.previewSymbols.includes(this.previewSymbols[i])){
                    equals = false;
                    break;
                }
            }
        }
        return equals;
    }

    /**
     * @return {Boolean} ob das Element beendet ist (der Punkt am Ende ist).
     * Funtkion zur Bestimmung ob das Element beendet ist.
     */
    isNotFinished(){
        return (this.point < this.rule.length);
    }

    /**
     * @return {String} Folgesymbol (Symbol nach dem Punkt)
     * Funktion zur Bestimmung des Folgesymbols, wenn die Regel nicht beendet ist.
     */
    followingSymbol() {
        if (this.isNotFinished()) {
            return this.rule[this.point];
        }
    }

    /**
     * @return {String} Folgesymbol (Symbol nach dem Punkt)
     * Funktion zur Bestimmung des Folgesymbols, wenn die Regel nicht beendet ist.
     */
    followingFollowingSymbol() {
        if (this.point < this.rule.length - 1) {
            return this.rule[this.point + 1];
        } else if (this.point === this.rule.length - 1){
            return END;
        }
    }
}

/**
 * @returns {String} Ausgabe eines Elementes in Form von:
 * @example "NTS -> . x", "NTS -> x . y" or "NTS -> x ."
 */
LRElement.prototype.toString = function elementToString() {
    let ret = "[ " + this.nonTerminalSymbol + " &#8594; ";
    if(this.point === 0){
        ret += ". " + this.rule[0];
    } else {
        ret += this.rule[0];
    }
    for (let i = 1; i < this.rule.length; i++) {
        if(i === this.point){
            ret += (" . " + this.rule[i]);
        } else {
            ret += (" " + this.rule[i]);
        }
    }
    if(this.point === this.rule.length){
        ret += " .";
    }
    ret += "; ";
    for (let i = 0; i < this.previewSymbols.length - 1; i++) {
        ret += this.previewSymbols[i] + " \| ";
    }
    ret += this.previewSymbols[this.previewSymbols.length - 1] + " ]";
    return ret;
};

/**
 * Klasse für die Speicherung einer Kollektion einer {@link Collections}-Menge (Menge der Zustände).
 * Beinhaltet die Sprünge und Reduktion einer Kollektion.
 */
class LRCollection {
    /**
     * @constructor
     * @param {LRElement[]} elements der Kollektion.
     * @param {Number} origin entspricht dem Zustand über dem die Kollektion erreicht wurde.
     * @param {String} symbol entspricht dem Symbol über dem die Kollektion erreicht wurde.
     * Konstruktor für eine {@link LRCollection}}.
     */
    constructor(elements, origin, symbol) {
        if(elements === undefined){
            elements = [];
        }
        this.jumps = {};
        this.reductions = {};
        for (let i = 0; i < terminals.symbols.length; i++) {
            this.jumps[terminals.symbols[i]] = [];
            this.reductions[terminals.symbols[i]] = [];
        }
        this.reductions[END] = [];
        for (let i = 0; i < nonTerminals.symbols.length; i++) {
            this.jumps[nonTerminals.symbols[i]] = [];
        }
        this.elements = elements;
        this.isStart = origin === undefined || symbol === undefined;
        if(!this.isStart){
            this.origin = origin;
            this.symbol = symbol;
        }
    }

    /**
     * @param {String} symbol entspricht dem Symbol über dem reduziert wird.
     * @param {Number} productionIndex ist der index der Produktionsregel in {@link productionRules}.
     * Funktion für das Hinzufügen der Reduktion zu einer Kollektion.
     * Wirft einen Fehler aus wenn eine andere Reduktion bereits enthalten ist (Reduce-Reduce-Konflikte).
     */
    addReduction(productionIndex,symbol){
        if(this.reductions[symbol] === undefined){
            this.reductions[symbol] = [productionIndex];
            return true;
        } else if (!this.reductions[symbol].includes(productionIndex)) {
            this.reductions[symbol].push(productionIndex);
            return true;
        }
        return false;
    }

    /**
     * @param {Number} collection entspricht dem Zustand zu dem gesprungen wird.
     * @param {String} symbol über dem der Sprung stattfindet.
     * Funktion für das Hinzufügen des Sprungs zu einer Kollektion.
     * Wirft einen Fehler aus wenn ein anderer Sprung bereits enthalten ist (Shift-Shift-Konflikte).
     */
    addJump(collection, symbol){
        if(this.jumps[symbol] === undefined){
            this.jumps[symbol] = [collection];
            return true;
        } else if (!this.jumps[symbol].includes(collection)) {
            this.jumps[symbol].push(collection);
            return true;
        }
        return false;
    }

    /**
     * @param  {LRElement} element welches in {@link LRCollection}} gesucht werden soll.
     * @return {Boolean} ob das Element gefunden wurde.
     * Funktion für die Suche eines Elements in den Elementen einer Kollektion.
     * Nutzt die {@link equals} Funktion von {@link LRElement}
     */
    has(element){
        let isIncluded = false;
        for (let i = 0; i < this.elements.length ; i++) {
            if(element.equals(this.elements[i])){
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }

    /**
     * @param  {LRElement} element ist das Element welches hinzugefügt werden soll.
     * Funktion für das Hinzufügen eines Elements zu einer Kollektion.
     * Beachtet die Mengeneigenschaften (Ist als Vereinigung der Elemente der Kollektion mit {element} umgesetzt).
     */
    append(element){
        if(!(this.has(element))){
            this.elements.push(element);
            return true;
        }
        return false;
    }

    /**
     * @param  {LRCollection} collection ist die Kollektion die verglichen werden soll.
     * Funktion für den Vergleich zweier Kollektionen.
     * Beachtet die Mengeneigenschaften (Ist als prüfung auf gegenseitige Inklusion umgesetzt).
     */
    equals(collection){
        for (let i = 0; i < this.elements.length; i++) {
            if(!collection.has(this.elements[i])){
                return false;
            }
        }
        for (let i = 0; i < collection.length; i++) {
            if(!this.has(collection[i])){
                return false;
            }
        }
        return true;
    }
}
/**
 * @returns {String} Ausgabe einer Kollektion.
 */
LRCollection.prototype.toString = function collectionToString() {
    if(this.isStart) return "Start: " + "(" + this.elements.toString() + "); ";
    return "(" + this.origin + ", " + this.symbol + "): " + "(" + this.elements.toString() + "); ";
};
/**
 * Klasse für die Speicherung der Zustände.
 */
class LRCollections {
    constructor(collections) {
        if(collections === undefined){
            collections = [];
        }
        this.collections = collections;
    }

    /**
     * @param  {LRCollection} collection welches in {@link Collections} gesucht werden soll.
     * @return {Boolean} ob das Element gefunden wurde.
     * Funktion für die Suche einer Kollektion in den bereits berechneten Zuständen.
     * Nutzt die {@link equals} Funktion von {@link LRCollection}}
     */
    has(collection){
        let index = -1;
        for (let i = 0; i < this.collections.length ; i++) {
            if(this.collections[i].equals(collection)){
                index = i;
                break;
            }
        }
        return index;
    }

    /**
     * @param  {LRCollection} collection ist die Kollektion die hinzugefügt werden soll.
     * Funktion für das Hinzufügen einer Kollektion zu den Zuständen.
     * Beachtet die Mengeneigenschaften (Ist als Vereinigung der Zustände mit {Kollektion} umgesetzt).
     */
    append(collection){
        let index = this.has(collection);

        if(index === -1){
            this.collections.push(collection);
            return this.collections.length - 1;
        }
        return index;
    }

    /**
     * @param  {LRCollection} collection entspricht dem Zustand zu dem gesprungen wird.
     * @param {Number} origin entspricht dem Zustand über dem die Kollektion erreicht wurde.
     * @param {String} symbol über dem der Sprung stattfindet.
     * Funktion für das Hinzufügen des Zustandes und gleichzeitig des Sprungs.
     */
    addStateAndJump(collection, origin, symbol) {
        let prevCount = this.collections.length - 1;
        let index = this.append(collection);
        let changed = false;

        if (index > prevCount) {
            changed = true;
        }
        if(this.collections[origin].addJump(index, symbol)){
            changed = true;
        }
        return changed;
    }
}
/**
 * @returns {String} Ausgabe aller Zustände
 */
LRCollections.prototype.toString = function collectionsToString() {
    return "[" + this.collections.toString() + "]"
};

/**
 * @param  {LRCollection} collection dessen Hülle berechnet werden soll.
 * @return  {LRCollection} Hülle der Kollektion
 * Hilfsfunktion für die Generierung der Zustandsmenge.
 * Berechnet die Hülle einer Kollektion.
 */
function LRClosure(collection) {
    log("                   Calculating (" , collection , ")-Closure");
    let changed = true;

    let itr = 1;

    while (changed){
        changed = false;
        log("                       " , itr , ". iteration");
        for (let i = 0; i < collection.elements.length; i++) {
            log("                           Current collection: " , collection.elements[i]);
            let nextSymbol = collection.elements[i].followingSymbol();
            if (isNT(nextSymbol)) {
                log("                               " , nextSymbol , " is nonTerminal");
                let restOfRule = [];
                for (let j = collection.elements[i].point + 1; j < collection.elements[i].rule.length; j++) {
                    restOfRule.push(collection.elements[i].rule[j])
                }
                let firstOfPrev = firstOf(restOfRule);
                if(firstOfPrev.includes(EMPTY)) {
                    for (let j = 0; j < firstOfPrev.length; j++) {
                        if(firstOfPrev[j] === EMPTY){
                            firstOfPrev.splice(i,1)
                        }
                    }
                    for (let j = 0; j < collection.elements[i].previewSymbols.length; j++) {
                        if(collection.elements[i].previewSymbols[j] === END){
                            if (!firstOfPrev.includes(END)) {
                                firstOfPrev.push(END);
                            }
                        } else {
                            for (let k = 0; k < first[collection.elements[i].previewSymbols[j]].length; k++) {
                                if (!firstOfPrev.includes(first[collection.elements[i].previewSymbols[j]][k])) {
                                    firstOfPrev.push(first[collection.elements[i].previewSymbols[j]][k])
                                }
                            }
                        }
                    }
                }
                for (let j = 0; j < productionRules.of(nextSymbol).length; j++) {
                    // let element;
                    // if(collection.elements[i].followingFollowingSymbol() !== END) {
                    let element = new LRElement(nextSymbol, productionRules.of(nextSymbol)[j], productionRules.symbolToProduction[nextSymbol][j], 0, firstOfPrev);
                    log("                               Current element: " , element);
                    // } else {
                    //     element = new LRElement(nextSymbol, productionRules.of(nextSymbol)[j], productionRules.symbolToProduction[nextSymbol][j], 0, [END]);
                    //     log("                               Current element: " , element);
                    // }
                    if (collection.append(element)) {
                        log("                               Added current element to: " , collection);
                        changed = true;
                    } else {
                        log("                               Element already contained in: " , collection);
                    }
                }
            } else {
                log("                               " , nextSymbol , " is terminal");
            }
        }
        if (changed) log ("                       Changes detected, current closure: " , collection);
        itr++;
    }
    return collection;
}

/**
 * /**
 * @param  {LRCollection} collection dessen Hülle berechnet werden soll.
 * @param {Number} origin entspricht dem Zustand über dem die Kollektion erreicht wurde.
 * @param {String} symbol über dem der Sprung stattfindet.
 * @return  {LRCollection} Sprung der Kollektion
 * Hilfsfunktion für die Generierung der Zustandsmenge.
 * Berechnet den Sprung einer Kollektion über ein Symbol durch den Aufruf von {@link LRClosure}.
 */
function LRJump(collection, origin, symbol){
    log("                   Calculating (" , collection , " ; " + symbol + ")-Jump");
    let jumps = new LRCollection([], origin, symbol);
    for (let i = 0; i < collection.elements.length; i++) {
        log("                       Current collection: " , collection.elements[i]);
        if (collection.elements[i].followingSymbol() === symbol) {
            log("                       Found symbol: " , symbol , " after \'.\' in: " , collection.elements[i]);
            let element = new LRElement(collection.elements[i].nonTerminalSymbol, collection.elements[i].rule, collection.elements[i].index, collection.elements[i].point + 1, collection.elements[i].previewSymbols);
            if (jumps.append(element)) log("                       Added: " , element);
        }
    }
    return LRClosure(jumps);
}

/**
 * Funktion für die Generierung der Zustandsmenge.
 * Generiert die Zustandsmenge unter Verwendung der zwei Hilfsfunktionen:
 * {@link LRJump}
 * {@link LRClosure}
 */
function generateLRStates() {
    log("Generating States:");
    let startingElement = new LRElement(STARTSYMBOL, STARTPRODUCTION, 0, 0,[END]);
    let collection = new LRCollection([startingElement]);
    LRClosure(collection);

    log("   Initial Collection: ", collection);
    states = new LRCollections([collection]);
    let changed = true;

    let itr = 1;

    while (changed) {
        changed = false;
        log("   " + itr + ". iteration: " , collection);
        for (let i = 0; i < states.collections.length; i++) {
            log("       Current state: " , states.collections[i]);
            for (let j = 0; j < states.collections[i].elements.length; j++) {
                log("           Current element: " , states.collections[i].elements[j]);
                if (states.collections[i].elements[j].isNotFinished()) {
                    let nextSymbol = states.collections[i].elements[j].followingSymbol();
                    log("               Following Symbol: " , nextSymbol);
                    let collection = LRJump(states.collections[i], i, nextSymbol);
                    log("               Returned Collection: " , collection);
                    if(states.addStateAndJump(collection, i, nextSymbol)){
                        log("               Appended Collection to states");
                        changed = true;
                    } else {
                        log("               Collection already contained");
                    }
                } else {
                    states.collections[i].addReduction(states.collections[i].elements[j].nonTerminalSymbol, states.collections[i].elements[j].index);
                    log("               Element is finished");
                }
            }
        }
        itr++;
    }
    log("Final States: ", states);
}

function generateLRReductions(){
    for (let i = 0; i < states.collections.length; i++) {
        log("       Current state: " , states.collections[i]);
        for (let j = 0; j < states.collections[i].elements.length; j++) {
            log("           Current element: " , states.collections[i].elements[j]);
            if (!states.collections[i].elements[j].isNotFinished()) {
                for (let k = 0; k < states.collections[i].elements[j].previewSymbols.length; k++) {
                    states.collections[i].addReduction(states.collections[i].elements[j].index, states.collections[i].elements[j].previewSymbols[k]);
                    log("               Element is finished");
                }
            }
        }
    }
}