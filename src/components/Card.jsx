import React, { Component } from 'react';
import { cardObjStr } from '../game/cards';

import './Card.css';

class Card extends Component {
    render() {
        const { card, hidden, onClick } = this.props;
        const { value, suit } = cardObjStr(card);

        function content(hidden) {
            return hidden ?
                (<div>
                    \ /<br />
                    / \<br />
                </div>) : (<div>
                    {value} {suit}<br />
                    {suit} {value}<br />
                </div>);

        }

        return (
            <div className="Card" onClick={onClick}>
                {content(hidden)}
            </div>
        );
    }
}

export default Card;