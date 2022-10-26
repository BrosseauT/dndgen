import React from 'react';

const Card = (props) => {
    const {
        prefix,
        item,
        effect,
        curse,
    } = props;

    const genPrefix = (prefix) ? prefix : '';
    const genItem = item || '';
    const genEffect = effect || '';
    const genCurse = curse || '';

    const generatedItem = `${genPrefix} ${genCurse} ${genItem} ${genEffect}`;

 return (
    <div> 
        {generatedItem}
    </div>
    );
};

export default Card;