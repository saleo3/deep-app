import { useMutation } from '@apollo/client';
import moment from 'moment';
import { REMOVE_DELIVERY } from './gql';
import Delete from './Delete';
import { useState } from 'react';
require('moment/locale/es');

export default function Orders(props) {
  // const { loading, error, data } = useQuery(GET_ORDERS);
  const [removeDelivery] = useMutation(REMOVE_DELIVERY);
  const [add, toggleAdd] = useState([]);

  return (
    <div
      style={{
        background: 'white',
        padding: '40px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '234.84px',
          height: '30.64px',
          background: '#32368E',
          border: '1px solid #32368E',
          top: '-32px',
          left: 0,
          color: 'white',
        }}
      >
        Products
      </div>
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-32px',
            right: '0',
          }}
        >
          {props.children}
        </div>
        <table style={{ width: '100%' }} cellSpacing="0">
          <thead>
            <tr>
              <th height="50">Id</th>
              <th height="50">Product</th>
              <th height="50">Quantity</th>
              <th height="50">Price</th>
              <th height="50">Total</th>
              <th height="50">Delivery date</th>
              <th height="50">
                <div>Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>{renderRows(removeDelivery, props, add, toggleAdd)}</tbody>
        </table>
        {add.length > 0 && (
          <Delete
            handler={toggleAdd}
            removeDelivery={removeDelivery}
            id={add[0]}
            name={add[1]}
          />
        )}
      </div>
    </div>
  );
}

function renderRows(removeDelivery, { handler, setOrder, data }, bol, toggle) {
  moment.locale('es');

  if (!data.length)
    return (
      <tr>
        <td height="50">Theres no Data yet!</td>
      </tr>
    );

  return data.map((order, i) => {
    const {
      cantidad,
      fechaEnvio,
      totalPrice,
      id,
      product: { name, price },
    } = order;
    return (
      <tr key={id}>
        <td height="50">{i + 1}</td>
        <td height="50">{name}</td>
        <td height="50">{cantidad}</td>
        <td height="50">{price}</td>
        <td height="50">{totalPrice}</td>
        <td height="50">
          {moment(fechaEnvio)
            .add(1, 'days')
            .format('dddd D MMMM YYYY')
            .split(' ')
            .map((m, i) => {
              const month = m[0].toUpperCase() + m.slice(1);
              if (i === 2) return `de ${month} de`;
              return month;
            })
            .join(' ')}
        </td>
        <td height="50">
          <button
            onClick={() => {
              handler(true);
              setOrder(i);
            }}
          >
            Edit
          </button>
          <button onClick={() => toggle([id, name])}>Delete</button>
        </td>
      </tr>
    );
  });
}
