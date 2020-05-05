import React from 'react';
import {Card} from 'semantic-ui-react'

const Friend = (props) => {
    return (  
        <Card>
            <Card.Header as='h3'>{props.friend}</Card.Header>
        </Card>
    );
}

export default Friend;