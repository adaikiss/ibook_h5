//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}
////Array.remove
//Array.prototype.remove = function(item) {
//    var index = -1;
//    while((index = this.indexOf(item)) != -1){
//        this.splice(index, 1);
//    }
//    return this;
//};

window.Utils = {};
Utils.shallowExtend = function(target){
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = target;
    for(var index = 1; index < arguments.length; index++){
        var source = arguments[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                output[nextKey] = source[nextKey];
            }
        }
    }
    return output;
};
Utils.extend = function(target){
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = target;
    for(var index = 1; index < arguments.length; index++){
        var source = arguments[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                var prop = source[nextKey];
                if(Utils.typeof(prop) == 'object'){
                    if(output[nextKey] === undefined || output[nextKey] == null){
                        output[nextKey] = {};
                    }
                    Utils.extend(output[nextKey], prop);
                    continue;
                }
                output[nextKey] = prop;
            }
        }
    }
    return output;
};
Utils.clean = function(obj){
    for(var o in obj){
        delete obj[o];
    }
}
Utils.fallback = function(object, key, defaultValue){
    if(object[key] === undefined){
        object[key] = defaultValue;
    }
}

window.noop = function(){}
Utils.TYPES = {
    'array':Object.prototype.toString.call([]),
    'object':Object.prototype.toString.call({}),
    'number':Object.prototype.toString.call(0),
    'string':Object.prototype.toString.call(''),
    'function':Object.prototype.toString.call(function(){}),
    'null':Object.prototype.toString.call(null),
    'undefined':Object.prototype.toString.call(undefined),
    'boolean':Object.prototype.toString.call(false)
};
Utils.typeof = function(obj){
    var toString = Object.prototype.toString.call(obj);
    for (var o in Utils.TYPES) {
        if (Utils.TYPES[o] == toString) {
            if (o == 'object') {
                if (obj instanceof jQuery) {
                    return 'jQuery';
                }
            }
            return o;
        }
    }
    if (toString.indexOf('Element') != null) {
        return 'element';
    }
    return 'undefined';
};
Utils.uuid = function(){
    return  parseInt(Date.now() + '' + Math.round(Math.random() * 1000)).toString(16);
};
Utils.getQueryParams = function(url){
    var result = {};
    var pos = url.indexOf('?');
    if(pos == -1){
        return result;
    }
    var queryString = url.substring(pos + 1);

    pos = queryString.indexOf('#');
    if(pos != -1){
        queryString = queryString.substring(0, pos);
    }

    $.each(queryString.split('&'), function(i, t){
        var tuple = t.split('=');
        result[tuple[0]] = tuple[1];
    });
    return result;
};

(function(window, document, $, undefined){
    $(function() {
        /**
         * collect form values into an associative array, array values(multiple select, checkbox etc) will be joined with ','
         * @returns {{}}
         */
        $.fn.params = function(joinArray){
            var form = $(this);
            var data = {};
            form.find(':input').each(function () {
                var input = $(this);
                var name = $(this).attr('name');
                if (name == null) {
                    return;
                }
                if (!data[name]) {
                    data[name] = {value:[], multiple:false};
                }
                if (input.is('select')) {
                    var multiple = input.prop('multiple');
                    data[name].multiple = multiple;
                    var selected = input.find('option:selected');
                    if (selected.length == 0) {//no select
                        if (!multiple) {
                            var first = input.find('option:first');
                            if (first.length != 0) {
                                data[name].value.push(first.attr('value'));
                                return;
                            }
                        }
                        return;
                    }
                    selected.each(function () {
                        data[name].value.push($(this).attr('value'));
                    });
                    return;
                }
                if (input.is('input')) {
                    if (input.is('[type="checkbox"]')) {
                        data[name].multiple = true;
                        if (!input.is(':checked')) {//no value
                            var uncheckedValue = input.attr('data-unchecked-value');
                            if (uncheckedValue != null) {//has unchecked value.
                                data[name].value.push(uncheckedValue);
                            }
                            return;
                        }
                        //append value
                        data[name].value.push(input.attr('value'));
                        return;
                    }
                    if (input.is('[type="radio"]')) {
                        data[name].multiple = true;
                        if (!input.is(':checked')) {//no value
                            return;
                        }
                        //radio can only have single value
                        data[name].value.push(input.attr('value'));
                        return;
                    }
                }
                if(data[name].value.length > 0){
                    data[name].multiple = true;
                }
                data[name].value.push(input.val());
            });
            for(var o in data){
                if(data[o].multiple){
                    if(joinArray){
                        data[o] = data[o].value.join(',')
                    }else{
                        data[o] = data[o].value;
                    }
                }else{
                    if(data[o].value.length == 0){
                        delete data[o];
                    }else{
                        data[o] = data[o].value[0];
                    }
                }
            }
            return data;
        }
    });
}(window, document, jQuery));