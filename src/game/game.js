import { newDeck, getValue } from './cards';

const cardsEach = 7;
const maxPlayers = 7;

function makeArrays(count) {
    return new Array(count)
        .fill(null)
        .map(() => []);
}

export function initGame(playerCount) {
    if (playerCount < 2 || playerCount > 7) {
        throw new Error(`Please specify between 2 and ${maxPlayers} players`);
    }

    const fullDeck = newDeck();
    // const cardsEach = Math.floor(deck.length / playerCount);
    const hands = makeArrays(playerCount)
        .map((hand, handIndex) => {
            return fullDeck.slice(handIndex * cardsEach, (handIndex + 1) * cardsEach);
        });
    const restOfDeck = fullDeck.slice(hands.length * cardsEach);
    const pile = restOfDeck.slice(0, 1);
    const deck = restOfDeck.slice(1);

    const gameState = {
        deck,
        hands,
        pile,
        turnIndex: 0
    };

    return gameState;
}

function sort(a, b) { return a - b; }

function takeFromHand(hand, value) {
    const newHand = hand.filter(card => {
        return getValue(card) !== value;
    });

    const toPile = hand.filter(card => {
        return getValue(card) === value;
    });

    return {
        hand: newHand,
        toPile
    };
}


function takeFromPile(pile) {
    if (pile.length < 1) {
        throw new Error('Pile has no cards');
    }
    const lastPileIndex = pile.length - 1;
    const toHand = [pile[lastPileIndex]];
    const newPile = pile.slice(0, lastPileIndex);
    return {
        toHand,
        pile: newPile
    }
}

function takeFromDeck(deck) {
    if (deck.length < 1) {
        throw new Error('Deck has no cards');
    }
    const toHand = [deck[0]];
    const newDeck = deck.slice(1);
    return {
        toHand,
        deck: newDeck
    }
}

export function turn(handOrig, value, deckOrig, pileOrig, takingFromDeck) {

    const { hand, toPile } = takeFromHand(handOrig, value);

    let toHand, deck, pile;
    if (takingFromDeck) {
        const step = takeFromDeck(deckOrig);
        toHand = step.toHand;
        deck = step.deck;
        pile = pileOrig;
    } else {
        const step = takeFromPile(pileOrig);
        toHand = step.toHand;
        pile = step.pile;
        deck = deckOrig;
    }

    const newHand = [...hand, ...toHand];
    const newPile = [...pile, ...toPile];
    return {
        hand: newHand,
        pile: newPile,
        deck
    }
}
