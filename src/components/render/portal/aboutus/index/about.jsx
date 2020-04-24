import React, { Component } from 'react';
import global from '../../../../../../providers/global.static.jsx';

import SvgPlace from '../../../../../icons/svg_place.svg';
import SvgHeart from '../../../../../icons/svg_corazon.svg';
import SvgHat from '../../../../../icons/svg_sombrero.svg';
import SvgFlag from '../../../../../icons/svg_bandera.svg';

import Utils from '../../../../../util/utils';

class About extends Component{
   constructor(){
      super();
      this.utils = new Utils();
      this.state = {
         aboutConfigurations : null

      }
      //enviar o rebir dataConfigurations
      this.utils.doQuery("/teacher_portal/list")
      .then((rpta)=>{
         var dataConfigurations = JSON.parse(rpta.dataConfigurations);
         this.setState({ aboutConfigurations: dataConfigurations });
      });
   }
  render(){

    return(
        <div className="content_about">

          <div className="title">
            <h2>¿Quienes somos?</h2>
            <div className="subindex">
              <hr/>
              <span>un poco sobre nosotros</span>
            </div>
          </div>
          <div className="content_text">
            <div className="text">
            <p>{this.state.aboutConfigurations == null ? "" : this.state.aboutConfigurations[0].about_us}</p>
            </div>
            <div className="img">
              <SvgHat/>
              <SvgFlag/>
              <SvgHeart/>
              {/* <img src="src/icons/svg_sombrero.svg" alt="sombrero" width="140px" height="140px"/>
              <img src="src/icons/svg_bandera.svg" alt="bandera" width="113px" height="103px"/>
              <img src="src/icons/svg_corazon.svg" alt="corazon" width="90px" height="90px"/> */}
            </div>
          </div>
          <div className="title">
            <h2>Ubícanos</h2>
          </div>
          <div className="content_located_us">
            <div className="main_place">
                <div className="content_subtitle_local">
                    <div className="content_icon">
                        <SvgPlace/>
                    </div>
                    <h3 className="txt_local_subtitle">Local Cono Norte:</h3>
                </div>
                <span className="txt_place">Jirón Blondell 200, Urb. Villasol, Mz. V, Lt. 46, segunda etapa. Frente a la iglesia.</span>
            </div>
            <div className="main_place">
                <div className="content_subtitle_local">
                  <div className="content_icon">
                    <SvgPlace />
                  </div>
                  <h3 className="txt_local_subtitle">Local San Miguel:</h3>
                </div>
                <span className="txt_place">Jirón Caminos del Inca 690, alt. de la cuadra 7 y 8 de la Av. Universitaria, a espaldas de la Clínica San Judas Tadeo.</span>
                <br/>
                <span className="txt_place">Club de la Policía AMPERSUB SFP</span>
            </div>
          </div>
        </div>
    );
  }
}
export default About
