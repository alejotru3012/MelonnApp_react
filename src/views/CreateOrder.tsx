import React from 'react';
import {APIMelonn} from '../utils';
import {APIHandler} from '../utils';
import {Form, Button, Table} from 'react-bootstrap';
// import SweetAlert from 'sweetalert-react';
const SweetAlert = require('sweetalert-react');

export default class CreateOrder extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        shippingMethods: [],
        success: false,

        product_name: "",
        product_qty: 0,
        product_weight: 0,


        seller_store: '',
        shipping_method: 1,
        external_order_number: '',
        buyer_full_name: '',
        buyer_phone_number: '',
        buyer_email: '',
        shipping_address: '',
        shipping_city: '',
        shipping_region: '',
        shipping_country: '',
        items: []

    };
  }

  componentDidMount () {
    const apiMelonn = new APIMelonn();
    this.getAllOrders(apiMelonn)

  }

  async getAllOrders(clientM: any) {
    try {
      this.setState({shippingMethods: (await clientM.getShippingMethods()).data})
    } catch (error) {
      console.log(error);
      this.setState({shippingMethods: []});
    }
  }

  handleChange = (input: any) => (e: any) => {
    // console.log(e)
    this.setState({
      [input]: e.target.value
    });
  }

  handleNumericChange = (input: any) => (e: any) => {

    this.setState({
        [input]: parseInt(e.target.value)
    });
  }

  renderShippingOptions() {
    const options = this.state.shippingMethods;
    let result: any = []
    options.forEach((option: any) => {
        result.push(
            <option key={option.id} value={option.id}>{option.name}</option>
        )
    })
    return result;
  }

  async confirmOrder(e: any) {
    e.preventDefault();
    // console.log(e)
    const order = {
        seller_store: this.state.seller_store,
        shipping_method: this.state.shipping_method,
        external_order_number: this.state.external_order_number,
        buyer_full_name: this.state.buyer_full_name,
        buyer_phone_number: this.state.buyer_phone_number,
        buyer_email: this.state.buyer_email,
        shipping_address: this.state.shipping_address,
        shipping_city: this.state.shipping_city,
        shipping_region: this.state.shipping_region,
        shipping_country: this.state.shipping_country,
        items: this.state.items
    }

    if (Object.values(order).indexOf('') > -1 || order.items.length == 0) {
        alert("You must complete all fields and select 1 or more products")
        return;
    }

    try {
        const api = new APIHandler();
        let result: any = await api.createOrder(order);
        // console.log(result.data);
        if (result.status === 200) {
            if (result.data.success == false) {
                alert('This <external order number> already exist, use a different one');
                return;
            }
            this.setState({success: true});
            alert('Order created!')
            window.location.pathname = '/orders'
        }
    } catch (error) {
        console.log(error);
        alert('Error, try later')
    }


    // console.log(order)
  }

    renderItems() {
      const items = this.state.items;
      let result: any = [];

      items.forEach((item: any, i: any) => {
        result.push(
            <>
                <tr>
                    <td>{item.product_name}</td>
                    <td>{item.product_qty}</td>
                    <td>{item.product_weight}</td>
                </tr>
            </>
        )
      })
      return result;
    }

    addItem() {
        const name = this.state.product_name;
        const qty = this.state.product_qty;
        const weight = this.state.product_weight;


        if (name != '' && qty > 0 && weight > 0) {
            let tempItems = this.state.items;
            tempItems.push({
                product_name: name,
                product_qty: qty,
                product_weight: weight
            })
            this.setState({items: tempItems});
            // console.log(this.state.items)
        } else {
            alert("Incorrect or empty item field")
        }
    }


  render() {

    return (
      <>
        <div className='center'>
            <Form>
                <Form.Group>
                    <Form.Label>seller store</Form.Label>
                    <Form.Control type="text" id="seller_store" placeholder="seller_store" onChange={this.handleChange('seller_store')}/>
                </Form.Group>
                <Form.Label>shipping method</Form.Label>
                <Form.Control as="select" id = "shipping_method" onChange={this.handleNumericChange('shipping_method')} >
                    {this.renderShippingOptions()}
                </Form.Control>
                <Form.Group>
                    <Form.Label>external order number</Form.Label>
                    <Form.Control type="text" id="external_order_number" placeholder="external_order_number" onChange={this.handleChange('external_order_number')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>buyer full name</Form.Label>
                    <Form.Control type="text" id="buyer_full_name" placeholder="buyer_full_name" onChange={this.handleChange('buyer_full_name')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>buyer phone number</Form.Label>
                    <Form.Control type="number" id="buyer_phone_number" placeholder="buyer_phone_number" onChange={this.handleChange('buyer_phone_number')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>buyer email</Form.Label>
                    <Form.Control type="email" id="buyer_email" placeholder="buyer_email" onChange={this.handleChange('buyer_email')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>shipping address</Form.Label>
                    <Form.Control type="text" id="shipping_address" placeholder="shipping_address" onChange={this.handleChange('shipping_address')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>shipping city</Form.Label>
                    <Form.Control type="text" id="shipping_city" placeholder="shipping_city" onChange={this.handleChange('shipping_city')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>shipping region</Form.Label>
                    <Form.Control type="text" id="shipping_region" placeholder="shipping_region" onChange={this.handleChange('shipping_region')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>shipping country</Form.Label>
                    <Form.Control type="text" id="shipping_country" placeholder="shipping_country" onChange={this.handleChange('shipping_country')}/>
                </Form.Group>
                <hr/>

                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>product name</th>
                            <th>product qty</th>
                            <th>product weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItems()}
                        </tbody>
                    </Table>
                </div>


                <hr/>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>product name</Form.Label>
                        <Form.Control type="text" id="product_name" placeholder="product_name" onChange={this.handleChange('product_name')}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>product qty</Form.Label>
                        <Form.Control type="number" id="product_qty"  onChange={this.handleNumericChange('product_qty')}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>product weight</Form.Label>
                        <Form.Control type="number" id="product_weight"  onChange={this.handleNumericChange('product_weight')}/>
                    </Form.Group>
                </Form.Row>
                <Button variant="secondary" type="button" onClick={(e) => this.addItem()}>Add item</Button>
                <hr/>

                <Button variant="primary" type="submit" onClick={(e) => this.confirmOrder(e)}>
                Create Order
                </Button>
            </Form>


        </div>
        {/* <SweetAlert
                show={this.state.success}
                type="success"
                title="¡Done!"
                text="Order created"
                onConfirm={() => window.location.pathname = '/orders'}
            /> */}

      </>
    );
  }
}
