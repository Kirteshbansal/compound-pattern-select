import "./App.css";
import Select from "./select/Select";


function App() {
  return (
    <div className="App">
      <h1>Custom Select Component</h1>
      <Select>
        <Select.SelectBox>
          {selectData.map((item) => (
            <Select.Options key={item.value} value={item.value}>
              {item.label}
            </Select.Options>
          ))}
        </Select.SelectBox>
      </Select>
    </div>
  );
}

export default App;
