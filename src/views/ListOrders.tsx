import React from 'react';
import {APIHandler, APIMelonn} from '../utils';
import {OrderListItem} from '../components';
import {Table} from 'react-bootstrap';

export default class ListOrders extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      orders: [],
      shippingMethods: []
    };
  }

  componentDidMount () {
    const apigwClient = new APIHandler();
    const apiMelonn = new APIMelonn();
    this.getAllOrders(apigwClient, apiMelonn)
  }

  async getAllOrders(clientA: any, clientM: any) {
    try {
      this.setState({shippingMethods: (await clientM.getShippingMethods()).data})
      this.setState({orders: (await clientA.getOrders()).data})
    } catch (error) {
      console.log(error);
      this.setState({orders: []});
    }
  }


  render() {

    const allOrders = this.state.orders.map((article: any, i: any) => <OrderListItem id={i} key={i} article={article} shipping={this.state.shippingMethods}/>);
    return (
      <>
        <div className='center'>
          <Table striped bordered hover>
            <thead>
                <tr>
                <th>Sell order number</th>
                <th>Seller store</th>
                <th>Creation date</th>
                <th>Shipping method</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {allOrders}
            </tbody>
          </Table>
        </div>

      </>
    );
  }
}
