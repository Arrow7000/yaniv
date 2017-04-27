import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const royals = ['Ace', 'Jack', 'Queen', 'King'];


export function newDeck() {
    return shuffle(range(0, 52));
    // return range(0, 52);
}

function suitStr(suitId) {
    return suits[suitId];
}

function valueStr(value) {
    switch (value) {
        case 1:
            return royals[0];
        case 11:
            return royals[1];
        case 12:
            return royals[2];
        case 13:
            return royals[3];
        default:
            return value;
    }
}

export function cardStr(cardId) {
    const { suit, value } = getCard(cardId);
    const str = `${valueStr(value)} of ${suitStr(suit)}`;
    return str;
}

export function getSuit(cardId) {
    return Math.floor(cardId / 13) % 4;
}

export function getValue(cardId) {
    return (cardId % 13) + 1;
}

function getCard(cardId) {
    return {
        suit: getSuit(cardId),
        value: getValue(cardId)
    }
}

// console.log(cards.map(cardStr));
