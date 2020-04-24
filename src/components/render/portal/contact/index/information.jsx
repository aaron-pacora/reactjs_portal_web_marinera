import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

import Utils from '../../../../../util/utils';

class Information extends Component {
   constructor(){
      super();
      this.state = {
         configurations : null
      }

      this.utils = new Utils();
      this.utils.doQuery("/contact_portal/list")
      .then(rpta => {
         var data = JSON.parse(rpta.dataConfigurations);
         this.setState({configurations : data})
      });
   }
   render() {
      //var data = this.state.configurations;
      if (this.state.configurations != null){
         var element = this.state.configurations.map((el) => {
               return <div className="item" key={el.id}>
                     <div className="information">
                           <div className="logo">
                           <img src={global.URBBASERESOURCE+"/logo/logo"+el.src_logo} alt=""/>
                           </div>
                           <div className="number">
                              <span>{el.first_number}</span>
                              <span>-</span>
                              <span>{el.second_number}</span>
                           </div>
                           <div className="addres">
                              <span>{el.address}</span>
                           </div>
                           <div className="aboutus">
                              <span>{el.short_description}</span>
                           </div>
                     </div>
                  </div>;
         });
         return element;
      }else{
         return <div></div>
      }
   }
}

export default Information;
