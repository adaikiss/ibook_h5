/*global window,document: false */
'use strict';
(function($, window, document, undefined){
    document.getElementById("test").innerHTML='test!';
    $('#test').append('jQuery!');
}(require('jquery'), window, document));
