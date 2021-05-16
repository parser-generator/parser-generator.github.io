/**
 * onClick-Funktion für den geregelten Aufruf der Berechnungsfuntkionen.
 * Führt die Berechnung der Parser-Tabelle durch den Aufruf der folgenden Funktionen aus:
 * {@link getStartproduction} und {@link getInput} für die Eingabe-Verarbeitung.
 * {@link generateFirsts} für die First-Berechnung.
 * {@link lrGenerateStates} für die Zustandsberechnung.
 * Färbt den Knopf rot bei Fehlern in der Berechnung oder in der Grammatik.
 */
function ParseLRGrammar() {
    hideFirst();
    // try {
        getStartproduction();
        getInput();
        log("Terminals: " , terminals.symbols);
        log("NTS: " , nonTerminals.symbols);
        log("Production Rules:");
        log(productionRules);


        first = new FirstSet();
        generateFirsts();
        checkFirsts();
        showFirst();

        follow = new FollowSet();
        generateFollow();

        generateLRStates();
        generateLRReductions();
    // } catch (e) {
    //     document.getElementById("parse-grammar-button").style.backgroundColor = errorColor;
    // }
}
