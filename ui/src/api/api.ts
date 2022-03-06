import axios from 'axios';
import { getToken, setIsLoggedIn, setToken } from 'utils/utils';
import { config } from 'config/config';
const { apiGateway } = config;

const Api = () => {
  const defaultOptions = {
    baseURL: apiGateway.URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5 * 60 * 1000, // 5 min
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const token = getToken();
    config.headers!.Authorization = token ? token.AccessToken : '';
    if (!process.env.REACT_APP_SUBDOMAIN) {
      config.headers!['Access-Control-Allow-Origin'] = window.location.origin;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        [
          '/auth/signin',
          '/auth',
          '/auth/change-password',
        ].includes(originalRequest.url)
      ) {
        return Promise.reject(error.response);
      }

      if (
        [401, 402, 403].includes(error?.response?.status) &&
        error?.response?.config?.url !== '/auth/refresh-token' &&
        !originalRequest?._retry
      ) {
        originalRequest._retry = true;
        const token = JSON.parse(localStorage.getItem('token') as string);

        try {
          const response = await instance.post('/auth/refresh-token', {
            refreshToken: token?.RefreshToken,
            idToken: token?.IdToken,
          });

          setToken(response.data);
          setIsLoggedIn();

          originalRequest.headers.Authorization = response.data.AccessToken;
          return instance(originalRequest);
        } catch (err: any) {
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          window.location.assign('/signin');
        }
      } else {
        error.message = 'Something went wrong! Please try again later.';
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default Api();

export const BaseAPI = Api();
