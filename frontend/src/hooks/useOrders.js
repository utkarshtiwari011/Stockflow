import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { orderAPI } from '../api/orders';
import toast from 'react-hot-toast';

export function useOrders() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await orderAPI.getAll();
      dispatch({ type: 'SET_ORDERS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createOrder = async (data) => {
    setSubmitting(true);
    try {
      const res = await orderAPI.create(data);
      dispatch({ type: 'ADD_ORDER', payload: res.data });
      toast.success('Order placed successfully');
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteOrder = async (id) => {
    setSubmitting(true);
    try {
      await orderAPI.delete(id);
      dispatch({ type: 'DELETE_ORDER', payload: id });
      toast.success('Order cancelled and deleted successfully');
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    orders: state.orders,
    loading,
    submitting,
    fetchOrders,
    createOrder,
    deleteOrder,
  };
}
