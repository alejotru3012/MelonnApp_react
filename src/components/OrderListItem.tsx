import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OrderListItem(props: any) {
    const [order, setorder] = useState(props);
    const shMethodName = order.shipping.filter((shm: any) => shm.id == order.article.shipping_method);
    return (
        <>
            <tr>
                <td>{order.article.external_order_number}</td>
                <td>{order.article.seller_store}</td>
                <td>{order.article.creation_date}</td>
                <td>{shMethodName[0].name}</td>
                <td>
                    <Link
                    to={{
                        pathname: `/orders/${order.article.external_order_number}`
                    }}
                    type="button"
                    className="btn btn-primary">
                        Details
                    </Link>
                </td>
            </tr>
        </>
    );
  }

  export default OrderListItem;
