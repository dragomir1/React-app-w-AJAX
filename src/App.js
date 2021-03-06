import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';
// enable the routing package in App.js.
// then we need to wrap the part of the app that should be able to render routes.
// wrap it with the a component that was imported with the router-dom package
//
import {BrowserRouter} from 'react-router-dom';

// once we get the BrowserRouter object , we need to wrap everything in the app that uses routing woith that.
// once wrapped, it has now become the router of the application. and we can use routing features from that routing package anywhere inside this wrapping component
class App extends Component {
  render() {
    {/*This sets the basepath for the react router if you're serving your app from example.com/my-app.  if youre serving your app from a sub directory.  then all your requests are routed against my-app/{the  youre pointing to}*/}
    {/*<BrowserRouter basename = "/my-app">*/}
    return (
      <BrowserRouter>
      <div className="App">
        <Blog />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
