import { AxiosRequestConfig } from 'axios'

export const AxiosConfig: AxiosRequestConfig = {
  baseURL: 'https://registry.npmjs.org',
  headers: {
    'Content-Type': 'application/json'
  }
}
