'use strict';
import React from 'react'
import {render} from 'react-dom'

import FormModal from './FormModal.jsx'
import {subjectBlockStyles, dynamicTypes} from './Constant'

export default class SubjectBlockEditModal extends FormModal{
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
        var paramData = {name:params.name, style:style, itemType:subjectBlockStyles.filter(subjectBlockStyle=>subjectBlockStyle.id == style)[0].contentType};
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

function handleValueChange(props, event){
    props.data[event.target.name] = event.target.value;
    props.handleValueChange();
}
function SubjectBlockForm(props){
    Utils.fallback(props.data, 'style', '2');
    Utils.fallback(props.data, 'dynamicField', '0');
    Utils.fallback(props.data, 'name', '');
    return (
        <form>
            <div className="clearfix">
                <div className="form-group col-sm-12">
                    <label>名称</label>
                    <input name="name" className="form-control" value={props.data.name} onChange={handleValueChange.bind(this, props)}/>
                </div>
            </div>
            <div className="clearfix">
                <div className="form-group col-sm-6">
                    <label>样式</label>
                    <select name="style" className="form-control" value={props.data.style} onChange={handleValueChange.bind(this, props)}>
                        {
                            subjectBlockStyles.map((item, index)=>{return (<option value={item.id} key={index}>{item.name}</option>)})
                        }
                    </select>
                </div>
                <div className="form-group col-sm-6">
                    <label>动态字段</label>
                    <select name="dynamicField" className="form-control" value={props.data.dynamicField} onChange={handleValueChange.bind(this, props)}>
                        {
                            dynamicTypes.map((item, index)=>{return (<option value={item.value} key={index}>{item.text}</option>)})
                        }
                    </select>
                </div>
            </div>
        </form>
    );
}