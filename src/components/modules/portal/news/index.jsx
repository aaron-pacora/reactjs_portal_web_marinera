import React,{Component} from 'react'
import Header from '../../../layouts/portal/header';
import Footer from '../../../layouts/portal/footer';
import List from '../../../render/portal/news/index/list.jsx'
import '../../../../sass/modules/portal/news/index.sass'
class Index extends Component {
    constructor(){
        super();
        $(document).ready(function () {
          $('.modal').modal();
        });
        this.item_notice = {};
    }

    render(){
        return(
          // preguntar por si acaso
            <div className="index_news">
                <Header selected="news"/>
                <div className="content_page"/*body*/>
                    <List/>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Index;
