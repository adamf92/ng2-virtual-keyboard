export interface IQwertyKey {
    number?: number;
    lowerCase?: string;
    upperCase?: string;
    alter?: string;
    alterUpper?: string;
    special?: string;
}

export interface IQwertyKeysLine {
    line: string;
    keys: IQwertyKey[];
}

export interface IQwertyKeyboard {
    numberLine: IQwertyKeysLine;
    topLine: IQwertyKeysLine;
    middleLine: IQwertyKeysLine;
    bottomLine: IQwertyKeysLine;
    actionLine: IQwertyKeysLine;
}

export interface ICustomKeyboard {
    topLine: ICustomKey[];
    middleLine: ICustomKey[];
    bottomLine: ICustomKey[];
}


export interface ICustomKey {
    lowerCase: string;
    upperCase: string;
    alter?: string;
    alterUpper?: string;
}

export const QWERTY_KEYBOARD: IQwertyKeyboard = {
    numberLine: {
        line: 'numberLine',
        keys: [
            { number: 1, upperCase: '!' },
            { number: 2, upperCase: '@' },
            { number: 3, upperCase: '#' },
            { number: 4, upperCase: '$' },
            { number: 5, upperCase: '%' },
            { number: 6, upperCase: '^' },
            { number: 7, upperCase: '&' },
            { number: 8, upperCase: '*' },
            { number: 9, upperCase: '(' },
            { number: 0, upperCase: ')' },
            { lowerCase: '-', upperCase: '_' },
            { lowerCase: '=', upperCase: '+' },
            { special: 'backspace' },
        ]
    },
    topLine: {
        line: 'topLine',
        keys: [
            { special: 'tab' },
            { lowerCase: 'q', upperCase: 'Q' },
            { lowerCase: 'w', upperCase: 'W' },
            { lowerCase: 'e', upperCase: 'E', alter: 'ę', alterUpper: 'Ę' },
            { lowerCase: 'r', upperCase: 'R' },
            { lowerCase: 't', upperCase: 'T' },
            { lowerCase: 'y', upperCase: 'Y' },
            { lowerCase: 'u', upperCase: 'U' },
            { lowerCase: 'i', upperCase: 'I' },
            { lowerCase: 'o', upperCase: 'O', alter: 'ó', alterUpper: 'Ó' },
            { lowerCase: 'p', upperCase: 'P' },
            { lowerCase: '[', upperCase: '{' },
            { lowerCase: ']', upperCase: '}' },
            { lowerCase: '\\', upperCase: '|' },
        ]
    },
    middleLine: {
        line: 'middleLine',
        keys: [
            { special: 'caps-lock' },
            { lowerCase: 'a', upperCase: 'A', alter: 'ą', alterUpper : 'Ą' },
            { lowerCase: 's', upperCase: 'S', alter: 'ś', alterUpper: 'Ś' },
            { lowerCase: 'd', upperCase: 'D' },
            { lowerCase: 'f', upperCase: 'F' },
            { lowerCase: 'g', upperCase: 'G' },
            { lowerCase: 'h', upperCase: 'H' },
            { lowerCase: 'j', upperCase: 'J' },
            { lowerCase: 'k', upperCase: 'K' },
            { lowerCase: 'l', upperCase: 'L', alter: 'ł', alterUpper: 'Ł' },
            { lowerCase: ';', upperCase: ':' },
            { lowerCase: '\'', upperCase: '"' },
            { special: 'enter' },
        ]
    },
    bottomLine: {
        line: 'bottomLine',
        keys: [
            { special: 'l-shift' },
            { lowerCase: 'z', upperCase: 'Z', alter: 'ż', alterUpper: 'Ż' },
            { lowerCase: 'x', upperCase: 'x', alter: 'ź', alterUpper: 'Ź' },
            { lowerCase: 'c', upperCase: 'C', alter: 'ć', alterUpper: 'Ć' },
            { lowerCase: 'v', upperCase: 'V' },
            { lowerCase: 'b', upperCase: 'B' },
            { lowerCase: 'n', upperCase: 'N', alter: 'ń', alterUpper: 'Ń' },
            { lowerCase: 'm', upperCase: 'M' },
            { lowerCase: ',', upperCase: '<' },
            { lowerCase: '.', upperCase: '>' },
            { lowerCase: '/', upperCase: '?' },
            { special: 'r-shift' },
        ]
    },
    actionLine: {
        line: 'actionLine',
        keys: [
            { special: 'l-alt' },
            { special: 'space' },
            { special: 'r-alt' },
            { special: 'left' },
            { special: 'right' }
        ]
    }
};
