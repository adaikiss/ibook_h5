'use strict'

import React from 'react'
import {render} from 'react-dom'
import {linkTagTargets} from './Constant'

function handleValueChange(props, event){
    props.data[event.target.name] = event.target.value;
    props.handleValueChange();
}
export default function LinkTagForm(props){
    Utils.fallback(props.data, 'contentType', '0');
    Utils.fallback(props.data, 'id', '');
    Utils.fallback(props.data, 'bookstore', '1');
    Utils.fallback(props.data, 'url', '');
    Utils.fallback(props.data, 'image', '');
    Utils.fallback(props.data, 'name', '');
    return <form>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>链接目标</label>
                <select name="contentType" className="form-control" value={props.data.contentType} onChange={handleValueChange.bind(this, props)}>
                    {linkTagTargets.map((linkTagTarget, index)=>{return <option value={linkTagTarget.value} key={index}>{linkTagTarget.text}</option>})}
                </select>
            </div>
            <div className="form-group col-sm-6">
                <label>内容ID</label>
                <input name="id" className="form-control" value={props.data.id} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>书籍bookstore</label>
                <div>
                    <label className="radio-inline"><input type="radio" name="bookstore" value="1" onChange={handleValueChange.bind(this, props)} checked={props.data.bookstore=='1'}/> 移动</label>
                    <label className="radio-inline"><input type="radio" name="bookstore" value="3" onChange={handleValueChange.bind(this, props)} checked={props.data.bookstore=='3'}/> 开放书城</label>
                    <label className="radio-inline"><input type="radio" name="bookstore" value="2" onChange={handleValueChange.bind(this, props)} checked={props.data.bookstore=='2'}/> 云书籍</label>
                </div>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-12">
                <label>链接URL</label>
                <input name="url" className="form-control" value={props.data.url} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-12">
                <label>图片URL</label>
                <input name="image" className="form-control" value={props.data.image} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-12">
                <label>描述</label>
                <textarea name="name" className="form-control" value={props.data.name} onChange={handleValueChange.bind(this, props)}></textarea>
            </div>
        </div>
    </form>
}