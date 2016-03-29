'use strict'

import React from 'react'
import {render} from 'react-dom'
import {bannerTargets} from './Constant'

function handleValueChange(props, event){
    props.data[event.target.name] = event.target.value;
    props.handleValueChange();
}
export default function BannerForm(props){
    Utils.fallback(props.data, 'ad_type', '9');
    Utils.fallback(props.data, 'bid', '');
    Utils.fallback(props.data, 'bookstore', '1');
    Utils.fallback(props.data, 'name', '');
    Utils.fallback(props.data, 'description', '');
    Utils.fallback(props.data, 'words', '');
    Utils.fallback(props.data, 'cover_url', '');
    Utils.fallback(props.data, 'banner_url', '');
    Utils.fallback(props.data, 'ad_url', '');
    Utils.fallback(props.data, 'bannerId', '0');
    Utils.fallback(props.data, 'scale', '0');
    Utils.fallback(props.data, 'banner_type', '0');
    return <form>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>链接目标</label>
                <select name="ad_type" className="form-control" value={props.data.ad_type} onChange={handleValueChange.bind(this, props)}>
                    {bannerTargets.map((bannerTarget, index)=>{return <option value={bannerTarget.value} key={index}>{bannerTarget.text}</option>})}
                </select>
            </div>
            <div className="form-group col-sm-6">
                <label>内容ID</label>
                <input name="bid" className="form-control" value={props.data.bid} onChange={handleValueChange.bind(this, props)}/>
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
            <div className="form-group col-sm-6">
                <label>名称</label>
                <input name="name" className="form-control" value={props.data.name} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>Banner ID</label>
                <input name="bannerId" className="form-control" value={props.data.bannerId} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>广告类型</label>
                <input name="banner_type" className="form-control" value={props.data.banner_type} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>推荐语</label>
                <input name="words" className="form-control" value={props.data.words} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>封面图URL</label>
                <input name="cover_url" className="form-control" value={props.data.cover_url} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>图片比例</label>
                <input name="scale" className="form-control" value={props.data.scale} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-12">
                <label>链接URL</label>
                <input name="ad_url" className="form-control" value={props.data.ad_url} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-12">
                <label>图片URL</label>
                <input name="banner_url" className="form-control" value={props.data.banner_url} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-12">
                <label>描述</label>
                <textarea name="description" className="form-control" value={props.data.description} onChange={handleValueChange.bind(this, props)}></textarea>
            </div>
        </div>
    </form>
}