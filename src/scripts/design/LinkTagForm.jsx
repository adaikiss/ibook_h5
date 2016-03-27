'use strict'

import React from 'react'
import {render} from 'react-dom'
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