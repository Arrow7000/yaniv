import React, { Component } from 'react';
import { getValue, sort } from '../game/cards';
import { initGame, turn } from '../game/game';
import Card from './Card';

class Game extends Component {
    constructor() {
        super();

        this.state = {
            deck: [],
            hands: [],
            pile: [],
            turnIndex: null,
            deckSelected: true
        };

        this.newGame = this.newGame.bind(this);
        this.turn = this.turn.bind(this);
    }

    newGame(players) {
        this.setState(initGame(players));
    }

    turn(value, takingFromDeck) {
        const { deck, hands, pile, turnIndex } = this.state;
        const hand = hands[turnIndex];

        const newState = turn(hand, value, deck, pile, takingFromDeck);
        const newTurnIndex = turnIndex >= hands.length - 1 ? 0 : turnIndex + 1;
        const allHands = Object.assign([], hands, { [turnIndex]: newState.hand });

        this.setState({
            deck: newState.deck,
            hands: allHands,
            pile: newState.pile,
            turnIndex: newTurnIndex
        });
    }

    select(deckSelected) {
        this.setState({ deckSelected })
    }

    render() {
        const { deck, pile, hands, turnIndex, deckSelected } = this.state;
        const totalInHands = hands
            .map(hand => hand.length)
            .reduce((total, handTotal) => total + handTotal, 0);
        const totalInPile = pile.length;
        const totalInDeck = deck.length;

        return (
            <div>
                <button onClick={() => this.newGame(3)}>New Game</button>
                <h2>Hands</h2>
                {hands.map((hand, handIndex) => {
                    return (<div
                        key={handIndex}
                        style={{
                            marginBottom: '20px',
                            border: turnIndex === handIndex ? '1px solid black' : 'none'
                        }}>
                        {sort(hand).map(card => (<Card
                            onClick={() => { if (turnIndex === handIndex) { this.turn(getValue(card), deckSelected) } }}
                            key={card}
                            card={card} />))}
                    </div>)
                })}
                <p>Total cards in hands: {totalInHands}</p>
                <div onClick={() => this.select(false)}>
                    <h2>Pile</h2>
                    <div style={{ border: false === deckSelected ? '1px solid black' : 'none' }}>
                        {sort(pile).map(card => {
                            return (
                                <Card
                                    key={card}
                                    card={card} />);
                        })}
                    </div>
                    <p>Total cards in pile: {totalInPile}</p>
                </div>
                <div onClick={() => this.select(true)}>
                    <h2>Deck</h2>
                    <div style={{ border: true === deckSelected ? '1px solid black' : 'none' }}>
                        {sort(deck).map(card => {
                            return (
                                <Card
                                    key={card}
                                    card={card}
                                    hidden={true} />);
                        })}
                    </div>
                    <p>Total cards in deck: {totalInDeck}</p>
                </div>
                <h3>Total cards: {totalInHands + totalInPile + totalInDeck}</h3>
            </div>
        );
    }
}

export default Game;
