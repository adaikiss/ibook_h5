'use strict';
import React from 'react'
import {render} from 'react-dom'
import {DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Runtime from '../runtime.js'
import SubjectBlockTemplate from './SubjectBlockTemplate.jsx'
import RenderPanel from './RenderPanel.jsx'
import FormModal from './FormModal.jsx'
import SubjectBlockItemEditModal from './SubjectBlockItemEditModal.jsx'
import SubjectBlockItemsEditModal from './SubjectBlockItemsEditModal.jsx'
import SubjectBlockEditModal from './SubjectBlockEditModal.jsx'
import {subjectBlockStyles, dynamicTypes} from './Constant'

@DragDropContext(HTML5Backend)
export default class DesignPanel extends React.Component{

    constructor(props){
        super(props);
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
    exportData(){
        STORE.exportData(true);
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
                <FormModal ref="subjectBlockItemsAddModal" confirm="确定" cancel="取消" title="通过内容ID列表加载内容">
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
                <SubjectBlockItemEditModal ref="subjectBlockItemEditModal" confirm="确定" cancel="取消" title="编辑内容"/>
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