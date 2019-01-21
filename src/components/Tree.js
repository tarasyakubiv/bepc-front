import React, { Component } from 'react';
import Factory from "./Factory";
import NewFactory from "./NewFactory";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            factories: [],
            newFactory: false
        }
        this.refreshTree = this.refreshTree.bind(this)
        this.toggleNewFactory = this.toggleNewFactory.bind(this)
    }

    componentDidMount() {
        this.refreshTree();
    }

    toggleNewFactory() {
        let newFactory = !this.state.newFactory;
        this.setState({newFactory});
    }

    refreshTree() {
        axios.get(process.env.REACT_APP_API_HOST)
            .then(res => {
                const factories = res.data.root
                this.setState({factories});
            })
    }

    render() {
        return (
            <div className="base">
                <div className="root-content">
                    <FontAwesomeIcon title="New Factory" onClick={this.toggleNewFactory} className="root-button" icon="industry" />   
                    <div className="root-text">ROOT</div>
                </div>
                <div className="tree-content">
                {(()=>{
                if (this.state.newFactory)
                    return <NewFactory refresh={this.refreshTree} /> 
                })()}   
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

