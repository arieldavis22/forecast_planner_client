import React, { Component } from 'react';
import User from '../components/User';
import Friend from '../components/Friend';
import { Redirect } from 'react-router-dom';

class FriendList extends Component {
    state = {  
        userFriends: []
    }

    fetchFriends = () => {
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

    componentDidMount() {
        if (this.props.currentUser) {
            this.fetchFriends()
        } else {
            return <Redirect to="/"/>
        }
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
        .then(() => {
            this.fetchFriends()
        })
    }

    renderUsers = () => {
        return this.props.allUsers.map(user =>{
            if(user.name !== this.props.currentUser && !this.state.userFriends.includes(user.name)) {
                return <User key={user.name} user={user} handleFriendClick={this.handleFriendClick}/>
                } else {
                    return null
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