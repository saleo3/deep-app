import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  GET_PRODUCTS,
  ADD_DELIVERY,
  GET_ORDERS,
  UPDATE_DELIVERY,
} from '../../gql';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import CloseButton from '../CloseButton';
import './styles.css';

function AddDelivery({ handler, order = {} }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addDelivery] = useMutation(ADD_DELIVERY);
  const [updateDelivery] = useMutation(UPDATE_DELIVERY);
  const { register, handleSubmit, errors } = useForm();
  const [product, setProduct] = useState({
    index: '',
    price: '',
    id: 0,
    ...(order.product || {}),
    quantity: order.cantidad || '',
    date: order.fechaEnvio || '',
  });

  const ternary = (iffer) => (doThis, doThat) => (iffer ? doThis : doThat);
  const doThisDoThat = ternary(order.id);
  const updateState = (data) => setProduct({ ...product, ...data });

  const onSubmit = () => {
    const orderData = {
      cantidad: parseFloat(product.quantity),
      product: parseFloat(product.id),
      totalPrice: parseFloat(product.quantity * product.price),
      fechaEnvio: product.date,
    };

    const update = () =>
      updateDelivery({
        variables: {
          order: { id: parseFloat(order.id), ...orderData },
        },
      });

    const add = () =>
      addDelivery({
        variables: { order: orderData },
        update: async (cache, { data: { createOrder } }) => {
          const data = cache.readQuery({ query: GET_ORDERS });
          await cache.writeQuery({
            query: GET_ORDERS,
            data: { orders: [...data.orders, createOrder] },
          });
        },
      });

    doThisDoThat(update, add)();
    handler(false);
  };

  if (loading || error) return <Loader {...{ loading, error }} />;

  return (
    <div className="delivery_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CloseButton handler={handler} />
        <br />
        <div className="form_container">
          {doThisDoThat('Update', 'Schedule')} Delivery
          <br />
          <br />
          Product
          <select
            ref={register({ required: true })}
            value={product.id}
            name="product"
            onChange={(e) =>
              updateState(
                data.products.filter((p) => p.id === e.target.value)[0]
              )
            }
            disabled={order.id}
          >
            <option value="0">Select</option>
            {data &&
              data.products.length > 0 &&
              data.products.map((p, i) => (
                <option value={p.id} key={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
          Quantity
          <input
            type="text"
            value={product.quantity}
            ref={register({ required: true })}
            name="quantity"
            onChange={(e) => updateState({ quantity: e.currentTarget.value })}
          />
          Price
          <input
            type="text"
            name="price"
            value={product.price}
            ref={register({ required: true })}
            disabled
          />
          Date
          <input
            type="date"
            value={product.date.split('T')[0]}
            ref={register({ required: true })}
            name="date"
            onChange={(e) => updateState({ date: e.currentTarget.value })}
          />
          {Object.keys(errors).length > 0 && 'All fields are required!'}
          <br />
          <br />
          <input
            type="submit"
            value={doThisDoThat('Edit', 'Add')}
            className="submit-button"
            style={{
              background: doThisDoThat('#E7B70C', '#006F45'),
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default AddDelivery;
