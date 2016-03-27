'use strict';

import React from 'react'
import {render} from 'react-dom'
var defaultThumb = require('../../../images/def_thumb.png')

export default class SubjectBook extends React.Component{
    static book_styles = [8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 26, 29, 30, 31, 34, 43];

    static isBook(style){
        return SubjectBook.book_styles.indexOf(style) != -1;
    }

    formatTags(tags){
        if(tags == null){
            return [];
        }
        return $.trim(tags).split(/[;,:；，；\s]+/g);
    }

    render(){
        var data = this.props.data;
        var content = this.getContent(this.props.data, this.props.bookStyle);
        return (
            content
        );
    }

    getContent(data, bookStyle){
        var renderer =  this["renderStyle" + bookStyle];
        if(renderer){
            return renderer.apply(this, [data, bookStyle]);
        }
        console.debug(data, bookStyle);
        return <div className="subject_book subject_book_placeholder"></div>;
    }

    getMark(data){
        return data.mark != ''?<img className="mark" src={data.mark}/>:null
    }
    //
    //getDynamicField(data){
    //    return data.dynamicField?<span className="data">{data.dynamicField}</span>:null
    //}

    getBookName(data){
        return data.sub_title||data.name;
    }

    getBookCover(data){
        return (
            <div className="book_cover">
                <img src={data.bigCoverLogo}/>
            </div>
        )
    }

    getIntro(data){
        return data.long_sub_title || data.introduction
    }

    getTags(data){
        var tags = [];
        this.formatTags(data.keywords).map(function(item, index){
            if(index > 2){
                return false;
            }
            tags.push(<div key={index}><span key={index}>{item}</span></div>);
        });
        return tags;
    }

    getStarRank(data){
        var rank = parseInt((data.score * 10));
        var star = (
            <span className={"star_rank" + ' star_rank_' + rank}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>
        );
        return star;
    }

    /**
     * 书-促销-单行简洁版
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle8(data, bookStyle){
        return (
            <div className={"book clearfix"} onClick={this.props.onClick}>
                <div className="clearfix">
                    <p className="name">
                        {this.getBookName(data)}
                        <span className="data highlight">{data.activityName}</span>
                    </p>
                </div>
            </div>
        )
    }

    /**
     * 书-封面关键词
     * @param data
     * @param bookStyle
     */
    renderStyle10(data, bookStyle){

        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                            {this.getBookName(data)}
                            {this.getMark(data)}
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
                <div className="info tags">{this.getTags(data)}</div>
            </div>
        )
    }


    /**
     * 书-封面评分
     * @param data
     * @param bookStyle
     */
    renderStyle11(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                        {this.getBookName(data)}
                        {this.getMark(data)}
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        <p className="info">{this.getStarRank(data)}</p>
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 书-封面数据
     * 封面   书名
     *        状态|作者
     *        数据
     *        描述
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle12(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                            {this.getBookName(data)}
                            {this.getMark(data)}
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        {data.dynamicField ? <p className="info">{data.dynamicField}</p> : null}
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 书-关键词
     * @param data
     * @param bookStyle
     */
    renderStyle13(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    <p className="name">
                        {this.getBookName(data)}
                        {this.getMark(data)}
                    </p>
                    <p className="info">{data.status} | {data.author}</p>
                    <p className="intro line_2">{this.getIntro(data)}</p>
                </div>
                <div className="info tags">{this.getTags(data)}</div>
            </div>
        )
    }

    /**
     * 书-评分
     * @param data
     * @param bookStyle
     */
    renderStyle14(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    <p className="name">
                        {this.getBookName(data)}
                        {this.getStarRank(data)}
                    </p>
                    <p className="info">{data.status} | {data.author}</p>
                    <p className="intro line_2">{this.getIntro(data)}</p>
                </div>
            </div>
        )
    }

    /**
     * 书-数据
     * 书名   数据
     * 状态|作者
     * 描述
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle15(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    <p className="name">
                        {this.getBookName(data)}
                        {data.dynamicField?<span className="data highlight">{data.dynamicField}</span>:null}
                    </p>
                    <p className="info">{data.status} | {data.author}</p>
                    <p className="intro line_2">{this.getIntro(data)}</p>
                </div>
            </div>
        )
    }

    /**
     * 书-带促销信息
     * @param data
     * @param bookStyle
     */
    renderStyle16(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                            {this.getBookName(data)}
                            <span className="data">{data.activityLabel}</span>
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        <p className="info discount_info">{this.getMark(data)}
                        {data.activityValue}
                        |
                        {data.activityState + '折'}
                        {data.activityId + '人已购买'}
                        </p>
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 书-单行简洁版
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle17(data, bookStyle){
        return (
            <div className={"book clearfix"} onClick={this.props.onClick}>
                <div className="clearfix">
                    <p className="name">
                        {this.getBookName(data)}
                        {this.getMark(data)}
                        {data.dynamicField?<span className="data highlight">{data.dynamicField}</span>:null}
                    </p>
                </div>
            </div>
        )
    }

    /**
     * 书-九宫格
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle18(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <p className="name line_2">{this.getBookName(data)}</p>
                </div>
            </div>
        )
    }

    /**
     * 书-九宫格-不带文字
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle26(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                </div>
            </div>
        )
    }

    /**
     * 书-封面-关键字
     * 封面   书名
     *        状态|作者
     *        关键词
     *        描述
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle29(data, bookStyle){
        var tags = [];
        this.formatTags(data.keywords).map(function(item, index){
            if(index > 2){
                return false;
            }
            tags.push(<span key={index}>{item}</span>);
        });
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                            {this.getBookName(data)}
                            {this.getMark(data)}
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        <p className="info tags">{tags}</p>
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 书-九宫格带分类
     * @param data
     * @param bookStyle
     * @returns {XML}
     */
    renderStyle30(data, bookStyle){
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <p className="category">{data.category}</p>
                </div>
            </div>
        )
    }

    /**
     * 书-榜单排行样式
     * @param data
     * @param bookStyle
     */
    renderStyle31(data, bookStyle){
        //TODO://
        return (
            <div className="book clearfix" onClick={this.props.onClick}>
                <div className="clearfix">
                    {this.getBookCover(data)}
                    <div className="info_block">
                        <p className="name">
                            {this.getBookName(data)}
                            {this.getMark(data)}
                        </p>
                        <p className="info">{data.status} | {data.author}</p>
                        {data.dynamicField ? <p className="info">{data.dynamicField}</p> : null}
                        <p className="intro line_2">{this.getIntro(data)}</p>
                    </div>
                </div>
            </div>
        )
    }
}