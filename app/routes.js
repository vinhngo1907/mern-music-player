import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as Containers from './containers';
import { NotFound, NotFoundSong } from './components';
import { fetchDataForHomePage, getCharts, getPlaylistOnEnter } from './route_callbacks';
import { fetchOnScroll } from './HOC';

export default (
    <Route path='/' component={Containers.App}>
        <Route path="*" component={NotFound} />
    </Route>
)