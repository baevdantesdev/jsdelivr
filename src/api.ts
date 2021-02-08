import axios from 'axios'
import { PackageList } from '@/interfaces'

export default class Api {
  static getPackages (text: string) {
    return axios.get<PackageList>('/-/v1/search', {
      params: {
        text,
        size: 100
      }
    })
  }
}
