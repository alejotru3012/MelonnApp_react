import React from 'react';
import {APIHandler} from '../utils';
import {Item} from '../components';
import {Form, Col} from 'react-bootstrap';

export default class Order extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        order: null,
        };
    }

    componentDidMount () {
        const apigwClient = new APIHandler();
        this.OrderById(apigwClient)
        // console.log(this.state.orders)

    }

    async OrderById(client: any) {
        try {
            const { match: { params } } = this.props;
            this.setState({order: (await client.getOrderById(params.orderId)).data})
        } catch (error) {
            console.log(error);
            this.setState({orders: null});
        }
    }


    render() {

        // console.log(this.state.order)
        const labels = this.state.order;

        if (labels == null) {
            return (<>Order doesn't exist</>)
        }
        const allItems = this.state.order.items.map((article: any, i: any) => <Item id={i} key={i} article={article}/>);

        return (
        <>
            <div className='center'>
                <Form.Group>
                    <Form.Label><h2>Order information</h2></Form.Label>
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        external order number
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.external_order_number : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        buyer full name
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.buyer_full_name : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        buyer phone number
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.buyer_phone_number : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        buyer phone number
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.buyer_email : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <hr/>

                    <Form.Label><h2>Shipping info</h2></Form.Label>
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        shipping address
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.shipping_address : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        shipping city
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.shipping_city : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        shipping region
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.shipping_region : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        shipping country
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? labels.shipping_country : 'NULL')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <hr/>

                    <Form.Label><h2>Promise dates</h2></Form.Label>
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        pack_promise_min
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.pack_promise_min || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        pack_promise_max
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.pack_promise_max || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        ship_promise_min
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.ship_promise_min || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        ship_promise_max
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.ship_promise_max || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        delivery_promise_min
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.delivery_promise_min || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        delivery_promise_max
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.delivery_promise_max || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        ready_pickup_promise_min
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.ready_pickup_promise_min || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Form.Label column="lg" lg={3}>
                        ready_pickup_promise_max
                        </Form.Label>
                        <Form.Label column="lg" lg={3}>
                        {(labels ? (labels.promises.ready_pickup_promise_max || 'NULL') : '')}
                        </Form.Label>
                    </Form.Row>
                    <br />
                    <hr/>

                    <Form.Label><h2>Line items</h2></Form.Label>
                    <ul>
                        {allItems}
                    </ul>

                    <br />

                </Form.Group>
            </div>
        </>
        );
    }
}
