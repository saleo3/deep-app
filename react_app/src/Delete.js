import { GET_ORDERS } from './gql';

export default function Delete({ handler, removeDelivery, id, name }) {
  const buttonStyles = {
    width: '125.59px',
    height: '32.68px',
    border: 'none',
    display: 'block',
    margin: '0 auto',
  };
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
        textAlign: 'center',
      }}
    >
      <br />
      <button
        style={{
          background: '#F55145',
          color: 'white',
          border: 'none',
          position: 'absolute',
          right: '10px',
        }}
        onClick={() => handler([])}
      >
        X
      </button>
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
