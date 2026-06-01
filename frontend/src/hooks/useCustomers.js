import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { customerAPI } from '../api/customers';
import toast from 'react-hot-toast';

export function useCustomers() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await customerAPI.getAll();
      dispatch({ type: 'SET_CUSTOMERS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createCustomer = async (data) => {
    setSubmitting(true);
    try {
      const res = await customerAPI.create(data);
      dispatch({ type: 'ADD_CUSTOMER', payload: res.data });
      toast.success('Customer registered successfully');
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCustomer = async (id) => {
    setSubmitting(true);
    try {
      await customerAPI.delete(id);
      dispatch({ type: 'DELETE_CUSTOMER', payload: id });
      toast.success('Customer record deleted successfully');
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    customers: state.customers,
    loading,
    submitting,
    fetchCustomers,
    createCustomer,
    deleteCustomer,
  };
}
