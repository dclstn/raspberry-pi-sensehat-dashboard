import React from 'react';
import { Alert, Panel } from 'rsuite';
import { Line } from 'react-chartjs-2';
import './DataPanels.css'

export default class DataChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false,
        humidityData: {},
        pressureData: {},
        temperatureData: {},
        dates: {}
      };
    }

    componentWillMount() {
      this._fetchData();
      setInterval(() => {
        this._fetchData();
      }, 1000 * 60 * 5);
    }

    _fetchData() {
        this.setState({loading: true})
        fetch(`http://192.168.0.200/api/csv`)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error(response.json())
            })
            .then(responseJSON => {
                this.setState({
                    success: true,
                    data: responseJSON.splice(-10, 10),
                    loading: false
                });
                this.transformData()
            })
            .catch(error => {
                this.setState({
                    success: false,
                    loading: false
                })
                Alert.error('Failed to fetch from API')
            })
    }

    transformData() {


      this.setState({dates: this.state.data.map(each => {
        const date = new Date(each.date * 1);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ':' + minutes.substr(-2)
        return formattedTime;
        })
      })

      this.setState({
        humidityData: {
          labels: this.state.dates,
          datasets:[
            {
              label: 'Humidity (%)',
              data: this.state.data.map(each => each.humidity),
              fill: true,
              backgroundColor: "rgba(255, 173, 173, 0.3)"
            }
          ]
        },
        temperatureData: {
          labels: this.state.dates,
          datasets:[
            {
              label: 'Temperature (C)',
              data: this.state.data.map(each => each.temperature),
              fill: true,
              backgroundColor: "rgba(255, 214, 165, 0.3)"
            }
          ]
        },
        pressureData: {
          labels: this.state.dates,
          datasets:[
            {
              label: 'Air Pressure (Millibars)',
              data: this.state.data.map(each => each.pressure),
              fill: true,
              backgroundColor: "rgba(202, 255, 191, 0.3)"
            }
          ]
        }
      })
    }

    render() {

      const { humidityData, pressureData, temperatureData } = this.state;

      return (
        <Panel bordered className="data-list">
          <Line data={temperatureData}></Line>
          <Line data={humidityData}></Line>
          <Line data={pressureData}></Line>
        </Panel>
      );
    }
  }