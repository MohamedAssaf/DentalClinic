import React from 'react';
import comiotLogo from '../../../Assets/Logo.png';
import statisticsLogo from '../../../Assets/statistics.png';
import homeLogo from '../../../Assets/home.png';
import sirenLogo from '../../../Assets/siren.png';
import countersLogo from '../../../Assets/counters.png';
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
                TRC Dashboard
            </h1>
            <nav >
                <ul>
                    <li className={activeComponent === "home" ? "side-drawer-active" : ""}>
                        <a href="/" className={activeComponent === "home" ? "side-drawer-active" : ""} > <img src={homeLogo} width="25" className="side-drawer-nav-icon" alt="Home Logo"/>Home </a>
                    </li>
                    <li className={activeComponent === "violations" ? "side-drawer-active" : ""}>
                        <a href="/violations" className={activeComponent === "violations" ? "side-drawer-active" : ""}> <img src={sirenLogo} width="25" className="side-drawer-nav-icon" alt="Violations Logo"/>Violations </a>
                    </li>
                    <li className={activeComponent === "statistics" ? "side-drawer-active" : ""}>
                        <a href="/statistics" className={activeComponent === "statistics" ? "side-drawer-active" : ""}> <img src={statisticsLogo} width="25" className="side-drawer-nav-icon" alt="Stats Logo"/>Statistics </a>
                    </li>
                    <li className={activeComponent === "counters" ? "side-drawer-active" : ""}>
                        <a href="/counters" className={activeComponent === "counters" ? "side-drawer-active" : ""}> <img src={countersLogo} width="25" className="side-drawer-nav-icon" alt="Stats Logo"/>Counters </a>
                    </li>
                </ul>
            </nav>
            <img src={comiotLogo} className="side-drawer-logo" width="200" alt="Com-Iot Logo" />
        </div>
    )
}

export default sideDrawer;