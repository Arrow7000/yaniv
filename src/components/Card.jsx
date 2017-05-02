import React from 'react';
import { cardObjStr } from '../game/cards';

function Card(props) {
    const { card, hidden } = props;

    const { value, suit } = cardObjStr(card);
    const style = {
        border: 'black solid 2px',
        display: 'inline-block'
    };

    if (!hidden) {
        return (
            <div style={style}>
                \ /<br />
                / \<br />
            </div>
        );
    } else {

        return (
            <div style={style}>
                {value} {suit}<br />
                {/*\ /<br />
            / \<br />*/}
                {suit} {value}<br />
            </div>
        );
    }
}

export default Card;