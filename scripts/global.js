/**
 *  Options: ALL = All; OBJECTS = Objects; NONE = None
 */
let logging = "NONE";


let EMPTY = "-";
let STARTSYMBOL = "S\'";
let STARTPRODUCTION = ["S"];

let terminals;
let nonTerminals;
let productionRules;

let first;
let follow;

let states;

let step = 1;

let errorColor = "#DE2B49";
let warningColor = "#F0852D";
let correctColor = "#72A267";