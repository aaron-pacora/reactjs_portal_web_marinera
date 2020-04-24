import React,{Component} from 'react'
import Header from '../../../layouts/portal/header';
import Footer from '../../../layouts/portal/footer';

import Title from '../../../render/portal/contests/index/title';
import Filter from '../../../render/portal/contests/index/filter';
import Day from '../../../render/portal/contests/index/day';
import Pagination from './../../../render/portal/all/pagination';
import global from './../../../../../providers/global.static.jsx';
import Util from './../../../../util/date_parser.js'
import Utils from './../../../../util/utils'

import '../../../../sass/modules/portal/contests/index.sass';
import {
    Preloader
} from './../../../lib/react-materialize/form_materialize'


class Index extends Component {
    constructor(){
        super();
        this.utils = new Utils();
        this.state = {
            data      : [],
            pagination: {},
        }
        this.date_search         = "";
        this.organizer_id_search = "";
        this.array_heights       = [];
    }
    
    componentDidMount(){
        this.fetchContest(null);
        if(this.state.data.length){
            this.efectsPreloader();
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.data.length){
            this.efectsPreloader();
        }
    }
    
    efectsPreloader(){
        document.querySelector(".preloader-wrapper").classList.remove("ocult")
        let contents_day = document.querySelectorAll(".content_day");
        contents_day.forEach((element)=>{
            element.classList.remove("show")
        })
        setTimeout(() => {
            document.querySelector(".preloader-wrapper").classList.add("ocult")
            let contents_day = document.querySelectorAll(".content_day")
            contents_day.forEach((element)=>{
                element.classList.add("show")
            })
        }, 500);
    }
    fetchContest(page){
        let dataf= new FormData();
        dataf.append("date",'1 de julio de 2018');
        dataf.append("page",page?page:1);
        dataf.append("per_page",5);
        dataf.append("date_search",(new Util()).parseToDate(this.date_search));
        dataf.append("organizer_id_search",this.organizer_id_search);
        this.utils.doQuery("/prueba",dataf)
        .then((response)=>{
            let data = JSON.parse(response.dataContests.replace(/\r\n/g, " "));

            let pagination = JSON.parse(response.pagination);
            this.array_heights = [];
            this.setState({
                data: data,
                pagination: pagination
            });
        });
    }
    render(){
        return(
          // preguntar por si acaso
            <div className="index_contests">
                <Header selected="contests"/>
                <div className="content_page"/*body*/>
                    <Title/>
                    <Filter changeDateSearch={this.changeDateSearch.bind(this)}
                            changeOrganizerIdSearch={this.changeOrganizerIdSearch.bind(this)}/>
                    {
                        (this.state.data.length)?
                            <div>
                                <Preloader size="normal" 
                                    color="green" />
                                {this.state.data.map((element,i)=>
                                    <Day contests={ JSON.parse(element).contests } 
                                            date={JSON.parse(element).date} 
                                            key={JSON.parse(element).date+this.organizer_id_search+i}
                                            addArrayHeights={this.addArrayHeights.bind(this)}
                                            getArrayHeights={this.getArrayHeights.bind(this)}/>
                                )}
                            </div>
                        : <div className="content_empty">
                            No hay concursos que mostrar
                            </div>
                    }
                    <Pagination pagination={this.state.pagination}
                                fnOnChangePage={this.fnOnChangePage.bind(this)}/>
                </div>
                <Footer/>
                
            </div>
        );
    }
    fnOnChangePage(page){
        this.fetchContest(page)
    }
    changeDateSearch(date_search){
        this.date_search = date_search;
        this.fetchContest(1)
        // this.setState({
        //     date_search : date_search
        // })
    }
    changeOrganizerIdSearch(organizer_id_search){
        this.organizer_id_search = organizer_id_search;
        this.fetchContest(1)
        // this.setState({
        //     organizer_id_search : organizer_id_search
        // })
    }
    addArrayHeights(ref,height_visible,height_not_visible){
        let index ;
        if(this.array_heights.find((element,i)=>this.array_heights[index=i]==ref)){//si encontro igual ref
            this.array_heights[i]={ 
                contest: ref,
                height_visible : height_visible,
                height_not_visible : height_not_visible
            }
        }else{
            this.array_heights.push({ 
                contest: ref,
                height_visible : height_visible,
                height_not_visible : height_not_visible
            });
        }

        
    }
    getArrayHeights(){
        return this.array_heights
    }
}
export default Index;
