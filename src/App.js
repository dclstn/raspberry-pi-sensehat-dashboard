import 'rsuite/dist/styles/rsuite-dark.css';
import './App.css';
import DataChart from './components/DataCharts'
import DataPanels from './components/DataPanels'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataPanels></DataPanels>
        <DataChart></DataChart>
      </header>
    </div>
  );
}

export default App;
