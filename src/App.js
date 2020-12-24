import React, { Component } from "react";
import Layout from './Layouts/Layout';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout />
      </Router>
    );
  }
}
export default App;
