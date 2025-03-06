import axios from 'axios';

class Api {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api'; // Base URL for your backend API
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  // Method for GET requests
  get(endpoint, params = {}) {
    return this.client.get(endpoint, { params });
  }

  // Method for POST requests
  post(endpoint, data) {
    return this.client.post(endpoint, data);
  }

  // Method for PUT requests
  put(endpoint, data) {
    return this.client.put(endpoint, data);
  }

  // Method for DELETE requests
  delete(endpoint) {
    return this.client.delete(endpoint);
  }
}

// Export the instance of the Api class as default
const api = new Api();
export default api;
