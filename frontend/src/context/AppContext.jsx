import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const defaultUser = {
  name: 'Utkarsh Tiwari',
  initials: 'UT',
  email: 'utkarsh@stockflow.dev',
  role: 'Administrator'
};

const initialState = {
  products: [],
  customers: [],
  orders: [],
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem('sf_user')) || defaultUser,
  globalSearch: '',
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [action.payload, ...state.customers] };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter((c) => c.id !== action.payload),
      };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      if (action.payload) {
        localStorage.setItem('sf_user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('sf_user');
      }
      return { ...state, user: action.payload };
    case 'SET_GLOBAL_SEARCH':
      return { ...state, globalSearch: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
