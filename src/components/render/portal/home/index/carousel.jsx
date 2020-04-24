import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

class Carousel extends Component {
    componentDidMount(){
        // this.setState({ runslider: true });
        this.sliderrun();
    }
    constructor(props){
        super(props);
        this.state={
            cover : this.props.cover_page,
            runslider: true,
            src_logo : this.props.src_logo
            // sliderrun :this.sliderrun.bind(this)
        }
    };
    sliderrun() {
        if (this.state.runslider) {
            $(document).ready(function () {
                $('.slider').slider();
            });
        }
    };
    render(){
        return (
            <div className="slider_image">
                <div className="slider">
                    <ul className="slides">
                        {
                            (()=>{
                                var element = this.state.cover.map((el) => {
                                    return (
                                        <li key={el.id}>
                                            <img src={global.URBBASERESOURCE+"/img_cover/"+el.id.replace(/-/g,"")+el.src} alt="Imagen de Portada sobre marinera"/>
                                        </li>
                                    )
                                });
                                return element;
                            })()
                        }
                    </ul>
                </div> 
                <div className="text_logo">
                    <div className="image_text">
                        <img src={global.URBBASERESOURCE + "/sources/cover_text.png"} alt="Texto del nombre de Valores y Sentimiento"/>
                    </div>
                    <div className="image_logo">
                        <img src={global.URBBASERESOURCE + "/logo/logo" + this.state.src_logo} alt="Logo de Valores y Sentimiento" />
                    </div>
                </div>
            </div>
            )
        }
    }
export default Carousel;