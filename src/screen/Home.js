import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  List,
  Dimmer,
  Loader,
  Divider,
  Input
} from "semantic-ui-react";
import {RECEIVE_DEVICES, REQUEST_DEVICE} from '../actions/Device';
import {COLOR_MAIN} from '../themes/color';
import fono from '../api/fono';
import Title from '../components/Title';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      loading: false,
      latest: false
    };
  }

  
  static getDerivedStateFromProps(nextProps, prevState) {
    if(typeof nextProps.searchWord != 'undefined'){
      prevState.searchWord = nextProps.searchWord;
    }
    
    if(typeof nextProps.latest != 'undefined'){
      prevState.latest = nextProps.latest;
    } 
    return prevState;
  }

  componentDidMount() {
    if(this.state.latest){
      this.getLatest();
    }else{
      this.getDevice();
    }    
  }

  async getDevice(){
    if(!this.state.searchWord){
      return;
    }
    this.setState({
      loading: true,
      latest: false
    });
    try{
      let devices = await fono.getDevice(this.state.searchWord);
      this.props.dispatch({type: RECEIVE_DEVICES, devices: devices.data, latest: false, searchWord: this.state.searchWord});
    }catch(e){
      console.log(e);
    }
    this.setState({loading: false});
  }

  async getLatest(){
    this.setState({
      loading: true,
      latest: true
    });
    try{
      let devices = await fono.getLatest();
      this.props.dispatch({type: RECEIVE_DEVICES, devices: devices.data, latest: true});
    }catch(e){
      console.log(e);
    }
    this.setState({loading: false});
  }  

  render() {
    return (<Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
     <Dimmer active={this.state.loading}>
     <Loader/>
     </Dimmer>
    <Title/>
    <Input style={{ width: '100%', marginTop: '10px'}} 
        placeholder='Type a mobile ex. A8' 
        value={this.state.searchWord}
        onChange={(event, data)=>{
          this.setState({searchWord: data.value});
        }} 
        action={<Button color={COLOR_MAIN} icon='search' onClick={() => {
          this.getDevice();
        }} />} />
    <div style={{ paddingTop: '10px', color: '#aaa' }}>
      { !this.state.latest || <span>Latest</span> } 
      { this.state.latest || ( <div>{this.props.devices.length} devices found | <a style={{cursor: 'pointer'}} onClick={()=>{
        this.getLatest();
      }}>Show Latest</a></div>)} 
    </div>
    <List relaxed>      
    <Divider/>
      {this.props.devices.map((item, index)=>{
          return (<List.Item key={index} style={{ marginBottom: '10px' }} as='a' onClick={()=>{
            this.props.dispatch({type: REQUEST_DEVICE, device: item});
            this.props.history.push('/device');
          }}>
              <List.Content>
                <List.Header>{item.DeviceName}</List.Header>
                <List.Description>
                <i>features:</i>&nbsp; 
                {item.features}{item.features_c}
                </List.Description>
                <div>

                </div>                
              </List.Content>
            </List.Item>);
        })}
    </List>  
    </Container>);
  }
}

const mapStateToProps = state => {
  return {
    devices: state.Device.devices,
    searchWord: state.Device.searchWord,
    latest: state.Device.latest
  }
}

export default connect(mapStateToProps, null)(Home);
