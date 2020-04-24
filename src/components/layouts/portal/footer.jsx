import React, { Component } from 'react';

import global from '../../../../providers/global.static.jsx';
import IconFb from '../../../icons/socials/svg_facebook.svg';

import Utils from '../../../util/utils';

class Footer extends Component {
    constructor(){
        super();
        this.utils = new Utils();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            sponsors : []
        }
    }
    componentDidMount() {
        this.fetchSponsor()
    }
    
    keyUpStatus(event) {
        return !!event.target.value.trim();
    }

    onSubmit(e){
        e.preventDefault();
        if (this.name.value != "" && this.email.value != "") {
            var data = new FormData();
            data.append('name', this.name.value);
            data.append('email', this.email.value);
            data.append('description', "");
            this.utils.doQuery("/contact_portal/create",data)
            .then((response)=>{
                switch (response) {
                    case "":
                        var $toastContent = $('<span>Usted ya se encuentra registrado</span>');
                        Materialize.toast($toastContent, 6000);
                        break;
                    case true:
                        var $toastContent = $('<span>Su mensaje fue enviado</span>');
                        Materialize.toast($toastContent, 6000);
                        break;
                    case false:
                        var $toastContent = $('<span>Hubo un erro al enviar los datos</span>');
                        Materialize.toast($toastContent, 6000);
                        break;
                }
            });
        } else {
            var $toastContent = $('<span>Debe llenar todos los campos</span>');
            Materialize.toast($toastContent, 6000);
        }
        this.name.value = "";
        this.email.value = "";
    }
    fetchSponsor(){
        this.utils.doQuery("/sponsor/index")
        .then((response) => {
            this.setState({
                sponsors: response
            })
        });
    }
    render(){
        return(
            <div className="content_footer_portal">
                
                <div className="footer section scrollspy" id="footer">
                    <div className="sponsors_container">
                        {
                            this.state.sponsors
                            .filter((element)=> element.src!="empty")
                            .map((element)=>{
                                element.link=element.link.trim();
                                return <a className="content_img" 
                                            href={/^http(|s):\/\//.test(element.link)
                                                    &&validator.isURL(element.link)
                                                    ?
                                                        element.link
                                                        :"http://"+element.link} 
                                            target="_blank">
                                            <img className="img" 
                                                    src={global.URBBASERESOURCE+"/sponsors/"+this.clearUUID(element.id)+element.src} 
                                                    alt="img_sponsor_err"/>
                                        </a>
                                        
                            })
                        }
                    </div>
                    <div className="title">
                        <span>Déjanos tu nombre y tu correo para recibir el mejor contenido de nuestra academia.</span>
                    </div>
                    <form onSubmit={this.onSubmit} className="form">
                        <input  type="text"
                                id = "footer_input_name" 
                                placeholder="Nombre"  
                                className="inputFooter"
                                ref={(input) => { this.name = input; }}/>
                        <input type="email" placeholder="Correo Electrónico" className="inputFooter"
                                ref={(input) => { this.email = input; }}/>
                        <button role="submit" className="buttonFooter z-depth-3">Registrarse</button>
                    </form>
                    <div className="social_network">
                        <a href="https://www.facebook.com/Taller-Valores-Y-Sentimiento-del-Perú-EIRL-608069112616335/?ref=bookmarks"
                            target="_blank" rel="noopener noreferrer">
                            <IconFb/>
                        </a>
                    </div>
                    <div className="part_bottom_footer">
                        <div className="copyright">
                            <span className="copyright_text">
               
                                © 2018 Valores y Sentimiento del Perú
                            </span> 
                            <span className="powered">
                                Powered by Ginsoft
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    clearUUID(id) {
        let response = id.replace(/-/g, "")
        return response
    }
}
export default Footer;
