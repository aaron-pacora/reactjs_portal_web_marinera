import React, { Component } from 'react';
import global from '../../../../../../providers/global.static.jsx';
import Contest from './day/contest';
import DateParser from './../../../../../util/date_parser.js'
class Day extends Component {
    constructor(props){
        super(props);
        this.date= this.props.date;
        this.contests=[];
        this.contests=JSON.parse(this.props.contests);
    }   
    render() {
        return (
            <div className="content_day">
                <h2 className="content_subtitle">
                    {DateParser.parseToString(this.date)}
                </h2>

                {this.contests.map((element)=>//element type== json
                    <Contest data={element}
                                id ={element.id}
                                addArrayHeights={this.props.addArrayHeights}
                                getArrayHeights={this.props.getArrayHeights}/>
                )}
            </div> 

        );
    }
    
}

export default Day;