import React from 'react';
import loader from './loader.gif';

const index = ({ loading, error }) => {
  if (loading) return <img src={loader} alt="" />;
  if (error) return `Error! ${error.message}`;
};

export default index;
