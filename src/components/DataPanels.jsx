import React from 'react';
import { Alert, List, Slider, Tooltip, Whisper, RangeSlider } from 'rsuite';
import './DataPanels.css'

const tempTooltip = (temp) => (
  <Tooltip>
    <i>Automatically turn fan on when temperature is above {Math.floor(temp)} C</i>
  </Tooltip>
);

const emailTooltip = (temp) => (
  <Tooltip>
    <i>Automatically email me when temperature is above {Math.floor(temp)} C</i>
  </Tooltip>
);

const waterTooltip = (humidity) => (
  <Tooltip>
    <i>Automatically turn on water vapor when below {Math.floor(humidity)} %</i>
  </Tooltip>
);



export default class DataPanels extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        humidity: 0,
        pressure: 0,
        temperature: 0,
        loading: false,
        fanThreshold: 50,
        waterThresholdTOP: 40,
        waterThresholdBOTTOM: 60,
        emailThreshold: 50,
        fanSlider: undefined,
        emailSlider: undefined,
        waterSliderBOTTOM: undefined,
        waterSliderTOP: undefined,
        fan: 1
      };
    }

    componentWillMount() {
      this._fetchData();
      setInterval(() => {
        this._fetchData();
      }, 5000);

      setInterval(() => {
        if (this.state.emailSlider !== this.state.emailThreshold 
          || this.state.fanSlider !== this.state.fanThreshold
          || this.state.waterSliderBOTTOM !== this.state.waterThresholdBOTTOM
          || this.state.waterSliderTOP !== this.state.waterThresholdTOP) {
          this._updateConfig(this.state.fanSlider, this.state.emailSlider, this.state.waterSliderTOP, this.state.waterSliderBOTTOM);
          this._fetchData();
        }
      }, 2000)
    }

    _fetchData() {
        this.setState({loading: true})
        fetch(`/api/stats`)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error(response.json())
            })
            .then(responseJSON => {
              console.log(responseJSON)
                this.setState({
                    success: true,
                    temperature: responseJSON.Temperature,
                    humidity: responseJSON.Humidity,
                    pressure: responseJSON.Pressure,
                    fan: responseJSON.FanStatus,
                    water: responseJSON.WaterStatus,
                    emailThreshold: responseJSON.thresholds.emailThreshold,
                    fanThreshold: responseJSON.thresholds.fanThreshold,
                    waterThresholdBOTTOM: responseJSON.thresholds.waterThresholdBOTTOM,
                    waterThresholdTOP: responseJSON.thresholds.waterThresholdTOP,
                    emailSlider: this.state.emailSlider || responseJSON.thresholds.emailThreshold,
                    fanSlider: this.state.fanSlider || responseJSON.thresholds.fanThreshold,
                    waterSlider: this.state.waterSlider || responseJSON.thresholds.waterThreshold,
                    data: responseJSON,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    success: false,
                    loading: false
                })
                Alert.error('Failed to fetch from API')
            })
    }


  _updateConfig(fan, email, top, bottom) {
    if (this.state.updating === true) return;
    this.setState({
      updating: true
    })
    const body = {
      emailThreshold: email,
      fanThreshold: fan,
      waterThresholdTOP: top,
      waterThresholdBOTTOM: bottom,
    }
    fetch(`/api/config`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(response => {
            this.setState({updating: false})
            if (response.status === 200) return
            throw new Error(response.json())
        })
        .catch(error => {
          this.setState({updating: false})
            console.log(error)
            Alert.error('Failed to fetch from API')
        })
  }

    render() {
      return (
        <List className="data-list" bordered>
            <List.Item key={0} index={0}>
                <div className="logo-text">
                  <img src="/logo256.png" alt="logo" className="logo"/>
                  <h2>Pi Dashboard</h2>
                </div>
            </List.Item>
            <List.Item key={1} index={1}>
                { this.state.success ? ( <p style={{color: 'green'}}>Status: Online</p> ) : ( <p style={{color: 'red'}}>Status: Offline</p> ) }
            </List.Item>
            <List.Item key={2} index={2}>
                { 'Temperature: ' + Math.floor(this.state.temperature) + ' C' }
            </List.Item>
            <List.Item key={3} index={3}>
                { 'Humidity: ' + Math.floor(this.state.humidity) + ' %' }
            </List.Item>
            <List.Item key={4} index={4}>
                { 'Pressure: ' + Math.floor(this.state.pressure) + ' Millibars' }
            </List.Item>
            <List.Item key={5} index={5}>
              <div  className="toggle-list">
                <div>
                  { (this.state.fan === 0) ? ( <p style={{color: 'green'}}>Fan Status: Online</p> ) : ( <p style={{color: 'red'}}>Fan Status: Offline</p> ) }
                </div>
              </div>
            </List.Item>
            <List.Item key={6} index={6}>
              <div  className="toggle-list">
                <div>
                  { (this.state.water === 0) ? ( <p style={{color: 'green'}}>Water Status: Online</p> ) : ( <p style={{color: 'red'}}>Water Status: Offline</p> ) }
                </div>
              </div>
            </List.Item>
            <List.Item key={7} index={7}>
              <div className="toggle-slider">
                <div>
                <Whisper placement="top" trigger="hover" speaker={tempTooltip(this.state.fanThreshold)}>
                  <p>Fan Threshold (Temperature)</p>
                </Whisper>
                </div>
                <div>
                { this.state.success && (<Slider defaultValue={this.state.fanThreshold} onChange={(value) => this.setState({fanSlider: value})} progress></Slider>) }
                </div>
              </div>
            </List.Item>
            <List.Item key={8} index={8}>
              <div className="toggle-slider">
                <div>
                <Whisper placement="top" trigger="hover" speaker={emailTooltip(this.state.emailThreshold)}>
                  <p>SMS Threshold (Temperature)</p>
                </Whisper>
                </div>
                <div>
                { this.state.success && (<Slider defaultValue={this.state.emailThreshold} onChange={(value) => this.setState({emailSlider: value})} progress></Slider>) }
                </div>
              </div>
            </List.Item>
            <List.Item key={9} index={9}>
              <div className="toggle-slider">
                <div>
                <Whisper placement="top" trigger="hover" speaker={waterTooltip(this.state.waterThreshold)}>
                  <p>Humidity Threshold</p>
                </Whisper>
                </div>
                <div>
                { this.state.success && (<RangeSlider defaultValue={[this.state.waterThresholdBOTTOM, this.state.waterThresholdTOP]} onChange={(value) => this.setState({waterSliderBOTTOM: value[0], waterSliderTOP: value[1]})}></RangeSlider>) }
                </div>
              </div>
            </List.Item>
        </List>
      );
    }
  }