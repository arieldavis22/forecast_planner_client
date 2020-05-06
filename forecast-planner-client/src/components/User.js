import React from 'react';
import {Card, Button} from 'semantic-ui-react'

const User = (props) => {
    const friend = props.user.name
    return (  
        <Card>
            <Card.Header as='h3' textAlign="center">{friend}</Card.Header>
            <Button className="dark-blue" floated='right' onClick={() => props.handleFriendClick(friend)}>Add</Button>
        </Card>
    );
}

export default User;