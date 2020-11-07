import { useMutation } from '@apollo/client';
import moment from 'moment';
import { REMOVE_DELIVERY } from '../../gql';
import Delete from '../DeleteDelivery';
import { useState } from 'react';
import './styles.css';
require('moment/locale/es');

function Orders(props) {
  // const { loading, error, data } = useQuery(GET_ORDERS);
  const [removeDelivery] = useMutation(REMOVE_DELIVERY);
  const [add, toggleAdd] = useState([]);

  return (
    <div className="orders_container">
      <div className="table-title">Products</div>
      <div style={{ position: 'relative' }}>
        <div className="add-button">{props.children}</div>
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
          <tbody>
            {!props.data.length ? (
              <tr>
                <td height="50">Theres no Data yet!</td>
              </tr>
            ) : (
              renderRows(props, toggleAdd)
            )}
          </tbody>
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

function renderRows({ handler, setOrder, data }, toggle) {
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
        <td height="50">{formatDate(fechaEnvio)}</td>
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

function formatDate(date) {
  moment.locale('es');

  return moment(date)
    .add(1, 'days')
    .format('dddd D MMMM YYYY')
    .split(' ')
    .map((m, i) => {
      const month = m[0].toUpperCase() + m.slice(1);
      if (i === 2) return `de ${month} de`;
      return month;
    })
    .join(' ');
}

export default Orders;
