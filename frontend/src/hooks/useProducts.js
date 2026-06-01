import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { productAPI } from '../api/products';
import toast from 'react-hot-toast';

export function useProducts() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productAPI.getAll();
      dispatch({ type: 'SET_PRODUCTS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createProduct = async (data) => {
    setSubmitting(true);
    try {
      const res = await productAPI.create(data);
      dispatch({ type: 'ADD_PRODUCT', payload: res.data });
      toast.success('Product created successfully');
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const updateProduct = async (id, data) => {
    setSubmitting(true);
    try {
      const res = await productAPI.update(id, data);
      dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });
      toast.success('Product updated successfully');
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    setSubmitting(true);
    try {
      await productAPI.delete(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      toast.success('Product deleted successfully');
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    products: state.products,
    loading,
    submitting,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
