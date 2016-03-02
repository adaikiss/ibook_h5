'use strict';
import React from 'react'
import { render } from 'react-dom'
import Toolbar from './fragments/Toolbar.jsx'
import ToolbarSearchBtn from './fragments/ToolbarSearchBtn.jsx'
import SubjectBlock from './fragments/SubjectBlock.jsx'
import SubjectBook from './fragments/SubjectBook.jsx'
import Runtime from '../runtime.js'
export default (function(){

    class CircleNavContainer extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                data: null
            };
        }

        componentWillMount() {
            Runtime.loadData(Runtime.api.circleNav, function(data){
                if(data.items.length > 0){
                    this.setState({data: data.items[0].items});
                }
            }.bind(this));
        }

        onNavItemClick(){
            console.debug(arguments);
        }

        render(){
            var scope = this;
            return (
                this.state.data === null?(<div className="placeholder"></div>):
                    (<div className="circle_nav flex">
                        {this.state.data.map(function(item, index) {
                            return (
                                <CircleNav data={item} key={index} handleClick={scope.onNavItemClick.bind(scope)}/>
                            );
                        })}
                    </div>)
            )
        }
    }

    class CircleNav extends React.Component{
        render(){
            return (
                <div className="flex_item circle_nav" onClick={this.props.handleClick||noop}>
                    <div><img src={this.props.data.banner_url}/></div>
                    <div>{this.props.data.name}</div>
                </div>
            )
        }
    }

    class CircleSubjectContainer extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                data: []
            };
        }

        componentWillMount() {
            Runtime.loadData(Runtime.api.circleSubjects, function(data){
                if(data.subjects.length > 0){
                    this.setState({data: data.subjects});
                }
            }.bind(this));
        }

        renderData(){
            var debug = (<div id="debug">
                <textarea style={{width:'100%'}} onChange={this.renderData.bind(this)}></textarea>
            </div>);
            var data = JSON.parse($('#debug textarea').val());
            console.debug(data);
            this.setState({data: data.subjects});
        }

        render(){
            var scope = this;

            return (
                this.state.data === null?(<div className="placeholder"></div>):
                (<div className="circle_subjects">

                    {this.state.data.map(function(item, index) {
                        return (
                            <CircleSubject data={item} key={index} />
                        );
                    })}
                </div>)
            )
        }
    }

    class CircleSubject extends React.Component{
        render(){
            var title = ""
            if(this.props.data.titleStyle > 0){
                title = (
                    <div className={"link_tag subject_title"}>
                        <p>{this.props.data.name}</p>
                    </div>
                )
            }
            return (
                <div className="subject circle_subject">
                    {title}
                    <div className="subject_block_container">
                    {this.props.data.items.map(function(item, index){
                        return item.type == 0?<SubjectBook data={item} bookStyle={this.props.data.style} key={index} />:<SubjectBlock data={item} key={index}/>
                    }.bind(this))}
                    </div>
                </div>
            )
        }
    }

    return class Circle extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                data: null,
                onModify: false
            };
        }

        onToolbarSearchClick(){
            console.debug(this, arguments);
        }

        render() {
            return (
                <div id="page_circle" className="page">
                    <Toolbar>
                        <ToolbarSearchBtn title="全网覆盖 轻松找书" handleClick={this.onToolbarSearchClick.bind(this)}></ToolbarSearchBtn>
                    </Toolbar>
                    <CircleNavContainer></CircleNavContainer>
                    <CircleSubjectContainer></CircleSubjectContainer>
                </div>
            );
        }
    };
}());
