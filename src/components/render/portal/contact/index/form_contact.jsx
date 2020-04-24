import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

import Utils from '../../../../../util/utils';

class FormContact extends Component {
   constructor(){
      super();
      this.onSubmit = this.onSubmit.bind(this);
      this.utils = new Utils();
   }


   keyUpStatus(event){
      return !!event.target.value.trim();
   }

   onSubmit(e){
      e.preventDefault();
      if (this.name.value != "" && this.email.value != "" && this.description.value != "") {
         var data = new FormData();
         data.append('name', this.name.value);
         data.append('email', this.email.value);
         data.append('description', this.description.value);
         this.utils.doQuery("/contact_portal/create", data)
         .then((response)=>{
            if (response) {
               var $toastContent = $('<span>Su mensaje fue enviado</span>');
               Materialize.toast($toastContent, 5000);
            } else {
               var $toastContent = $('<span>Hubo un erro al enviar los datos</span>');
               Materialize.toast($toastContent, 5000);
            }
         });
      }else{
         var $toastContent = $('<span>Debe llenar todos los campos</span>');
         Materialize.toast($toastContent, 5000);
      }
      this.name.value = "";
      this.email.value = "";
      this.description.value = "";
   }
   render() {
      return (
         <div className="contact">
               <div className="form_content">
                  <div className="title">
                     <span className="titulo">Contactos</span>
                     <hr className="gradient"></hr>
                     <span className="subtitle">Ubicanos...!</span>
                  </div>
                  <div className="form">
                     <div className="form-group">
                           <form onSubmit={this.onSubmit}>
                              <input    name        = "Name"
                                        className   = "input_contact"
                                        type        = "text"
                                        placeholder = "Nombre"
                                        ref         = {(input) => {this.name = input;}}/>
                              <input    name        = "Email"
                                        className   = "input_contact"
                                        type        = "text"
                                        placeholder = "Correo Electrónico"
                                        ref         = {(input) => { this.email = input; }}/>
                              <textarea name        = "Description"
                                        type        = "text"
                                        className   = "description"
                                        placeholder = "¿Qué es lo que desea saber sobre nosotros?"
                                        ref         = {(input) => { this.description = input; }}/>
                              <button   className   = "button_design"
                                        role        = "submit">
                                          Enviar
                              </button>
                           </form>
                     </div>
                  </div>
               </div>
         </div>
      );
   }
}

export default FormContact;
