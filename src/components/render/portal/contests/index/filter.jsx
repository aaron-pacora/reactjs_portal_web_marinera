import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

import Svg_calendar from './../../../../../icons/svg_calendar.svg';

import Utils from '../../../../../util/utils';

import {
    Select
} from './../../../../lib/react-materialize/form_materialize'

class Filter extends Component {
   constructor(){
      super();
      this.state={
         data        : [],
         organizer_id: "",
         date        : ""
      }
      this.utils = new Utils();
   }

   componentDidMount(){
      $('.datepicker').pickadate({
         selectMonths : true,        // Creates a dropdown to control month
         selectYears  : 15,          // Creates a dropdown of 15 years to control year,
         close        : 'Ok',
         closeOnSelect: false,       // Close upon selecting a date,
         container    : undefined,   // ex. 'body' will append picker to body
      });
      $(`#date`).on("change",(e)=>{
         this.onChange(e);
      })
      this.fetchOrganizers()
   }
   componentDidUpdate(prevProps, prevState){
      let keyChanged = this.isDiferent(prevState,this.state)
      if(keyChanged){
         keyChanged == "organizer_id"?
         this.props.changeOrganizerIdSearch(this.state.organizer_id):
         this.props.changeDateSearch(this.state.date);
      }
   }
   isDiferent(prevState,currentState){
      for (const key in prevState) {
         if (prevState.hasOwnProperty(key)&&prevState[key]!=currentState[key]) {
               return key
         }
      }
      return false
   }
   fetchOrganizers(){
      this.utils.doQuery("/organizer/index")
      .then((response)=>{
         this.setState({
            data : response
         })
      });
   }
   render() {
      return (
         <div className="content_filter">
               <div className="content_picker">
                  <input type        = "text"
                         id          = "date"
                         name        = "date"
                         value       = {this.state.date}
                         className   = "datepicker"
                         placeholder = "Fecha"
                         onChange    = {this.onChange.bind(this)}/>
                  <Svg_calendar/>
               </div>
               <Select id          = "organizer_id"
                       name        = "organizer_id"
                       value       = {this.state.organizer_id}
                       onChange    = {this.onChange.bind(this)}
                       placeHolder = "Organizador"
                       className   = "icons"
                       options     = {[
                           ...(()=>this.state.data
                                       .filter((element)=>element.src!="empty"?true:false)
                                       .map((element)=>{

                                       return {
                                          "data-icon": global.URBBASERESOURCE+"/organizers/"+this.clearUUID(element.id)+element.src,
                                          text: element.name,
                                          value: element.id,
                                          key: element.id,
                                          className:"rigth "
                                       }

                                 })
                              )()
                     ]}  />

         </div>

      );
   }
   onChange(e){
      let key = e.target.name;
      let value = e.target.value;
      this.setState({
         [key] : value
      })
   }
   clearUUID(id) {
      let response = id.replace(/-/g, "")
      return response
   }
}

export default Filter;
