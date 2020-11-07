import { gql } from '@apollo/client';

export const fragments = {
  orders: gql`
    fragment OrdersPart on ProductOrderType {
      id
      cantidad
      product {
        name
        id
        price
      }
      totalPrice
      fechaEnvio
    }
  `,
};

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      ...OrdersPart
    }
  }
  ${fragments.orders}
`;

export const REMOVE_DELIVERY = gql`
  mutation DeleteOrder($orderId: Float!) {
    deleteOrder(orderId: $orderId)
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;

export const ADD_DELIVERY = gql`
  mutation CreateOrder($order: OrderInput!) {
    createOrder(order: $order) {
      ...OrdersPart
    }
  }
  ${fragments.orders}
`;

export const UPDATE_DELIVERY = gql`
  mutation UpdateOrder($order: OrderUpdateInput!) {
    updateOrder(order: $order) {
      ...OrdersPart
    }
  }
  ${fragments.orders}
`;
