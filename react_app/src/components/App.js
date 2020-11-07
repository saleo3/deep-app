import './App.css';
import { useState } from 'react';
import AddDelivery from './AddDelivery';
import Orders from './Orders';
import { GET_ORDERS } from '../gql';
import { useQuery } from '@apollo/client';
import Loader from './Loader';

function App() {
  const [add, toggleAdd] = useState(false);
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orderID, setOrder] = useState(null);

  if (loading || error) return <Loader {...{ loading, error }} />;

  return (
    <div className="app_container">
      Crud
      <div className="hr"></div>
      <Orders
        data={data.orders}
        handler={toggleAdd}
        setOrder={setOrder}
        bol={add}
      >
        <button
          onClick={() => {
            toggleAdd(!add);
            setOrder({});
          }}
        >
          +
        </button>
      </Orders>
      {add && <AddDelivery handler={toggleAdd} order={data.orders[orderID]} />}
    </div>
  );
}

export default App;
