import { useState, useEffect } from 'react';
import ProductsApiService from '../services/ProductsApiService';

export const useTopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopSellers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductsApiService.getTopSellersV2();
      setTopSellers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch top sellers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSellers();
  }, []);

  const refetch = () => {
    fetchTopSellers();
  };

  return {
    topSellers,
    loading,
    error,
    refetch
  };
};