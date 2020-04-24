import React,{ Component } from 'react';

import Header from '../../../layouts/portal/header';
import Footer from '../../../layouts/portal/footer'
import About from '../../../render/portal/aboutus/index/about';
import Teacher from '../../../render/portal/aboutus/index/teacher'
import '../../../../sass/modules/portal/aboutus/index.sass';

class Index extends Component{
render(){
  return(
    <div className="Index_about">
      <Header selected="about_us"/>
      <div className="content_page">
        <About/>
        <Teacher/>
      </div>
      <Footer/>

    </div>
  );
}
}
export default Index
