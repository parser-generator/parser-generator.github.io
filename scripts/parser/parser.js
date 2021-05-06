/**
 * onClick-Funktion für den geregelten Aufruf der Berechnungsfuntkionen.
 * Führt die Berechnung der Parser-Tabelle durch den Aufruf der folgenden Funktionen aus:
 * {@link getStartproduction} und {@link getInput} für die Eingabe-Verarbeitung.
 * {@link generateFirsts} und {@link generateFollow} für die First- und Follow-Berechnung.
 * {@link generateStates} für die Zustandsberechnung.
 * Färbt den Knopf rot bei Fehlern in der Berechnung oder in der Grammatik.
 */
function parseGrammar() {
    hideFirst();
    try {
        getStartproduction();
        getInput();
        log("Terminals: " + terminals.symbols);
        log("NTS: " + nonTerminals.symbols);
        log("Production Rules:");
        log(productionRules);


        first = new FirstSet();
        generateFirsts();
        checkFirsts();
        showFirst();

        follow = new FollowSet();
        generateFollow();

        generateStates();

        console.log(terminals);
        console.log(nonTerminals);
        console.log(productionRules);
        console.log(first);
        console.log(follow);
        console.log(states);
    } catch (e) {
          document.getElementById("parse-grammar-button").style.backgroundColor = errorColor;
    }
}
