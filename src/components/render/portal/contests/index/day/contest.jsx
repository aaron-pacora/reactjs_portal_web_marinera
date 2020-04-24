import React, { Component } from 'react';

import global from '../../../../../../../providers/global.static.jsx';

import Utils from '../../../../../../util/utils';

class Contest extends Component {
   constructor(props){
      super(props);
      this.data   = {};
      this.data   = this.props.data;
      this.onLoad = this.onLoad.bind(this);
      this.state  = {
         src: "",
         turn: false
      }
      this.utils = new Utils();
   }
   componentDidMount(){
      addEventListener("resize",()=>{
         this.onLoad()
      })

      this.fetchOrganizer()
   }
   onLoad(){
      if (!this.state.turn) {
         let contest            = this.contest;
         let h_ever_visible     = getComputedStyle(this.ever_visible).height;
         let h_not_ever_visible = getComputedStyle(this.not_ever_visible).height;
         this.props.addArrayHeights(contest, h_ever_visible, h_not_ever_visible)
         this.contest.style = `height : ${h_ever_visible}`
      }
   }

   fetchOrganizer(){
      let form = new FormData();
      form.append("id",this.data.organizer_id);
      this.utils.doQuery("/organizer/show",form)
      .then((response)=>{
         if (response != false) {
            this.setState({
               src: response.src
            })
         }
      });
   }
   render() {
      return (
         <div className="content_contest card"
                  onClick={this.onClick.bind(this)}
                  ref={(ref)=>{this.contest =ref}}>
               <div className="ever_visible"
                     ref = {(ref)=>{this.ever_visible = ref}}>
                  <div className="name">
                     <h3 className="sub_subtitle">
                           Nombre
                     </h3>
                     <span className="text">
                           {this.data.name}
                     </span>
                  </div>
                  <div className="place">
                     <h3 className="sub_subtitle">
                           Lugar
                     </h3>
                     <span className="text">
                           {this.data.place}
                     </span>
                  </div>
                  <div className="organizer">
                     <h3 className="sub_subtitle">
                           Organizador
                     </h3>
                     <img
                           onLoad = {this.onLoad}
                           src={global.URBBASERESOURCE+"/organizers/"+this.clearUUID(this.data.organizer_id)+this.state.src} alt="img_organizer" className="image"/>
                  </div>
               </div>
               <div className="not_ever_visible"
                  ref ={(ref)=>{this.not_ever_visible=ref}}>
                  <hr className="line"/>
                  <div className="description">
                     <h3 className="sub_subtitle">
                           Descripción
                     </h3>
                     <span className="text">
                           {this.data.description}
                     </span>
                  </div>
               </div>
         </div>
      );
   }
   clearUUID(id) {
      let response = id.replace(/-/g, "")
      return response
   }
   onClick(){
      let contests = this.props.getArrayHeights(); //{contest: /*ref-react :)*/ ,h_visible,h_not_visible)}
      let height_result= 0;
      contests.forEach((element) => {

         if(element.contest!= this.contest){
               element.contest.style = `height: ${element.height_visible}`//remove

         }else{
               height_result = parseInt(element.height_visible.split("p")[0]) + parseInt(element.height_not_visible.split("p")[0])
         }
      });

      if(Math.ceil(getComputedStyle(this.contest).height.split("p")[0])==height_result){
         this.contest.style = `height : ${getComputedStyle(this.ever_visible).height}`
      }else{
         this.contest.style = `height : ${height_result}`
      }

   }
}

export default Contest;
