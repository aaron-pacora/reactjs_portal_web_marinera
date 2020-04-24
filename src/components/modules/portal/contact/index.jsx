import React, { Component } from 'react';

import Header from '../../../layouts/portal/header';
// import Title from '../../../render/portal/all/title_def';

import FormContact from '../../../render/portal/contact/index/form_contact';
import Information from '../../../render/portal/contact/index/information';

import '../../../../sass/modules/portal/contact/index.sass';

class Index extends Component {
    render() {
        return (
            <div className="index_contact">
                <Header selected="contact" />
                <div className="content_page">
                    <FormContact/>
                    <Information/>
                </div>
            </div>
        );
    }
}



export default Index;