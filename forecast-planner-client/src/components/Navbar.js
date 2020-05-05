import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'


export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleLogout = () => {
        fetch('http://localhost:3000/logout', {
            method: "POST",
            credentials: 'include'
        })
        .then(r => r.json())
        .then(() => {
            this.props.logout()
            this.props.history.push("/")
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    menuClickAndLogout = (e, {name}) => {
        this.handleItemClick(e, name)
        this.handleLogout()
    }

    render() {
        const { activeItem } = this.state

        return (  
            <Menu secondary>
                <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                as={NavLink} to='/' exact
                />
                {this.props.currentUser ? (
                    <>
                    {/* <NavLink to="/friends" exact>Friends List</NavLink> */}
                    <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={this.handleItemClick}
                    as={NavLink} to='/friends' exact
                    />
                    <Menu.Item
                    name='log out'
                    active={activeItem === 'log out'}
                    onClick={this.menuClickAndLogout}
                    position={'right'}
                    />
                    </>
                ) : (
                <>
                    <Menu.Item
                        name='log in'
                        active={activeItem === 'log in'}
                        onClick={this.handleItemClick}
                        as={NavLink} to='/login' exact
                    />
                    <Menu.Item
                        name='sign up'
                        active={activeItem === 'sign up'}
                        onClick={this.handleItemClick}
                        as={NavLink} to='/signup' exact
                    />
                </>
                )}
                
            </Menu>
        );
    }
    
}



// import React, { Component } from 'react'
// import { Input, Menu } from 'semantic-ui-react'

// export default class MenuExampleSecondary extends Component {
//     state = { activeItem: 'home' }

//     handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//     render() {
//         const { activeItem } = this.state

//         return (
//         <Menu secondary>
//             <Menu.Item
//             name='home'
//             active={activeItem === 'home'}
//             onClick={this.handleItemClick}
//             />
//             <Menu.Item
//             name='messages'
//             active={activeItem === 'messages'}
//             onClick={this.handleItemClick}
//             />
//             <Menu.Item
//             name='friends'
//             active={activeItem === 'friends'}
//             onClick={this.handleItemClick}
//             />
//             <Menu.Menu position='right'>
//             <Menu.Item>
//                 <Input icon='search' placeholder='Search...' />
//             </Menu.Item>
//             <Menu.Item
//                 name='logout'
//                 active={activeItem === 'logout'}
//                 onClick={this.handleItemClick}
//             />
//             </Menu.Menu>
//         </Menu>
//         )
//     }
// }