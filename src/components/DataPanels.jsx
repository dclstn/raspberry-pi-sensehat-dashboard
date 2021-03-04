import React from 'react';
import { Alert, List } from 'rsuite';
import './DataPanels.css'

export default class DataPanels extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        humidity: 0,
        pressure: 0,
        temperature: 0,
        loading: false
      };
    }

    componentWillMount() {
      this._fetchData();
      setInterval(() => {
        this._fetchData();
      }, 10000);
    }

    _fetchData() {
        this.setState({loading: true})
        fetch(`http://192.168.0.200/api/stats`)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error(response.json())
            })
            .then(responseJSON => {
                this.setState({
                    success: true,
                    temperature: responseJSON.Temperature,
                    humidity: responseJSON.Humidity,
                    pressure: responseJSON.Pressure,
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

    render() {
      return (
        <List className="data-list" bordered hover>
            <List.Item key={0} index={0}>
                <h2>Statistics</h2>
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
        </List>
      );
    }
  }