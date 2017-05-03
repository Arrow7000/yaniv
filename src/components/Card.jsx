import React from 'react';
import { cardObjStr } from '../game/cards';

import './Card.css';

function Card(props) {
    const { card, hidden } = props;

    const { value, suit } = cardObjStr(card);

    if (hidden) {
        return (
            <div className="Card">
                \ /<br />
                / \<br />
            </div>
        );
    } else {

        return (
            <div className="Card">
                {value} {suit}<br />
                {/*\ /<br />
            / \<br />*/}
                {suit} {value}<br />
            </div>
        );
    }
}

export default Card;