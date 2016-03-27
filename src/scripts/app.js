/*global window,document: false */
'use strict';
require('../styles/main.less');
require('./runtime.js');

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import App from './components/App.jsx'
import Bookshelf from './components/Bookshelf.jsx'
import Circle from './components/Circle.jsx'
import NotFound from './components/NotFound.jsx'

(function(window, document, $, undefined){
    $(function() {
        $(window).resize(function(){
            $('html').css('font-size', $('body').width()*0.05+'px');
        }).trigger('resize');
    });

    const routes = (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Circle} />
                <Route component={Bookshelf}/>
            </Route>
            <Route path="*" component={NotFound.jsx}/>
        </Router>
    );

    render(routes, document.getElementById('viewport'));
}(window, document, jQuery));
