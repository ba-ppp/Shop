import { BaseAPI } from 'api/api'

export const getProductItems = () => {
    return BaseAPI.get('/product/getProduct');
}