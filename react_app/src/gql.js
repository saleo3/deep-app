import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
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
  }
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
  }
`;

export const UPDATE_DELIVERY = gql`
  mutation UpdateOrder($order: OrderUpdateInput!) {
    updateOrder(order: $order) {
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
  }
`;
