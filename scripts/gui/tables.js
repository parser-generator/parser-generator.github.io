/**
 * showTables erzeugt und zeigt die Zustands- und Parsertabelle.
 * Die Generierung erfolgt durch durch entsprechende Funktionsaufrufe von {@link createStateTable} und {@link createParseTable}.
 */
function showTables() {
    createStateTable();
    createParseTable();
    document.getElementById("third-row").style.visibility = "visible";
    let popup = document.getElementById("help-" + step);
    popup.classList.remove("show");
    step++;
}

/**
 * createStateTable erstellt und befüllt die Zustandstabelle.
 */
function createStateTable(){
    let div = document.getElementById("state-table-container");
    let table = document.createElement("table");

    let tableHead = document.createElement("tr");
        let state = document.createElement("td");
            state.appendChild(document.createTextNode("Zustand"));
            state.classList.add("thickBorderCell");
            state.classList.add("headerCell");
            state.classList.add("leftCell");
            state.classList.add("topCell");
        tableHead.appendChild(state);
    table.appendChild(tableHead);

    let tableBody = document.createElement("tr");
        let elements = document.createElement("td");
            elements.appendChild(document.createTextNode("Elemente"));
            elements.classList.add("thickBorderCell");
            elements.classList.add("leftCell");
            elements.classList.add("bottomCell");
        tableBody.appendChild(elements);
    table.appendChild(tableBody);

    for (let i = 0; i < states.collections.length; i++) {
        let stateCell = document.createElement("td");
            stateCell.classList.add("headerCell");
            stateCell.classList.add("topCell");

            if(i === 0) stateCell.classList.add("leftCell");
            if(i === states.collections.length - 1) stateCell.classList.add("rightCell");

            let spanNode = document.createElement("span");
                spanNode.innerHTML = "I<sub>" + i + "</sub> = " + (states.collections[i].isStart ? "Hülle(Startregel)" : ("Sprung" + "(" + "I<sub>" + states.collections[i].origin + "</sub>; \'" + states.collections[i].symbol + "\')"));
            stateCell.appendChild(spanNode);
        tableHead.appendChild(stateCell);

        let elementsCell = document.createElement("td");
            elementsCell.classList.add("bottomCell");
            if(i === 0) elementsCell.classList.add("leftCell");
            if(i === states.collections.length - 1) elementsCell.classList.add("rightCell");

            let elementSpanNode = document.createElement("span");
                elementSpanNode.innerHTML = states.collections[i].elements[0];

                for (let j = 1; j < states.collections[i].elements.length; j++) {
                    elementSpanNode.innerHTML += "<br>" + states.collections[i].elements[j];
                }
            elementsCell.appendChild(elementSpanNode);
        tableBody.appendChild(elementsCell);
    }
    div.appendChild(table);
}

/**
 * Diese Funktion erstellt eine leere Parsertabelle.
 * Nur die Headerzeilen und die erste Spalte sind befüllt.
 * Die Zellen sind bearbeitbar und durch zwei Buttons über der Tabelle kann der Nutzer seine Eingabe korrigieren lassen.
 */
function createParseTable(){
    let div = document.getElementById("parse-table-container");
    let table = document.createElement("table");
    let pseudoTerminals = new Symbols();
    for (let i = 0; i < terminals.symbols.length; i++) {
        if(terminals.symbols[i] !== EMPTY) pseudoTerminals.append(terminals.symbols[i]);
    }

    let firstTableHead = document.createElement("tr");
        let emptyCell = document.createElement("td");
            firstTableHead.appendChild(emptyCell);
            emptyCell.classList.add("thickBorderCell");
            emptyCell.classList.add("topCell");
            emptyCell.classList.add("leftCell");
        let action = document.createElement("td");
            action.appendChild(document.createTextNode("Aktion"));
            action.colSpan = pseudoTerminals.symbols.length + 1;
            action.classList.add("thickBorderCell");
            action.classList.add("topCell");
        firstTableHead.appendChild(action);
        let jump = document.createElement("td");
            jump.appendChild(document.createTextNode("Sprung"));
            jump.colSpan = nonTerminals.symbols.length - 1;
            jump.classList.add("topCell");
            jump.classList.add("rightCell");
        firstTableHead.appendChild(jump);
    table.appendChild(firstTableHead);

    let secondTableHead = document.createElement("tr");
        let state = document.createElement("td");
            state.appendChild(document.createTextNode("Zustand"));
            state.classList.add("thickBorderCell");
            state.classList.add("headerCell");
            state.classList.add("leftCell");
        secondTableHead.appendChild(state);
        for (let i = 0; i < pseudoTerminals.symbols.length; i++) {
            let nonTerminalCell = document.createElement("td");
                nonTerminalCell.appendChild(document.createTextNode(pseudoTerminals.symbols[i]));
                nonTerminalCell.classList.add("headerCell");
            secondTableHead.appendChild(nonTerminalCell);
        }
        let nonTerminalCell = document.createElement("td");
            nonTerminalCell.appendChild(document.createTextNode("$"));
            nonTerminalCell.classList.add("thickBorderCell");
            nonTerminalCell.classList.add("headerCell");
        secondTableHead.appendChild(nonTerminalCell);
        for (let i = 1; i < nonTerminals.symbols.length; i++) {
            let terminalCell = document.createElement("td");
                terminalCell.appendChild(document.createTextNode(nonTerminals.symbols[i]));
                if(i === nonTerminals.symbols.length - 1) terminalCell.classList.add("rightCell");
                terminalCell.classList.add("headerCell");
            secondTableHead.appendChild(terminalCell);
        }
    table.appendChild(secondTableHead);

    let tableBody = document.createElement("tbody");
        tableBody.id = "parse-table-body";
        for (let i = 0; i < states.collections.length; i++) {
            let tableRow = document.createElement("tr");
                for (let j = 0; j <= pseudoTerminals.symbols.length + nonTerminals.symbols.length; j++) {
                    let cell = document.createElement("td");
                        if(j === 0 || j === pseudoTerminals.symbols.length) cell.classList.add("thickBorderCell");
                        if(j === pseudoTerminals.symbols.length + nonTerminals.symbols.length) cell.classList.add("rightCell");
                        if(i === states.collections.length - 1) cell.classList.add("bottomCell");
                        if(j === 0){
                            cell.classList.add("leftCell");
                            let spanNode = document.createElement("span");
                                spanNode.innerHTML = "I<sub>" + i + "</sub>";
                            cell.appendChild(spanNode);
                        } else cell.contentEditable = "true";
                    tableRow.appendChild(cell);
                }
            tableBody.appendChild(tableRow);
        }
    table.appendChild(tableBody);

    div.appendChild(table);
}
