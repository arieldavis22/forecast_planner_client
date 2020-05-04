import React, { Component } from 'react';
import User from '../components/User';
import Friend from '../components/Friend';

class FriendList extends Component {
    state = {  
        userFriends: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/seefriends', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUser: this.props.currentUser
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                throw r
            }
        })
        .then(data => {
            this.setState({
                userFriends: data
            })
        })
        .catch(error => console.log(error))
    }

    handleFriendClick = (friend) => {
        fetch('http://localhost:3000/addfriend', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUser: this.props.currentUser,
                friend: friend
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    renderUsers = () => {
        return this.props.allUsers.map(user =>{
            if(user.name !== this.props.currentUser) {
                return <User key={user.name} user={user} handleFriendClick={this.handleFriendClick}/>
                }
            }
        )
    }

    renderFriends = () => {
        return this.state.userFriends.map(friend => 
            <Friend key={friend} friend={friend}/>
        )
    }

    render() { 
        return (  
            <div>
                <h1>Friend List</h1>
                {this.renderFriends()}
                <h1>All Users</h1>
                {this.renderUsers()}
            </div>
        );
    }
}

export default FriendList;