import React, { Component } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {validateBounds, validateCount} from './validation'

class NewFactory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            childCount: '',
            lowerBound: '',
            upperBound: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.createFactory = this.createFactory.bind(this);
        this.socket = io(process.env.REACT_APP_SOCKET_HOST);
        this.socket.on('REFRESH', function(){
            props.refresh();
        });
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({[name]: value});
    }

    createFactory() {
        let factory = {
            name: this.state.name,
            childCount: Number(this.state.childCount),
            randomLowerBound: Number(this.state.lowerBound),
            randomUpperBound: Number(this.state.upperBound)
        }
        axios.post(process.env.REACT_APP_API_HOST, factory)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "New Factory"
                });
                this.props.refresh();
            })
    }

    render() {
        const count = validateCount(this.state.childCount);
        const bounds = validateBounds(this.state.lowerBound, this.state.upperBound);
        return (
                <div className="factory-content new-factory sticky">
                    <div className="factory-content-section">
                        <input type="text" title="Factory name" placeholder="Name" name="name" className="factory-name" value={this.state.name} onChange={this.handleChange} />
                        <FontAwesomeIcon title="Add Factory" onClick={this.createFactory} className="fa-button" icon="plus" />
                    </div>
                    <div className="factory-content-section">
                        <div className="factory-content-bottom">
                            <div>Children</div>
                            <div>
                                <input type="text" title="Child notes count" 
                                className={count ? "factory-count" : "factory-count error"} placeholder="Count" name="childCount" value={this.state.childCount} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="factory-content-bottom">
                            <div>Bounds</div>
                            <div>
                                <input type="text" placeholder="Upper" title="Upper random number bound" name="upperBound" 
                                    className={bounds.upper ? "factory-bound" : "factory-bound error"} value={this.state.upperBound} onChange={this.handleChange} />
                            </div>
                            <div><input type="text" placeholder="Lower" title="Lower random number bound" name="lowerBound" 
                                    className={bounds.lower ? "factory-bound" : "factory-bound error"} value={this.state.lowerBound} onChange={this.handleChange} /></div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default NewFactory;