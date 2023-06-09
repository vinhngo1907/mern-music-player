import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as Containers from './containers';
import { NotFound } from './components';
import { fetchDataForHomePage, getCharts } from './route_callbacks';
import { fetchOnScroll } from './HOC';

export default (
    <Route path='/' component={Containers.App}>
        <IndexRoute component={fetchOnScroll(Containers.HomePage)} onEnter={fetchDataForHomePage} />
        <Route path='song/:name/:id' component={Containers.SongPage} />
        <Route path='charts' component={Containers.ChartPage} onEnter={getCharts} />
        <Route path='login' component={Containers.LoginPage} />
        <Route path='signup' component={Containers.SignUpPage} />
        <Route path="*" component={NotFound} />
    </Route>
)