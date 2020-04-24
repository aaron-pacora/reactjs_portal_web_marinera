import React, { Component } from 'react';
import global from '../../../../../../providers/global.static.jsx';

class Title extends Component {
    constructor(){
        super();
        
    }   
    render() {
        return (
            <div className="content_title">
                <h1 className="title">
                    Calendario de Concursos
                </h1>
                <hr className="space_bar"/>
                <span className="description">
                    Concursos a nivel Nacional e Internacional
                </span>
            </div>

        );
    }
}

export default Title;