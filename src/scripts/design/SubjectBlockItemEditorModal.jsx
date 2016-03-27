'use strict'

import React from 'react'
import {render} from 'react-dom'
import FormModal from './FormModal.jsx'
import LinkTagForm from './LinkTagForm.jsx'
import BookForm from './BookForm.jsx'
import {BootstrapButton} from './Bootstrap.jsx'

export default class SubjectBlockItemEditorModal extends FormModal {
    constructor(props) {
        super(props);
    }

    open(){
        this.refs.content.forceUpdate();
        super.open();
    }

    handleConfirm(){
        var form = this.root().find('form');
        if(STORE.subjectBlockItemEditorData.mode == 'add'){
            form.each((index, item) => {STORE.subjectBlockItemEditorData.subjectBlockData.items.push($(item).params(true));});
        }else{
            Utils.extend(STORE.subjectBlockItemEditorData.itemData[0], form.params(true));
        }
        if(STORE.subjectBlockItemEditorData.callback){
            STORE.subjectBlockItemEditorData.callback();
        }
        this.close();
    }
    handleCancel(){
        Utils.clean(STORE.subjectBlockItemEditorData);
        super.handleCancel();
    }
    render(){
        return super.render(<SubjectBlockItemEditorModalContent ref="content"/>);
    }
}
export class SubjectBlockItemEditorModalContent extends React.Component {
    constructor(props){
        super(props);
        this.state = STORE.subjectBlockItemEditorData;
    }
    handleValueChange(event){
        this.forceUpdate();
    }
    render(){
        if(this.state.mode == null){
            return <div className="template_form"></div>
        }
        var forms = [];
        var itemData = this.state.itemData;
        switch(this.state.subjectBlockData.itemType){
            case 0:
                itemData.map((item, index) => forms.push(<BookForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
            case 5:
                itemData.map((item, index) => forms.push(<LinkTagForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
        }
        return (
            <div className="template_form">
                {this.state.mode == 'add' ? (
                    <div className="clearfix">
                        <div className="form-group col-sm-12">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="ID列表"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.loadDataBy}>
                                    <span className="glyphicon glyphicon-refresh"></span>
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                ) : null}
                {forms}
            </div>
        )
    }
}
export class LinkTagForm1 extends React.Component {
    constructor(props){
        super(props);
        this.state = props.data || {};
    }
    handleChange(event){
        console.debug(event);
    }
    render(){
        return (
            <form>
                <div className="clearfix">
                    <div className="form-group col-sm-6">
                        <label>链接目标</label>
                        <select name="contentType" className="form-control" value={this.state.contentType} onChange={this.handleChange.bind(this)}>
                            <option value="0">书籍</option>
                            <option value="-1">标准书籍</option>
                            <option value="1">书单</option>
                            <option value="4">独立专题</option>
                            <option value="7">综合推荐</option>
                            <option value="10">促销书籍</option>
                            <option value="11">包月包</option>
                            <option value="12">任务</option>
                            <option value="13">榜单</option>
                            <option value="14">分类</option>
                            <option value="15">促销折扣</option>
                            <option value="17">内部界面</option>
                            <option value="22">APK下载</option>
                            <option value="23">网页</option>
                            <option value="25">内部网页</option>
                            <option value="26">打开应用市场</option>
                            <option value="30">纯文字/图片</option>
                            <option value="32">促销频道</option>
                            <option value="33">书评频道</option>
                            <option value="34">求书频道</option>
                            <option value="35">分享书籍频道</option>
                            <option value="36">包月频道</option>
                            <option value="39">导航栏</option>
                            <option value="40">导航栏内容项</option>
                            <option value="41">书吧</option>
                            <option value="42">主贴</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-6">
                        <label>内容ID</label>
                        <input name="id" className="form-control" value={this.state.id} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <div className="clearfix">
                    <div className="form-group col-sm-6">
                        <label>书籍BID</label>
                        <input name="bid" className="form-control" value={this.state.id} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label>书籍bookstore</label>
                        <div>
                            <label className="radio-inline"><input type="radio" name="bookstore" value="1" checked={data.bookstore == 1}/> 移动</label>
                            <label className="radio-inline"><input type="radio" name="bookstore" value="3" checked={data.bookstore == 3}/> 开放书城</label>
                            <label className="radio-inline"><input type="radio" name="bookstore" value="2" checked={data.bookstore == 2}/> 云书籍</label>
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                    <div className="form-group col-sm-12">
                        <label>链接URL</label>
                        <input name="url" className="form-control" value={data.url}/>
                    </div>
                    <div className="form-group col-sm-12">
                        <label>图片URL</label>
                        <input name="image" className="form-control" value={data.image}/>
                    </div>
                    <div className="form-group col-sm-12">
                        <label>描述</label>
                        <textarea name="name" className="form-control" value={data.name}/>
                    </div>
                </div>
            </form>
        )
    }
}