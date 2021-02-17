import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect} from 'react-router-dom';

import {Navbar } from "./components";
import {ListOrders, Order, CreateOrder} from './views'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/orders" component={ListOrders} />
        <Route exact path="/orders/create" component={CreateOrder} />
        <Route exact path="/orders/:orderId" component={Order} />


        <Redirect to="/orders" />
      </Switch>
    </>

  );
}

export default App;
