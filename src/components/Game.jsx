import React, { Component } from 'react';
import { newDeck, cardStr } from '../game/cards';
import { initGame, turn } from '../game/game';

class Game extends Component {
    constructor() {
        super();

        this.state = {
            hands: [],
            pile: [],
            turnIndex: null
        };

        this.newGame = this.newGame.bind(this);
    }

    newGame(players) {
        this.setState(initGame(players));
    }

    turn(value) {
        const { hands, pile, turnIndex } = this.state;
        const newState = turn(hands[turnIndex], value, pile);
        const newTurnIndex = turnIndex >= gameState.hands.length ? turnIndex + 1 : 0;

        this.setState({
            hands: [...hands, [turnIndex]: newState.hand],
            pile: newState.pile,
            turnIndex: newTurnIndex
        });
    }

    render() {
        const { hands } = this.state;
        return (
            <div>
                {hands.map((hand, handIndex) => {
                    return (<div key={handIndex} style={{ marginBottom: '20px' }} >
                        {
                            hand.map(card => {
                                return (<div key={card} style={{ display: 'inline-block', marginRight: '15px' }}>{cardStr(card)}</div>);
                            })
                        }
                    </div>)
                })}
                <button onClick={() => this.newGame(3)}>New Game</button>
            </div>
        );
    }
}

export default Game;
