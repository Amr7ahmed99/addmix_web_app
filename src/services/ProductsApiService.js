import { apiClient } from "../api/ApiClient";


class ProductService{

    async getTopSellers(){ 
        return apiClient.get("/api/analytics/products/top-sellers?limit=10");
    }

    async getProductsByFilter(filters){ 
        return apiClient.get(`/api/products?${filters}`);
    }

    async getTopSellersV2() {
        try {
            const response = await apiClient.get('/api/products/top-sellers');
            return response.data;
        } catch (error) {
            console.error('Error fetching top sellers:', error);
            throw error;
        }
    }

    async getProductsListWithFilters(params) {
        try {
            const response = await apiClient.get(`/api/products/list?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching top sellers:', error);
            throw error;
        }
    }

    async getProductDetails(productId) {
      try {
          const response = await apiClient.get(`/api/products/admin/${productId}/details`);
          return response.data;
      } catch (error) {
          console.error('Error fetching product details:', error);
          throw error;
      }
    }

    async fetchTrendedProducts() {
      try {
          const response = await apiClient.get(`/api/products/trends`);
          return response.data;
      } catch (error) {
          console.error('Error fetching trending products:', error);
          throw error;
      }
    }

    async getAllColorsAndSizes() {
        try {
            const response = await apiClient.get(`/api/products/attributes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching colors and sizes:', error);
            throw error;
        }
    }

    

    // async markAsTopSeller(productId) {
    //     try {
    //     await apiClient.post(`/api/products/${productId}/mark-top-seller`);
    //     } catch (error) {
    //     console.error('Error marking product as top seller:', error);
    //     throw error;
    //     }
    // }

}

export default new ProductService();