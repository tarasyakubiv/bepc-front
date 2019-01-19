import React, { Component } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        this.socket = io('localhost:8080');
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
        axios.post("http://localhost:8080/api/factories", factory)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "New Factory"
                });
                this.props.refresh();
            })
    }

    render() {
        return (
            <div>
        <label>
          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Child Count:
          <input type="text" name="childCount" value={this.state.childCount} onChange={this.handleChange} />
        </label>
        <label>
          Lower Bound:
          <input type="text" name="lowerBound" value={this.state.lowerBound} onChange={this.handleChange} />
        </label>
        <label>
          Upper Bound:
          <input type="text" name="upperBound" value={this.state.upperBound} onChange={this.handleChange} />
        </label>
        <FontAwesomeIcon title="Add Factory" onClick={this.createFactory} className="fa-button" icon="plus" />
            </div>
        )
    }
}

export default NewFactory;