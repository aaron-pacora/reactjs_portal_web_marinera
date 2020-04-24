import React, { Component } from 'react';

import Header from '../../../layouts/portal/header';
import Footer from '../../../layouts/portal/footer';
import Carousel from '../../../render/portal/home/index/carousel.jsx';
import Phrases from '../../../render/portal/home/index/phrases.jsx';
import Aboutus from '../../../render/portal/home/index/aboutus.jsx';
import News from '../../../render/portal/home/index/news.jsx';
import Agreements from '../../../render/portal/home/index/agreements';

import Utils from '../../../../util/utils';

import '../../../../sass/modules/portal/home/index.sass';

class Index extends Component {
    constructor(){
        super();
        this.utils = new Utils();

        this.state = {
            cover_page: null,
            phrases   : null,
            about     : null,
            news      : null,
            agreements: null
        }
        this.utils.doQuery("/").then((rpta)=>{
           var dataCoverPage  = JSON.parse(rpta.dataCoverPage);
           var dataPhrases    = JSON.parse(rpta.dataPhrases);
           var dataAbout      = JSON.parse(rpta.dataConfigurations);
           var dataNotices    = JSON.parse(rpta.dataNotices);
           var dataAgreements = JSON.parse(rpta.dataAgreements);

            this.setState({
                cover_page: dataCoverPage,
                phrases   : dataPhrases,
                about     : dataAbout,
                news      : dataNotices,
                agreements: dataAgreements,
                src_logo  : dataAbout[0].src_logo
            });
        });
    }
    render() {
            return (
                <div className="index_home">
                    <Header selected="home" />
                    <div className="content_page">
                        {(()=>{
                            if (this.state.cover_page != null && this.state.phrases != null && this.state.about != null) {
                                return <div className="content_page">
                                    <Carousel
                                        cover_page={this.state.cover_page} src_logo={this.state.src_logo} />
                                    <Phrases
                                        phrases={this.state.phrases} />
                                    <Aboutus
                                        about={this.state.about}
                                        count='1' />
                                   <Agreements
                                        data={this.state.agreements}/>
                                    <News
                                        Notices={this.state.news}
                                    />
                                    </div>;
                            }else{
                                return <div className="content_main_preloader">
                                    <div className="preloader-wrapper active">
                                        <div className="spinner-layer spinner-blue-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"></div>
                                            </div><div className="gap-patch">
                                                <div className="circle"></div>
                                            </div><div className="circle-clipper right">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            }
                        })()}
                    <Footer/>
                </div>
            </div>
            );
    }
}

export default Index;
