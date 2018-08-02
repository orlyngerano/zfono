import React, { Component } from 'react';
import {
  Container,
  Table,
  Button,
  Header
} from "semantic-ui-react";
import { connect } from 'react-redux';
import {COLOR_MAIN} from '../themes/color';
import Title from '../components/Title';

/**
 * Device Screen Component displays the detailed information of selected device.
 */
class Device extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (<Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
    <Title/>
    <Header size={'medium'}>{this.props.device.DeviceName}</Header>
    <Table color={COLOR_MAIN} celled collapsing>
    <Table.Body>
    {
      Object.keys(this.props.device).map((key, index)=>{
        return (<Table.Row key={index}>
          <Table.Cell><Header as='h4'>{key}</Header></Table.Cell>
          <Table.Cell>{this.props.device[key]}</Table.Cell>
        </Table.Row>);
      })
    }
    </Table.Body>
    </Table>
    <Button color={COLOR_MAIN} onClick={()=> this.props.history.push('/home') }>Go back</Button>
    </Container>);
  }
}

const mapStateToProps = state => {
  return {
    device: state.Device.device
  }
}

export default connect(mapStateToProps, null)(Device);
