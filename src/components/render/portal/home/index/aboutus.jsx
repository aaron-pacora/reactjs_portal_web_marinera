import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

class AboutUs extends Component{
    constructor(props){
        super(props);
        this.state={
            dataAbout : this.props.about,
            count     : this.props.count
        }
    }   
    componentDidMount(){
        $(document).ready(function () {
            $('.scrollspy').scrollSpy();
        });
    }
    render(){
        return(
            <div className="about_portal">
                <div className="col s12 m7">
                    <div className="card horizontal large">
                        <div className="card-image">
                            <img src={global.URBBASERESOURCE +"/sources/target_billy.jpg"} alt="Billy con su escudo de campeón"/>
                        </div>
                        {
                            (() => {
                                if (this.state.count != '0') {
                                    return (
                                        <div className="card-stacked">
                                            <div className="card-content">
                                                <h1>Sobre Nosotros</h1>
                                                <p>{this.state.dataAbout[0].about_us}</p>
                                                <p>¿Desea saber más sobre nosotros?</p>
                                                <a href="#footer">
                                                    <button id="boton pulse">
                                                        Registrate
                                                    </button>
                                                </a>
                                            </div>
                                            {/* <div className="card-action">
                                                <a href="sobre_nosotros">Saber más</a>
                                            </div> */}
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div></div>
                                    )
                                }
                            })()
                        }  
                    </div>
                    {
                        (()=>{
                            $(document).ready(($) =>{
                                this.onResize();
                                $(window).resize(()=>{
                                    this.onResize();
                                });
                                
                            });
                        })()
                    }
                </div>
            </div>
        )
    }

    onResize(){
        let ventana_ancho = $(window).width();
        let card = $('.card');
        if (ventana_ancho <= 750) {
            card.removeClass('horizontal');
            card.removeClass('large');
            card.addClass('vertical');
        }else {
            card.removeClass('vertical');
            card.removeClass('large');
            card.addClass('horizontal');
            card.addClass('medium');
        }
    }
}
export default AboutUs