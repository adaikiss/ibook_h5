'use strict';

import React from 'react'
import {render} from 'react-dom'
import SubjectBook from './SubjectBook.jsx'
import SubjectBlockItem from './SubjectBlockItem.jsx'

export default class SubjectBlock extends React.Component{

    marker_arrow = (
        <svg viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 0 0 l 50 50 m 0 0 l -50 50"></path>
        </svg>
    );


    render(){
        var data = this.props.data;
        var content = this.getContent(this.props.data);
        return (
            content
        );
    }

    getContent(data){
        if(SubjectBook.isBook(data.style)){
            return this.renderBook(data);
        }
        var renderer =  this["renderStyle" + data.style];
        if(renderer){
            return renderer.apply(this, [data]);
        }
        console.error('Missing style renderer!', data);
        return <div className="subject_block subject_block_placeholder"></div>;
    }

    handleItemClick(index, event){
        if(this.props.onClick){
            this.props.onClick(index, event);
            return;
        }
    }

    /**
     * 解析标签中的特殊样式标记
     * @param name
     * @param needBackgroundColor
     * @returns {{style: {}, text: *}}
     */
    static parseLinkTagName(name, needBackgroundColor){
        var data = {style:{}, text:name};
        //'<{"n":{"c":"#ffffff", "b":"#f47575"}, "st":1}>';
        if(name.startsWith('<{')){
            var endPos = name.indexOf('}>');
            if(endPos == -1) {
                return data;
            }
            var styleJson = JSON.parse(name.substring(1, endPos + 1));
            data.text = name.substring(endPos + 2);
            var n = styleJson.n;
            if(n != null){
                if(n.c != null){
                    data.style.color = n.c;
                }
                if(n.b != null && needBackgroundColor){
                    data.style.backgroundColor = n.b;
                }
                if(styleJson.st == 1){
                    data.marker = true;
                }
                if(Object.keys(data.style).length > 0){//有内容样式时不使用边框
                    data.style.border = 0;
                }
            }
        }
        return data;
    }

    /**
     * 书籍统一处理
     * @param data
     * @returns {XML}
     */
    renderBook(data){
        var max = data.items.length - 1;
        var hasHr = data.style != 18 && data.style != 26 && data.style != 30;
        var contents = [];
        data.items.map(function (item, index) {
            contents.push (
                <SubjectBlockItem key={index} onClick={this.handleItemClick.bind(this, index)}>
                    <SubjectBook data={item} bookStyle={data.style}/>
                </SubjectBlockItem>
            )
            if(hasHr && index < max){
                contents.push(<p className="hr" key={'hr' + index}/>);
            }
        }.bind(this));
        return (
            <div className={"subject_block subject_block_" + data.style }>
                {contents}
            </div>
        )
    }

    /**
     * 标签-统一处理
     * @param data
     * @returns {XML}
     */
    renderStyle2(data){
        return (
            <div className={"subject_block subject_block_" + data.style}>
                {data.items.map(function (item, index) {
                    var style = SubjectBlock.parseLinkTagName(item.name, true);
                    return (
                        <SubjectBlockItem key={index} onClick={this.handleItemClick.bind(this, index)}>
                            <div
                                className={"link_tag" + (style.marker?' marker':'') + (data.style==24?' subject_title':'')}>
                                <p style={style.style}>{style.text}</p>
                                {style.marker ? this.marker_arrow : null}
                            </div>
                        </SubjectBlockItem>
                    )
                }.bind(this))}
            </div>
        )
    }

    /**
     * banner
     * @param data
     * @returns {XML}
     */
    renderStyle4(data){
        return (
            <div className={"subject_block subject_block_banner subject_block_banner_" + data.items.length}>
                {data.items.map(function (item, index) {
                    return (
                        <SubjectBlockItem key={index} onClick={this.handleItemClick.bind(this, index)}>
                            <div className="banner_wrapper" key={index}>
                                <img src={item.banner_url} style={{height:item.scale * 100 + '%'}}/>
                            </div>
                        </SubjectBlockItem>
                    )
                }.bind(this))}
            </div>
        )
    }

    /**
     * 标签-纯文字
     * @param data
     * @returns {XML}
     */
    renderStyle9(data){
        return this.renderStyle2.apply(this, arguments);
    }

    /**
     * 书-九宫格
     * @param data
     */
    renderStyle18(data){
        // book
    }

    /**
     * 标签-专题名称标签
     * @param data
     * @returns {XML}
     */
    renderStyle24(data){
        return this.renderStyle2.apply(this, arguments);
    }

    /**
     * 标签-带颜色长标签
     * @param data
     * @returns {XML}
     */
    renderStyle27(data){
        return this.renderStyle2.apply(this, arguments);
    }

    /**
     * 标签-单行标签椭圆边框
     * @param data
     * @returns {XML}
     */
    renderStyle36(data){
        return this.renderStyle2.apply(this, arguments);
    }

    /**
     * 样式块-头条样式3-小图1标签
     * @param data
     * @returns {XML}
     */
    renderStyle41(data){
        return (
            <div className={"subject_block subject_block_" + data.style} onClick={this.handleItemClick.bind(this, -1)}>
                <div className="clearfix">
                    <div className="cover">
                        <img src={data.cover}/>
                    </div>
                    <div className="info_block">
                        <span>{data.items[0].name}</span>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 样式块-头条样式4-大图2标签
     * @param data
     * @returns {XML}
     */
    renderStyle42(data){
        return (
            <div className={"subject_block subject_block_" + data.style} onClick={this.handleItemClick.bind(this, -1)}>
                <div className="clearfix">
                    <div className="cover">
                        <img src={data.cover}/>
                    </div>
                    <div className="info_block">
                        <p className="title line_1">{data.items[0].name}</p>
                        <p className="inner_hr"></p>
                        <p className="content line_3">{data.items[1].name}</p>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 样式块-主贴头条样式
     * @param data
     */
    renderStyle45(data){
        return (
            <div className={"subject_block subject_block_" + data.style} onClick={this.handleItemClick.bind(this, -1)}>
                <div className="clearfix">
                    <div className="cover">
                        <img src={data.cover}/>
                    </div>
                    <div className="info_block">
                        <p className="title line_1"><span className={"topic_type topic_type_" + data.items[0].type}>{data.items[0].typeName}</span>{data.items[0].title}</p>
                        <p className="inner_hr"></p>
                        <p className="content line_2">{data.items[0].content}</p>
                        <p className="data"><span>{data.items[0].replyCount}</span><span>{data.items[0].upCount}</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

