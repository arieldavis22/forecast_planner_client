import React from 'react';

const User = (props) => {
    const friend = props.user.name
    return (  
        <div>
            <p>{friend}</p>
            <button onClick={() => props.handleFriendClick(friend)}>Friend!</button>
        </div>
    );
}

export default User;