import React,{Component} from 'react';

import global from '../../../../../../providers/global.static.jsx';

import IconSearch from '../../../../../icons/svg_search.svg';
import Pagination from './../../all/pagination.jsx';
import New from './../../all/new.jsx';

import Utils from '../../../../../util/utils';

class List extends Component {
   constructor(){
      super();
      this.utils = new Utils();
      this.state={
         dataNotice  : [],
         pagination  : {},
         searchNotice: "",
         dataToPopup : null
      }
      this.page     = 1;
      this.per_page = 9;
      this.quantity = 0;

      this.clearUUID        = this.clearUUID.bind(this);
      this.fetchDataNotices = this.fetchDataNotices.bind(this);
      this.pressEnter       = this.pressEnter.bind(this);

      this.openModal = this.openModal.bind(this);
      this.fetchDataNotices(null);

   }

   componentDidMount(){
      this.loadScriptOfResize();

   }
   componentDidUpdate(){
      this.loadScriptOfResize();
   }

   openModal(data) {
      this.setState({dataToPopup: data});
      $("#modal_notice").modal('open');
   }
   render(){
   let dataPopup = this.state.dataToPopup;
   return(
      <div  className = "ListIndex">
         <div  className = "title">
            <span className = "tp">Galería de Noticias </span>
            <span className = "gradient"></span>
            <span className = "st">Nuestros Alumnos</span>
            <div  className = "search">
               <input type        = "text" onChange          = {this.changeText.bind(this)} value = {this.searchNotice}
                     placeholder = "Buscar Noticia" onKeyUp = {(e)=>{this.pressEnter(e)}}/>
               <button type = "button" name = "search" onClick = {(e)=>{this.fetchDataNotices(e)}}><IconSearch/></button>
            </div>
         </div>
         <div className = "photos">
            {
               this.printNotice(this.state.dataNotice)
            }
         </div>
         <div className = "slideButtons">
            {
               <Pagination fnOnChangePage = {this.selectedPage.bind(this)} pagination = {this.state.pagination} />
            }
         </div>
         <div id= "modal_notice" className = "modal">
            <div className = "content_modal_main">
            <div className = "content_modal_img" id   = "content_modal_img">
               {(()=>{
                     if (this.state.dataNotice != null){
                           return <img src = {dataPopup ? dataPopup.path_img : ""}
                                 id       = {"modal_img"}
                                 ref      = {(img) => {
                                 if (!img) { return; }
                                 img.onload = () => {
                                       let idTag    = $("#modal_img");
                                       let idFather = $("#content_modal_img");
                                       idTag.removeAttr("style");
                                       idTag.removeClass("max_width");
                                       idTag.removeClass("max_height");
                                       idFather.removeClass("with_flex");
                                       let height = img.height;
                                       let width  = img.width;
                                       if (height > width) {
                                          idTag.addClass("max_height");
                                          idFather.addClass("with_flex");
                                       } else if (height < width) {
                                          idTag.addClass("max_width");
                                       } else {
                                          idTag.addClass("max_width");
                                       }
                                 };
                              }}
                              alt = {dataPopup ? dataPopup.title : ""} />;
                     }
                  })()}
                  </div>
                  <div className = "modal_content_txt">
                     <h4  className = "modal_title">{dataPopup ? dataPopup.title:""}</h4>
                     <div className = "modal_time">
                              <span>{dataPopup ? this.changeFormat(dataPopup.created_at) : ""}</span>
                     </div>
                     <p>{dataPopup ? dataPopup.subtitle : ""}</p>
                     <p>{dataPopup ? dataPopup.description : ""}</p>
                  </div>
               </div>
         </div>
      </div>
   );
   }

   changeFormat(time) {
         time     = time.slice(0, 10);
      var elements = time.split("-");
      return elements[2] + "/" + elements[1] + "/" + elements[0];
   }

   changeText(e){
      this.setState({
      searchNotice: e.target.value
      });
   }


   printNotice(data){
      let elements = null;
         elements = data.map((row)=>{
         return <New key = {row.id} dataRow = {row} clearUUID = {this.clearUUID} openModal = {this.openModal}/>
      });
      return elements;
   }


   pressEnter(e){
      if(e.keyCode==13){
         this.fetchDataNotices(e)
      }
   }

   clearUUID(id){
      let response = id.replace(/-/g,"")
      return response
   }
   loadScriptOfResize(){
      var render= function () {
         var width = $(".figure").width();

         var height = width*(407/533);

         $(".figure").height(height);
         //manejar cambio de letras

         var h   = $(".figcaption").height();
         var max = h*0.33;var med = h*0.18;
         $(".figcaption").css("padding-top",(h*0.1)+"px");
         $(".figcaption").css("padding-bottom",(h*0.1)+"px");
         $("h2").css({"height":max+"px","font-size": (max*0.85)+"px"});

         $(".figcaption").css("font-size",med+"px");
      };
      render();
      $(window).resize(render);
   }
   selectedPage(page){
      this.page = page;
      this.fetchDataNotices(null);
   }

   fetchDataNotices(event){
      let searh     = this.state.searchNotice
      let paramsAdd = !!searh?this.state.searchNotice:"_"
         this.page = (event!=null)?1:this.page
      var data      = new FormData();
      data.append('page', this.page);
      data.append('per_page', this.per_page);
      data.append('Quantity', 0);
      data.append('title',paramsAdd.toLowerCase());
      this.utils.doQuery("/noticias",data)
      .then((rpta)=>{
         let data = []
         let lst = rpta.dataNotices;
         data = JSON.parse(lst)
         let paginate = JSON.parse(rpta.pagination)
         this.setState({
               dataNotice: data,
               pagination: paginate

         })
         this.loadScriptOfResize();
      });
   }

}
export default List
