import React, {Component} from 'react';
import AddTransaction from './AddTransaction';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import Header from './Header'

class DataInputDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            isDisableSaveButton: true,
            openModal: false,
            uniqueKey: props.uniqueKey || ''
        }

    }

    handleChange = (args) => {

        this.props.onChange(args)


    }

    hideDialog = () => {
        this.props.hideDialog(false)
    }

    save = () => {

        this.props.onSave(this.state.uniqueKey)


    }

    isValidateItem = (isValid) => {

        if (isValid) {
            this.setState({isDisableSaveButton: false})
        } else {
            this.setState({isDisableSaveButton: true})
        }
    }

    render() {
        return ((
            <Grid className="add-modal" fluid={true} style={{width: this.props.width}}>
                <Header className="add-modal-header"/>
                <Glyphicon onClick={this.hideDialog} className="close-modal"
                           glyph="glyphicon glyphicon-remove" bsSize={'large'}/>
                <AddTransaction onChange={this.handleChange}
                         isValidItem={this.isValidateItem}
                         data={this.props.data}
                />

                <Row className="saveRow">
                    {/*<Col md={4} className="saveCol">*/}
                    {/*<input type="file" id="files" name="files[]" multiple onChange={this.handleUpload}/>*/}
                    {/*<output id="list"></output>*/}
                    {/*</Col>*/}

                    {/*<Col md={2} className="saveCol">*/}
                    {/*<Button bsStyle="primary" className="saveButton"*/}
                    {/*onClick={this.save}>Upload</Button>*/}
                    {/*</Col>*/}

                    <Col md={2} className="saveCol">
                        <Button bsStyle="primary" className="saveButton"
                                disabled={this.state.isDisableSaveButton}
                                onClick={this.save}>Save</Button>
                    </Col>

                </Row>
            </Grid>
        ))
    }


}

export default DataInputDialog


