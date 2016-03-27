'use strict'

import React from 'react'
import {render} from 'react-dom'
import {BootstrapModal} from './Bootstrap.jsx'

export default class FormModal extends BootstrapModal{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        super.componentDidMount();
        this.form = this.root().find('form');
    }
    handleCancel(){
        this.postSubmit = null;
        this.close();
    }
    handleConfirm(){
        if(this.postSubmit){
            this.postSubmit(this.params());
        }
        this.postSubmit = null;
        this.close();
    }
    handleHidden(){

    }
    submitCallback(callback){
        this.postSubmit = callback;
        return this;
    }
    params(){
        return this.root().find('form').params();
    }
    reset(data){
        this._resetForm(data, this.form);
        return this;
    }
    _resetForm(data, form){
        if(data === undefined){
            form[0].reset();
            return this;
        }
        for(var o in data){
            this.resetInput(form.find('[name="' + o + '"]'), data[o]);
        }
    }
    resetInput(input, value){
        if(input.length == 0){
            return;
        }
        var type = _typeof(value);
        if(input.is('input[type="checkbox"],input[type="radio"]')){
            var apply = function(item, index){
                input.filter('[value="' + item + '"]').prop('checked', true);
            };
            if(type === TYPES.number){
                apply(value);
                return;
            }
            if(type == TYPES.string){
                value.split(',').map(apply);
                return;
            }
            if(type == TYPES.array){
                value.map(apply);
                return;
            }
        }
        if(input.is('select')){
            var apply = function(item, index){
                input.find('option[value="' + item + '"]').prop('selected', true);
            };
            if(type === TYPES.number){
                apply(value);
                return;
            }
            if(type == TYPES.string){
                value.split(',').map(apply);
                return;
            }
            if(type == TYPES.array){
                value.map(apply);
                return;
            }
        }
        if(input.length > 1){
            var apply = function(item, index){
                $(input[index]).val(item);
            };
            if(type === TYPES.number){
                apply(value, 0);
                return;
            }
            if(type == TYPES.string){
                value.split(',').map(apply);
                return;
            }
            if(type == TYPES.array){
                value.map(apply);
                return;
            }

        }
        input.val(value);
    }
}