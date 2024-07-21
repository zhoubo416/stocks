import {getStockInfo} from '../util/fetch-data'
export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    getStockInfo()
    return {code:20000}
  })
  