import React, { useEffect, useState } from 'react';
import Card from './card';

const Repository = (props) => {
const {allItems} = props;   
const [showCards, setShowCards] = useState(false);

// useEffect(() => {
//     allItems.forEach((item) => {
//         console.log(item);
//     });
// }, [props]);

    return (
        <div>
            { (allItems.length > 0) 
            
                ? allItems.map((item) => (
                       <> <Card
                            prefix={item.prefix}
                            item={item.item.title[0]}
                            curse={item.curse}
                            effect={item.effect}
                            description={item.description}
                        />
                        <br/> 
                        </>
                    )
                )
                : 'Previously generated items will display here'}
        </div>
    );
};

export default Repository;