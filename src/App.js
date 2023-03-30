import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ColorPickButton from './components/elements/ColorPickButton/ColorPickButton';
import PatternSelector, { pattern_types } from './app/PatternSelector/PatternSelector';
import PatternDrawer from './app/PatternDrawer/PatternDrawer';
function App() {
  const [colors, setColor] = useState("#aabbcc");
  const [pattern, setPattern] = useState('');
  const selectedColorChanged = (event) => {
    console.log("selectedColorChanged ", event);
    setColor(event);
  }
  const selectedPatternChanged = (event) => {
    console.log("selectedPatternChanged ", event);
    setPattern(event);
  }
  useEffect(() => {
    setPattern(pattern_types.at(0).name);
  }, [/* 任意の変数 */]);

  return (
    <div className="App">

      {/* <ColorPickDialog onSelectedColorChanged={selectedColorChanged} /> */}
      {/* <ColorPickButton onSelectedColorChanged={selectedColorChanged} /> */}

      <PatternSelector onSelectedPatternChanged={selectedPatternChanged} />

      <PatternDrawer selectedPattern={pattern} />
    </div>
  );
}

export default App;
