import React from 'react';

const Card = (props) => {
    const {
        prefix,
        item,
        effect,
        curse,
        description,
    } = props;

    const genPrefix = (prefix) ? prefix : '';
    const genItem = item || '';
    const genEffect = effect || '';
    const genCurse = curse || '';

    const generatedItem = `${genPrefix} ${genCurse} ${genItem} ${genEffect}`;

 return (
    <> 
        <div>
            {generatedItem} 
        </div>
        <br /> <br />
        <div>
            {description}
        </div>
    </>
    );
};

export default Card;