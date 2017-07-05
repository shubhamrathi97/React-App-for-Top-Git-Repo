import React, { Component } from 'react';

class Modal extends Component {
    render(){
        return(
            <div style={{
                position:"absolute",
                z-index:10,
                top: 0px,
            }}>
                <h1>Somedata</h1>
            </div>
        );
    }
}

export Modal;