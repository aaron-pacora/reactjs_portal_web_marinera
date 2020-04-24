import React from 'react';
import { Route, Switch } from 'react-router-dom';

import home from './components/modules/portal/home/index'
import contact from './components/modules/portal/contact/index';
import about_us from './components/modules/portal/aboutus/index';
import news from './components/modules/portal/news/index'
import contest from './components/modules/portal/contests/index'
// import indexCoverPage from './components/modules/intranet/cover_page/index';
// import news from './components/modules/intranet/news/list';

// import errorPage from './components/modules/intranet/error_page/error_page';

const AppRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/contacto" component={contact} />
            <Route exact path="/sobre_nosotros" component={about_us} />
            <Route exact path="/noticias" component={news}/>
            <Route exact path="/concursos" component={contest}/>
        </Switch>
    );
}

export default AppRoutes;
