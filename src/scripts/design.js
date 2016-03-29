/**
 * Created by HuLingwei on 2016/3/8.
 */
'use strict';
require('../styles/main.less');
require('../styles/design.less');

import Runtime from './runtime.js'
import React from 'react'
import { render } from 'react-dom'
import DesignPanel from './design/DesignPanel.jsx'
import SubjectBlock from './components/fragments/SubjectBlock.jsx'

function noop(){}

(function(window, document, $, undefined){
    $(function() {
        $(window).resize(function(){
            $('html').css('font-size', 414*0.05+'px');
        }).trigger('resize');
    });

    window.STORE = {
        observers:[],
        books:{params:{}, data:[]},
        subjectBlocks:[],//[{params:{}, data:{}, key:uuid}, ...]
        key:0,
        subjectBlockEditorData:{data:null, callback:null, mode:null},
        subjectBlockItemEditorData:{subjectBlockData:null, itemData:null, callback:null, mode:null},
        subjectBlockItemsEditData:[],
        refs:{
            subjectBlockModal:null,
            subjectBlockItemEditModal:null,
            subjectBlockItemsAddModal:null,
            subjectBlockItemsEditModal:null
        },
        observe:function(callback){
            this.observers.push(callback);
        },
        register(refs){
            this.refs.subjectBlockModal = refs.subjectBlockModal;
            this.refs.subjectBlockItemEditModal = refs.subjectBlockItemEditModal;
            this.refs.subjectBlockItemsAddModal = refs.subjectBlockItemsAddModal;
            this.refs.subjectBlockItemsEditModal = refs.subjectBlockItemsEditModal;
        },
        onChange:function(){
            this.observers.map(function(item, index){
                item();
            }.bind(this));
        },
        exportData(popup){
            var data = {
                "channel" : 0,
                "recommendWords" : "",
                "titleStyle" : 0,
                "order" : 0,
                "likeCount" : 0,
                "dislikeCount" : 0,
                "interest" : 0,
                "id" : 21712,
                "name" : "导出数据",
                "style" : 0,
                items:[]
            };
            this.subjectBlocks.map(subjectBlock=>data.items.push(subjectBlock.data));
            this.books.data.map(book=>data.items.push(book));
            if(popup){
                var data_window = window.open("", "专题数据");
                data_window.document.write(JSON.stringify(data));
            }
            return data;
        },
        preview(){
            var data = JSON.stringify(STORE.exportData());
            window.open("/?data=" + encodeURIComponent(data));
        },
        updateBook:function(params){
            Runtime.loadData(Runtime.api.subjectSerialize, {type:0, ids: params.ids}, function(result){
                this.books.params = params;
                this.books.data = result;
                this.onChange();
            }.bind(this));
        },
        removeSubjectBlock:function(data){
            var index = this.subjectBlocks.indexOf(data);
            this.subjectBlocks.splice(index, 1);
            this.onChange();
        },
        editSubjectBlock:function(data){
            Utils.shallowExtend(this.subjectBlockEditorData, {data:data, callback:function(params){this.onChange();}.bind(this), mode:'edit'});
            this.refs.subjectBlockModal.open();
        },
        addSubjectBlock:function(){
            Utils.shallowExtend(this.subjectBlockEditorData, {data:{params:{}, data:{}, uuid:Utils.uuid()}, callback:function(){this.subjectBlocks.push(this.subjectBlockEditorData.data);this.onChange();}.bind(this), mode:'add'});
            this.refs.subjectBlockModal.open();
        },
        addSubjectBlockItem:function(subjectBlockData){
            Utils.shallowExtend(this.subjectBlockItemEditorData, {subjectBlockData:subjectBlockData, itemData:[{}], callback:function(){STORE.onChange();}, mode:'add'});
            this.refs.subjectBlockItemEditModal.open();
        },
        editSubjectBlockItem:function(subjectBlockData, itemData){
            Utils.shallowExtend(this.subjectBlockItemEditorData, {subjectBlockData:subjectBlockData, itemData:[itemData], callback:function(){STORE.onChange();}, mode:'edit'});
            this.refs.subjectBlockItemEditModal.open();
        },
        addSubjectBlockItems(subjectBlockData){
            this.refs.subjectBlockItemsAddModal.submitCallback(function(params){
                if(params.ids != ''){
                    Runtime.loadData(Runtime.api.subjectSerialize, {type: subjectBlockData.itemType, ids: params.ids}, function (result) {
                        result.map(function (item) {
                            subjectBlockData.items.push(item);
                        });
                        STORE.onChange();
                    });
                }
            }).open();
        },
        editSubjectBlockItems:function(subjectBlockData){
            this.subjectBlockItemsEditData.splice(0, this.subjectBlockItemsEditData.length);
            subjectBlockData.items.map(function(item, index){
                this.subjectBlockItemsEditData.push({id:index, text:this.getSubjectBlockItemPlaceholderText(subjectBlockData.itemType, item)});
            }.bind(this));
            this.refs.subjectBlockItemsEditModal.submitCallback(function(){
                var items = subjectBlockData.items;
                subjectBlockData.items = this.subjectBlockItemsEditData.map(item => {return items[item.id]});
                this.onChange();
            }.bind(this)).open();
        },
        getSubjectBlockItemPlaceholderText:function(itemType, item){
            switch(itemType){
                case 0:
                    return item.sub_title || item.name;
                case 2:
                    return item.name;
                case 5:
                    return SubjectBlock.parseLinkTagName(item.name).text;
                default:
                    return '[空白]';
            }
        }
    };
    render(<DesignPanel/>, document.getElementById('viewport'));
}(window, document, jQuery));