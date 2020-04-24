import React, { Component } from 'react';
import global from '../../../../../../providers/global.static.jsx';

import IconFlag from "../../../../../icons/svg_bandera.svg";
import IconHat from "../../../../../icons/svg_sombrero.svg";
import IconHeart from "../../../../../icons/svg_corazon.svg";

class Phrases extends Component{
    constructor(props){
        super(props);
        this.state={
            dataPhrases:this.props.phrases
        };
        this.icons = [<IconFlag />, <IconHat />, <IconHeart />];
    };
    render(){
        return(
            <div className="phrases">
                {
                    (()=>{
                            var element = this.state.dataPhrases.map((el,i) => {
                            return(
                                <div className="phrase_item" key={el.id}>
                                    <div className="icon_phrase">
                                    {
                                        this.icons[i]
                                    }
                                    </div>
                                    <div>
                                        <div className="title_phrase">
                                            <span>
                                                {el.title}
                                            </span>
                                        </div>
                                        <div className="text_phrase">
                                            <span>
                                                {el.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        return element;
                    })()
                }
            </div>
        )
    }
}
export default Phrases;