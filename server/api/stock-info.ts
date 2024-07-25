import {getStockInfo} from '../util/fetch-data'
export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    try{
     getStockInfo()
    return {code:20000, msg:'success'}
    }catch(e){
        console.log(e)
     return {code:500,msg: (e as any).message }
    }
  })
  