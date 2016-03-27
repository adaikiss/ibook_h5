'use strict'

import React from 'react'
import {render} from 'react-dom'
function handleValueChange(props, event){
    props.data[event.target.name] = event.target.value;
    props.handleValueChange();
}
var CATEGORIES = {
    1 : "现代言情",
    58 : "现代言情",
    158 : "现代言情",
    2 : "古代言情",
    3 : "玄幻奇幻",
    4 : "武侠仙侠",
    5 : "游戏竞技",
    6 : "幻想言情",
    7 : "历史军事",
    8 : "灵异悬疑",
    9 : "影视剧本",
    10 : "科幻灵异",
    11 : "文史传记",
    12 : "穿越重生",
    14 : "经管励志",
    15 : "社科科普",
    16 : "文学艺术",
    17 : "都市校园",
    13 : "都市校园",
    18 : "教育教辅",
    161 : "时尚生活",
    159 : "畅销小说",
};
export default function LinkTagForm(props){
    Utils.fallback(props.data, 'bid', '');
    Utils.fallback(props.data, 'bookstore', '1');
    Utils.fallback(props.data, 'name', '');
    Utils.fallback(props.data, 'author', '');
    Utils.fallback(props.data, 'bigCoverLogo', '');
    Utils.fallback(props.data, 'status', '连载');
    Utils.fallback(props.data, 'word_count', '0');
    Utils.fallback(props.data, 'click_count', '0');
    Utils.fallback(props.data, 'categoryId', '1');
    Utils.fallback(props.data, 'keywords', '');
    Utils.fallback(props.data, 'dynamicField', '');
    Utils.fallback(props.data, 'dynamicFieldType', 0);
    Utils.fallback(props.data, 'current_chapter', '0');
    Utils.fallback(props.data, 'format', 0);
    Utils.fallback(props.data, 'score', 0);
    Utils.fallback(props.data, 'sub_title', '');
    Utils.fallback(props.data, 'long_sub_title', '');
    Utils.fallback(props.data, 'introduction', '');
    return <form>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>BID</label>
                <input name="bid" className="form-control" value={props.data.bid} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>bookstore</label>
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
                <label>作者</label>
                <input name="author" className="form-control" value={props.data.author} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>封面</label>
                <input name="bigCoverLogo" className="form-control" value={props.data.bigCoverLogo} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>连载状态</label>
                <div>
                    <label className="radio-inline"><input type="radio" name="status" value="连载" onChange={handleValueChange.bind(this, props)} checked={props.data.status=='连载'}/> 连载</label>
                    <label className="radio-inline"><input type="radio" name="status" value="完本" onChange={handleValueChange.bind(this, props)} checked={props.data.status=='完本'}/> 完本</label>
                </div>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>字数</label>
                <input name="word_count" className="form-control" value={props.data.word_count} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>点击数</label>
                <input name="click_count" className="form-control" value={props.data.click_count} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>分类</label>
                <select name="categoryId" className="form-control" value={props.data.categoryId} onChange={handleValueChange.bind(this, props)}>
                    <option value="1" >现代言情</option>
                    <option value="58" >现代言情</option>
                    <option value="158" >现代言情</option>
                    <option value="2" >古代言情</option>
                    <option value="3" >玄幻奇幻</option>
                    <option value="4" >武侠仙侠</option>
                    <option value="5" >游戏竞技</option>
                    <option value="6" >幻想言情</option>
                    <option value="7" >历史军事</option>
                    <option value="8" >灵异悬疑</option>
                    <option value="9" >影视剧本</option>
                    <option value="10" >科幻灵异</option>
                    <option value="11" >文史传记</option>
                    <option value="12" >穿越重生</option>
                    <option value="14" >经管励志</option>
                    <option value="15" >社科科普</option>
                    <option value="16" >文学艺术</option>
                    <option value="17" >都市校园</option>
                    <option value="13" >都市校园</option>
                    <option value="18" >教育教辅</option>
                    <option value="161" >时尚生活</option>
                    <option value="159" >畅销小说</option>
                </select>
            </div>
            <div className="form-group col-sm-6">
                <label>标签</label>
                <input name="keywords" className="form-control" value={props.data.keywords} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>动态字段类型</label>
                <select name="dynamicFieldType" className="form-control" value={props.data.dynamicFieldType} onChange={handleValueChange.bind(this, props)}>
                    <option value="0">没有</option>
                    <option value="1">点击数</option>
                    <option value="2">促销额外数据</option>
                    <option value="3">订购数</option>
                    <option value="4">书籍分类</option>
                    <option value="5">书籍字数</option>
                    <option value="6">书籍投票数</option>
                </select>
            </div>
            <div className="form-group col-sm-6">
                <label>动态字段</label>
                <input name="dynamicField" className="form-control" value={props.data.dynamicField} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>章节数</label>
                <input name="current_chapter" className="form-control" value={props.data.current_chapter} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>书籍格式</label>
                <select name="format" className="form-control" value={props.data.format} onChange={handleValueChange.bind(this, props)}>
                    <option value="0">txt</option>
                    <option value="1">epub</option>
                </select>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-6">
                <label>评分</label>
                <input name="score" className="form-control" value={props.data.score} onChange={handleValueChange.bind(this, props)}/>
            </div>
            <div className="form-group col-sm-6">
                <label>短推荐语</label>
                <input name="sub_title" className="form-control" value={props.data.sub_title} onChange={handleValueChange.bind(this, props)}/>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-12">
                <label>长推荐语</label>
                <textarea name="long_sub_title" className="form-control" value={props.data.long_sub_title} onChange={handleValueChange.bind(this, props)}></textarea>
            </div>
        </div>
        <div className="clearfix">
            <div className="form-group col-sm-12">
                <label>简介</label>
                <textarea name="introduction" className="form-control" value={props.data.introduction} onChange={handleValueChange.bind(this, props)}></textarea>
            </div>
        </div>
    </form>
}