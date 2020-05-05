import React, { Component } from 'react';
import User from '../components/User';
import Friend from '../components/Friend';
import { Redirect } from 'react-router-dom';
import { seeFriends, addFriends } from '../FetchData';
import { Card } from 'semantic-ui-react'

class FriendList extends Component {
    state = {  
        userFriends: []
    }

    fetchFriends = () => {
        seeFriends(this.props.currentUser)
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
        this.fetchFriends()
            return <Redirect to="/"/>
    }

    handleFriendClick = (friend) => {
        addFriends(this.props.currentUser, friend)
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
            <>
            { !this.props.currentUser ? <Redirect to="/"/> : null }
            <div className='home'>
                <div className='side'></div>
                <div className='main-panel'>
                <h1>Friend List</h1>
                <Card.Group itemsPerRow={4}>{this.renderFriends()}</Card.Group>
                <h1>All Users</h1>
                <Card.Group itemsPerRow={4}>{this.renderUsers()}</Card.Group>
                </div>
            </div>
            </>
            
        );
    }
}

export default FriendList;