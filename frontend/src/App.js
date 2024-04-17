import "./App.css";
import FilterData from "./Components/FilterData";
import Navbar from "./Components/Navbar";
import SummaryTable from "./Components/SummaryTable";
import WeatherApi from "./Components/WeatherApi";

function App() {
  return (
    <>
      <Navbar></Navbar>

      <FilterData></FilterData>
      <SummaryTable></SummaryTable>
      <WeatherApi></WeatherApi>
    </>
  );
}

export default App;
