import React from "react"
import PathFindingView from './PathFindingView'


var temp = {
    board: [],
    mousePressed: false,
    currentGrid: {
      row: -1,
      col: -1,
      start: false,
      end: false,
      previous: null,
      top: null,
      bottom: null,
      left: null,
      right: null,
      wall: false,
    }
  };
class App extends React.Component {
    render() {
        return ( 
        <PathFindingView />
    }
}

export default App;