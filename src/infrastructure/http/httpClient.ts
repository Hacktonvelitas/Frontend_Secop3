export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, body: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, body: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function httpFetch<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params, headers, ...rest } = config;

  const url = new URL(`${BASE_URL}${endpoint}`);
  
  if (params) {
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    // Handle specific error codes here (401, 403, etc)
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
}

export const httpClient: HttpClient = {
  get: <T>(url: string, config?: RequestConfig) => 
    httpFetch<T>(url, { ...config, method: 'GET' }),
    
  post: <T>(url: string, body: unknown, config?: RequestConfig) => 
    httpFetch<T>(url, { ...config, method: 'POST', body: JSON.stringify(body) }),
    
  put: <T>(url: string, body: unknown, config?: RequestConfig) => 
    httpFetch<T>(url, { ...config, method: 'PUT', body: JSON.stringify(body) }),
    
  delete: <T>(url: string, config?: RequestConfig) => 
    httpFetch<T>(url, { ...config, method: 'DELETE' }),
};
