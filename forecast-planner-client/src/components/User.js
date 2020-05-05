import React from 'react';
import {Card, Button} from 'semantic-ui-react'

const User = (props) => {
    const friend = props.user.name
    return (  
        <Card>
            <Card.Header>{friend}</Card.Header>
            <Button float='right' color='#264D59' onClick={() => props.handleFriendClick(friend)}>Friend!</Button>
        </Card>
    );
}

export default User;