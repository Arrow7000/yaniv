import { newDeck } from './cards';

function makeArrays(count) {
    return new Array(count)
        .fill(null)
        .map(() => []);
}

export function initGame(playerCount) {
    if (playerCount < 2 || playerCount > 10) {
        throw new Error('Please specify between 2 and 10 players');
    }

    const deck = newDeck();
    const cardsEach = Math.floor(deck.length / playerCount);
    const hands = makeArrays(playerCount)
        .map((hand, handIndex) => {
            return deck.slice(handIndex * cardsEach, (handIndex + 1) * cardsEach);
        });
    const pile = deck.slice(hands.length * cardsEach);

    const gameState = {
        hands,
        pile,
        turnIndex: 0
    };

    return gameState;
}

function sort(a, b) { return a - b; }

function takeFromHand(hand, value) {
    const newHand = hand.filter(card => {
        return card !== value;
    });

    const toPile = hand.filter(card => {
        return card === value;
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
    const toHand = pile[lastPileIndex];
    const newPile = pile.slice(0, lastPileIndex);
    return {
        toHand,
        pile: newPile
    }
}

export function turn(hand, value, pile) {
    const postTakeFromHand = takeFromHand(hand, value);
    const postTakeFromPile = takeFromPile(pile);

    const newHand = [...postTakeFromHand.hand, ...postTakeFromPile.toHand];
    const newPile = [...postTakeFromPile.pile, ...postTakeFromHand.toPile];

    return {
        hand: newHand,
        pile: newPile
    }
}
