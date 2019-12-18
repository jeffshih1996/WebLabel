import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Batchs from './Batchs';
import Form from './Form';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            newBatch: { id: null, name: null, pack: null },
        };
    }

    handleClose = () => { this.setState({ show: false }); }

    handleShow = () => { this.setState({ show: true }); }

    handleAddBatch = (newBatch) => { console.log('aaaaaaaaaaaa', newBatch); this.setState({ newBatch }); }

    render() {
        const { show, newBatch } = this.state;
        return (
            <div className="container-full">
                <div className="row p-3">
                    <Button variant="primary" onClick={this.handleShow}>
                    Open Create Batch Modal
                    </Button>
                    <Form
                        show={show}
                        parentCallHide={this.handleClose}
                        onAddBatch={this.handleAddBatch}
                    />
                </div>
                <div className="row p-3">
                    <Batchs newBatch={newBatch} />
                </div>
            </div>
        );
    }
}


export default connect(null, {})(Dashboard);
