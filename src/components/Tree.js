import React, { Component } from 'react';
import Factory from "./Factory";
import NewFactory from "./NewFactory";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            factories: []
        }
        this.refreshTree = this.refreshTree.bind(this)
    }

    componentDidMount() {
        this.refreshTree();
    }

    refreshTree() {
        axios.get("http://localhost:8080/api/factories")
            .then(res => {
                const factories = res.data.data
                this.setState({factories});
            })
    }

    render() {
        return (
            <div>
                <div class="root-content">
                    <FontAwesomeIcon title="New Factory" className="root-button" icon="industry" />   
                    <div class="root-text">ROOT</div>
                </div>
                <div class="tree-content">
                <NewFactory refresh={this.refreshTree} />   
                {this.state.factories.map(i => { return (
                    <Factory factory={i} refresh={this.refreshTree} />
                    )}
                )}
                </div>
            </div>
        )
    }
}
//                             

export default Tree;

