import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const suitIcons = ['♧', '♢', '♡', '♤'];
const royals = ['Ace', 'Jack', 'Queen', 'King'];
const royalIcons = ['A', 'J', 'Q', 'K'];


export function newDeck() {
    return shuffle(range(0, 52));
    // return range(0, 52);
}

function suitStr(suitId) {
    // return suits[suitId];
    return suitIcons[suitId];
}

function valueStr(value) {
    // const strList = royals;
    const strList = royalIcons;
    switch (value) {
        case 1:
            return strList[0];
        case 11:
            return strList[1];
        case 12:
            return strList[2];
        case 13:
            return strList[3];
        default:
            return value;
    }
}

export function cardStr(cardId) {
    const { suit, value } = getCard(cardId);
    const str = `${valueStr(value)} of ${suitStr(suit)}`;
    return str;
}

export function cardObjStr(cardId) {
    const { suit, value } = getCard(cardId);
    return {
        suit: suitStr(suit),
        value: valueStr(value)
    }
}

export function getSuit(cardId) {
    return Math.floor(cardId / 13) % 4;
}

export function getValue(cardId) {
    return (cardId % 13) + 1;
}

export function getCard(cardId) {
    return {
        suit: getSuit(cardId),
        value: getValue(cardId)
    }
}

// console.log(cards.map(cardStr));
