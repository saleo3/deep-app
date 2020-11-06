import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS, ADD_DELIVERY, GET_ORDERS, UPDATE_DELIVERY } from './gql';
import loader from './loader.gif';
import { useForm } from 'react-hook-form';

export default function AddDelivery({ handler, order = {} }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addDelivery] = useMutation(ADD_DELIVERY);
  const [updateDelivery] = useMutation(UPDATE_DELIVERY);
  const [product, setProduct] = useState({
    index: '',
    price: '',
    id: 0,
    ...(order.product || {}),
    quantity: order.cantidad || '',
    date: order.fechaEnvio || '',
  });
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const orderData = {
      cantidad: parseFloat(product.quantity),
      product: parseFloat(product.id),
      totalPrice: parseFloat(product.quantity * product.price),
      fechaEnvio: product.date,
    };

    !order.id
      ? addDelivery({
          variables: { order: orderData },
          update: async (cache, { data: { createOrder } }) => {
            const data = cache.readQuery({ query: GET_ORDERS });
            await cache.writeQuery({
              query: GET_ORDERS,
              data: { orders: [...data.orders, createOrder] },
            });
          },
        })
      : updateDelivery({
          variables: {
            order: { id: parseFloat(order.id), ...orderData },
          },
        });
    handler(false);
  };

  if (loading) return <img src={loader} alt="" />;
  if (error) return `Error! ${error.message}`;

  console.log(errors);

  return (
    <div
      style={{
        zIndex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'block',
        top: 0,
        left: 0,
        background: 'white',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <button
          style={{
            background: '#F55145',
            color: 'white',
            border: 'none',
            position: 'absolute',
            right: '10px',
          }}
          onClick={() => handler(false)}
        >
          X
        </button>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            margin: '0 auto',
          }}
        >
          {order.id ? 'Update' : 'Schedule'} Delivery
          <br />
          <br />
          Product
          <select
            ref={register({ required: true })}
            value={product.id}
            name="product"
            onChange={(e) => {
              setProduct({
                ...product,
                ...data.products.filter((p) => p.id === e.target.value)[0],
              });
              console.log(
                data.products.filter((p) => p.id === e.target.value),
                e.target.value
              );
            }}
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
            onChange={(e) =>
              setProduct({ ...product, ...{ quantity: e.currentTarget.value } })
            }
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
            onChange={(e) =>
              setProduct({ ...product, ...{ date: e.currentTarget.value } })
            }
          />
          {Object.keys(errors).length > 0 && 'All fields are required!'}
          <br />
          <br />
          <input
            type="submit"
            value={!order.id ? 'Add' : 'Edit'}
            style={{
              width: '100%',
              height: '50.91px',
              background: !order.id ? '#006F45' : '#E7B70C',
              border: 'none',
            }}
          />
        </div>
      </form>
    </div>
  );
}
