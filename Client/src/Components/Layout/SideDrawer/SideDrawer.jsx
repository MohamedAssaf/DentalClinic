import React from 'react';
import kmdcLogo from '../../../Assets/kmdc.png';
import homeLogo from '../../../Assets/home.png';
import {getCurrentComponent} from '../../../Common/ComponentIdentifier/ComponentIdentefierFromUrl';
import './SideDrawer.css';



const sideDrawer = props => {
    let drawerClasses = ['side-drawer']
    if(props.show){
        drawerClasses = [...drawerClasses, 'open']
    }
    let activeComponent = getCurrentComponent();
    return (
        <div className={drawerClasses.join(' ')}>
            <h1 className='side-drawer-header'>
                KMDC Dashboard
            </h1>
            <nav >
                <ul>
                    <li className={activeComponent === "home" ? "side-drawer-active" : ""}>
                        <a href="/" className={activeComponent === "home" ? "side-drawer-active" : ""} > <img src={homeLogo} width="25" className="side-drawer-nav-icon" alt="Home Logo"/>Home </a>
                    </li>
                </ul>
            </nav>
            <img src={kmdcLogo} className="side-drawer-logo" width="200" alt="Com-Iot Logo" />
        </div>
    )
}

export default sideDrawer;