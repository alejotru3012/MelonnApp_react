import React, { useState } from 'react';
import {Form} from 'react-bootstrap';

function Item(props: any) {
    const [item, setItem] = useState(props.article);
    return (
        <>
            <li>
                <Form.Label><h4>{item.product_name}</h4></Form.Label>
                <Form.Row>
                    <Form.Label column="lg" lg={3}>
                    product qty
                    </Form.Label>
                    <Form.Label column="lg" lg={3}>
                    {item.product_qty}
                    </Form.Label>
                </Form.Row>
                <Form.Row>
                    <Form.Label column="lg" lg={3}>
                    product weight
                    </Form.Label>
                    <Form.Label column="lg" lg={3}>
                    {item.product_weight}
                    </Form.Label>
                </Form.Row>
            </li>
        </>
    );
  }

  export default Item;
