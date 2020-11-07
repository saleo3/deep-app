import { GET_ORDERS } from '../../gql';
import CloseButton from '../CloseButton';
import './styles.css';

export default function Delete({ handler, removeDelivery, id, name }) {
  const buttonStyles = {
    width: '125.59px',
    height: '32.68px',
    border: 'none',
    display: 'block',
    margin: '0 auto',
  };

  return (
    <div className="delete_container" style={{ textAlign: 'center' }}>
      <br />
      <CloseButton handler={handler} />
      <br />
      Eliminar Entrega
      <br />
      <span style={{ color: '#F55145' }}>
        {`¿Estás seguro de eliminar el servicio “${name}”?`}
      </span>
      <br />
      <br />
      <button
        style={{
          background: '#F55145',
          ...buttonStyles,
        }}
        onClick={() => handler([])}
      >
        Cancel
      </button>
      <br />
      <button
        style={{
          background: '#FF9E0F',
          ...buttonStyles,
        }}
        onClick={() =>
          removeDelivery({
            variables: { orderId: parseFloat(id) },
            update: async (cache) => {
              const data = cache.readQuery({ query: GET_ORDERS });
              const filteredOrders = data.orders.filter(
                ({ id: itemId }) => itemId !== id
              );
              await cache.writeQuery({
                query: GET_ORDERS,
                data: { orders: filteredOrders },
              });
              handler([]);
            },
          })
        }
      >
        Delete
      </button>
    </div>
  );
}
