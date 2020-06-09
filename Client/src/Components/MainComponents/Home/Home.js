import React from 'react';
import {helloSocket } from '../../../Common/SocketIO/SocketIOService';
export default function () {
    helloSocket()
    return(
        <h1>
            Hey Man from Mano
        </h1>
    )
}