import React, { Component } from 'react';

import global from '../../../../../../providers/global.static.jsx';

class Agreements extends Component {
   constructor(props) {
      super(props);
      this.data       = this.props.data || [];
      this.state = {
         popup_data: null
      }
      this.openModal  = this.props.openModal;
   }

   componentDidMount(){
      $("#modal_agreement").modal();
   }

   render() {
      if (this.data.length == 0){
         return <div></div>;
      }
      return (
         <div className="c-agreements">
            <div className="c-agreements-title">
               <span>Convenios</span>
            </div>
            <div className="c-agreements-container c-agreements-container-mobile">
               <div className="c-agreements-scroll">
                  {(() => {
                     return this.data.map((item, index) => {
                        return this.getCardMobile(item, index);
                     });
                  })()}
               </div>
               <div id="modal_agreement" className="modal modal_agreement">
                  {this.getContentPopup()}
               </div>
            </div>
            <div className="c-agreements-container c-agreements-container-desktop">
               <div className="c-agreements-scroll">
                  {(() => {
                     return this.data.map((item, index) => {
                        if (index > 0){
                           // return;
                        }
                        return this.getCardDesktop(item, index);
                     });
                  })()}
               </div>
            </div>
         </div>
      )
   }

   getCardMobile(item, index){
      return <div className="card vertical card-agreements" key={index}>
         <div className="card-agreements-img">
            <img src={global.URBBASERESOURCE + "/agreements/" + item.id.replace(/-/g, "") + item.src} alt="" />
         </div>
         <span className="card-agreements-title">{item.name}</span>
         <div className="content_btn_more">
            <div className="z-depth-3 btn_view_more" onClick={() => {
               this.setState({
                  popup_data: item
               });
               $("#modal_agreement").modal('open');
            }}>
               Ver más</div>
         </div>
      </div>;
   }
   getCardDesktop(item, index){
      return <div className="card vertical card-agreements" key={index}>
         <div className="modal-agreements-row">
            <div className="card-agreements-img">
               <img src={global.URBBASERESOURCE + "/agreements/" + item.id.replace(/-/g, "") + item.src} alt="" />
            </div>
            <div className="modal-agreements-detail center">
               <span className="modal-agreements-title">{item.name}</span>
               {(()=>{
                  var link = item.link;
                  if (validator.isURL(item.link, { protocols: ['https','http'], require_protocol: true})){
                     return <div className="content_btn_more">
                        <a className="z-depth-3 btn_view_more" target="__blank" href={item.link}>
                           Visitar</a>
                     </div>
                  }
               })()}
            </div>
         </div>
         {(()=>{
            if (item.description != "" || item.description != null){
               return <div className="modal-agreements-description">
                  {item.description}
               </div>;
            }
         })()}
      </div>;
   }

   getContentPopup(){
      let item = this.state.popup_data;
      if (item == null){
         return;
      }
      return <div className="modal-agreements-content">
         <div className="modal-agreements-row">
            <div className="card-agreements-img">
               <img src={global.URBBASERESOURCE + "/agreements/" + item.id.replace(/-/g, "") + item.src} alt="" />
            </div>
            <div className="modal-agreements-detail center">
               <span className="modal-agreements-title">{item.name}</span>
               {(() => {
                  var link = item.link;
                  if (validator.isURL(item.link, { protocols: ['https', 'http'], require_protocol: true })) {
                     return <div className="content_btn_more">
                        <a className="z-depth-3 btn_view_more" target="__blank" href={item.link}>
                           Visitar</a>
                     </div>
                  }
               })()}
            </div>
         </div>
         {(() => {
            if (item.description != "" || item.description != null) {
               return <div className="modal-agreements-description">
                  {item.description}
               </div>;
            }
         })()}
      </div>;
   }
}
export default Agreements;
