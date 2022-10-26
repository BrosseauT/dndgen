import React, { useEffect, useState } from 'react';
import Card from './card';

const Repository = (props) => {
const {allItems} = props;   
const [showCards, setShowCards] = useState(false);



    return (
        <div>
            { (allItems.length > 1) 
            
                ? allItems.slice(1).forEach((item) => {
                    return (
                        <Card
                            prefix={item.prefix}
                            item={item.item}
                            curse={item.curse}
                            effect={item.effect}
                        />
                    )
                })
                : 'Previously generated items will display here'}
        </div>
    );
};

export default Repository;