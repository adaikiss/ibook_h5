'use strict';
import React from 'react'
import {render} from 'react-dom'
import {DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Runtime from '../runtime.js'
import BookTemplate from './BookTemplate.jsx'
import SubjectBlockTemplate from './SubjectBlockTemplate.jsx'
import RenderPanel from './RenderPanel.jsx'
import FormModal from './FormModal.jsx'
import SubjectBlockItemEditorModal from './SubjectBlockItemEditorModal.jsx'
import SubjectBlockItemsEditModal from './SubjectBlockItemsEditModal.jsx'
import SubjectBlockForm from './SubjectBlockForm.jsx'

window.ITEM_STYLES = [
    {"id":1, "name":"头条样式-图带标签", "contentType":5},
    {"id":2, "name":"标签-长方形", "contentType":5},
    {"id":3, "name":"标签-圆形", "contentType":5},
    {"id":4, "name":"banner图", "contentType":2},
    {"id":5, "name":"书单", "contentType":1},
    {"id":6, "name":"包月", "contentType":11},
    {"id":7, "name":"话题", "contentType":6},
    {"id":8, "name":"促销", "contentType":10},
    {"id":9, "name":"纯文字", "contentType":5},
    {"id":10, "name":"书-封面关键词", "contentType":0},
    {"id":11, "name":"书-封面评分", "contentType":0},
    {"id":12, "name":"书-封面数据", "contentType":0},
    {"id":13, "name":"书-关键词", "contentType":0},
    {"id":14, "name":"书-评分", "contentType":0},
    {"id":15, "name":"书-数据", "contentType":0},
    {"id":16, "name":"书-带促销信息", "contentType":10},
    {"id":17, "name":"书-单行简洁版", "contentType":0},
    {"id":18, "name":"九宫格", "contentType":0},
    {"id":24, "name":"专题名称标签", "contentType":5},
    {"id":25, "name":"分隔符[占位]", "contentType":0},
    {"id":26, "name":"九宫格-不带文字", "contentType":0},
    {"id":27, "name":"带颜色长标签", "contentType":5},
    {"id":28, "name":"带颜色圆形标签", "contentType":5},
    {"id":29, "name":"书-封面不可点关键词", "contentType":0},
    {"id":30, "name":"九宫格带分类", "contentType":0},
    {"id":31, "name":"书-榜单排行样式", "contentType":0},
    {"id":33, "name":"倒计时[占位]", "contentType":30},
    {"id":34, "name":"占位-默认书籍", "contentType":0},
    {"id":35, "name":"包月样式简洁版", "contentType":11},
    {"id":36, "name":"单个标签", "contentType":5},
    {"id":37, "name":"样式块", "contentType":3},
    {"id":38, "name":"包月-带购买或倒计时", "contentType":11},
    {"id":39, "name":"包月-全部列表样式", "contentType":11},
    {"id":40, "name":"头条样式2-大图3标签", "contentType":5},
    {"id":41, "name":"头条样式3-小图1标签", "contentType":5},
    {"id":42, "name":"头条样式4-大图2标签", "contentType":5},
    {"id":43, "name":"一小时追书榜-柱状图", "contentType":0},
    {"id":44, "name":"标题+说明", "contentType":5},
    {"id":45, "name":"主贴头条样式", "contentType":5}
];
window.ITEM_STYLES_MAP = function(){
    var result = {};
    ITEM_STYLES.map(function(item, index){
        result[item.id] = item;
    });
    return result;
}();
window.DYNAMIC_TYPES = [
    {"value":0, "name":"没有"},
    {"value":1, "name":"点击数"},
    {"value":2, "name":"促销额外数据"},
    {"value":3, "name":"订购数"},
    {"value":4, "name":"书籍分类"},
    {"value":5, "name":"书籍字数"},
    {"value":6, "name":"书籍投票数"}
];

@DragDropContext(HTML5Backend)
export default class DesignPanel extends React.Component{

    constructor(props){
        super(props);
        this.editHelper = {
            addSubjectBlock:this.addSubjectBlock.bind(this),
            editSubjectBlock:this.editSubjectBlock.bind(this),
            addSubjectBlockItem:this.addSubjectBlockItem.bind(this),
            editSubjectBlockItem:this.editSubjectBlockItem.bind(this),
            removeSubjectBlock:this.removeSubjectBlock.bind(this),
        };
    }

    componentDidMount(){
        STORE.register(this.refs);
    }
    openBookModal() {
        this.refs.subjectBookModal.submitCallback(function(params){
            STORE.updateBook(params);
        }).reset(STORE.books.params).open();
    }
    addSubjectBlock(){
        STORE.addSubjectBlock();
    }
    addSubjectBlockCallback(params){
        var style = parseInt(params.style);
        var data = {
            name:params.name,
            style:style,
            itemType:ITEM_STYLES_MAP[style].contentType,
            items:[]
        };
        STORE.addSubjectBlock({params:params, data:data});
    }
    editSubjectBlock(currentData) {
        this.refs.subjectBlockModal.submitCallback(this.editSubjectBlockCallback.bind(this, currentData)).reset(currentData.params).open();
    }
    editSubjectBlockCallback(currentData, params){
        var style = parseInt(params.style);
        var data = {
            name:params.name,
            style:style,
            itemType:ITEM_STYLES_MAP[style].contentType
        };
        var refreshItems = currentData.params.ids !== params.ids;
        $.extend(currentData.data, data);
        currentData.params = params;
        STORE.updateSubjectBlock(currentData, refreshItems);
    }
    removeSubjectBlock(data){
        STORE.removeSubjectBlock(data);
    }
    addSubjectBlockItem(subjectBlockData, callback){
        this.refs.itemEditorModal.open(subjectBlockData, callback);
    }

    editSubjectBlockItem(subjectBlockData, callback, data){
        this.refs.itemEditorModal.open(subjectBlockData, callback, data);
    }

    exportData(){
        STORE.exportData();
    }
    preview(){
        STORE.preview();
    }

    render(){
        return (
            <div id="design-panel">
                <FormModal ref="subjectBookModal" confirm="确定" cancel="取消" title="编辑专题书籍ID列表">
                    <div className="template_form">
                        <form>
                            <div className="clearfix">
                                <div className="form-group col-sm-12">
                                    <label>书籍ID列表(逗号隔开)</label>
                                    <textarea name="ids" className="form-control"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </FormModal>
                <SubjectBlockEditModal ref="subjectBlockModal" confirm="确定" cancel="取消" title="样式块"></SubjectBlockEditModal>
                <FormModal ref="subjectBlockItemsModal" confirm="确定" cancel="取消" title="通过内容ID列表加载内容">
                    <div className="template_form">
                        <form>
                            <div className="clearfix">
                                <div className="form-group col-sm-12">
                                    <label>内容ID列表(逗号隔开)</label>
                                    <textarea name="ids" className="form-control"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </FormModal>
                <SubjectBlockItemsEditModal ref="subjectBlockItemsEditModal" confirm="确定" cancel="取消" title="调整内容顺序(拖出以删除)"/>
                <SubjectBlockItemEditorModal ref="itemEditorModal" confirm="确定" cancel="取消" title="编辑内容"/>
                <div id="render-panel">
                    <div id="design-toolbar">
                        <a className="btn btn-primary" onClick={this.openBookModal.bind(this)}><span className="glyphicon glyphicon-plus"/>书籍</a>
                        <a className="btn btn-primary" onClick={this.addSubjectBlock}><span className="glyphicon glyphicon-plus"/>样式块</a>
                        <a className="btn btn-primary" onClick={this.exportData}><span className="glyphicon glyphicon-export"/>导出数据</a>
                        <a className="btn btn-primary" onClick={this.preview}><span className="glyphicon glyphicon-phone"/>预览</a>
                    </div>
                    <RenderPanel editHelper={this.editHelper}/>
                </div>
            </div>
        )
    }
}
class SubjectBlockEditModal extends FormModal{
    constructor(props) {
        super(props);
    }

    open(){
        this.refs.content.forceUpdate();
        super.open();
    }

    handleConfirm(){
        var form = this.root().find('form');
        var params = form.params(true);
        var style = parseInt(params.style);
        var paramData = {name:params.name, style:style, itemType:ITEM_STYLES_MAP[style].contentType};
        if(STORE.subjectBlockEditorData.mode === 'add'){
            paramData.items = [];
        }
        Utils.extend(STORE.subjectBlockEditorData.data, {params:params, data:paramData});
        //if(STORE.subjectBlockEditorData.data.data.items === undefined){
        //    STORE.subjectBlockEditorData.data.data.items = [];
        //}
        if(STORE.subjectBlockEditorData.callback){
            STORE.subjectBlockEditorData.callback();
        }

        Utils.clean(STORE.subjectBlockEditorData);
        this.close();
    }

    handleCancel(){
        Utils.clean(STORE.subjectBlockEditorData);
        super.handleCancel();
    }

    render(){
        return super.render(<SubjectBlockEditModalContent ref="content"/>);
    }
}
class SubjectBlockEditModalContent extends React.Component {
    constructor(props){
        super(props);
        this.state = STORE.subjectBlockEditorData;
    }
    handleValueChange(event){
        this.forceUpdate();
    }
    render(){
        if(this.state.mode == null){
            return <div className="template_form"></div>
        }
        return (
            <div className="template_form">
                <SubjectBlockForm data={this.state.data.params} handleValueChange={this.handleValueChange.bind(this)}/>
            </div>
        )
    }
}
//<div className="clearfix">
//    <div className="form-group col-sm-12">
//        <label>分隔符</label>
//        <div>
//            <label className="radio-inline">
//                <input type="radio" name="delimiter" value="0" defaultChecked/> 没有
//            </label>
//            <label className="radio-inline">
//                <input type="radio" name="delimiter" value="-1"/> 前面
//            </label>
//            <label className="radio-inline">
//                <input type="radio" name="delimiter" value="1"/> 后面
//            </label>
//            <label className="radio-inline">
//                <input type="radio" name="delimiter" value="2"/> 两边
//            </label>
//        </div>
//    </div>
//</div>
//<div className="clearfix">
//    <div className="form-group col-sm-12">
//        <label>内容ID</label>
//        <textarea name="ids" className="form-control"></textarea>
//    </div>
//    </div>