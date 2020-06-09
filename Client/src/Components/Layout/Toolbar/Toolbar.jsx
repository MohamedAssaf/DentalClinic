import React from 'react';
import ToggleButton from '../SideDrawer/DrawerToggleButton';
import userLogo from '../../../Assets/userIcon.png';
import './Toolbar.css';

const toolbar = (props) => {
    return (
        <header className="toolbar">
            <nav className="toolbar-navigation">
                <div className="toggle-drawer-button">
                    <ToggleButton click = {props.drawerClickHandler}/>
                </div>
                <div className="toolbar-logo">
                    <a href="/"> Component Name</a>
                </div>
                <div className ="spacer">

                </div>
                <div className="toolbar-navigation-items">
                    <ul>
                        <li>
                            <h6>
                                Hi, User Name!
                            </h6>
                        </li>
                        <li>
                            <a href="/user">
                                <img src={userLogo} className="toolbar-user-logo" alt="user logo" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default toolbar;