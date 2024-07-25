import {getStockInfo} from '../util/fetch-data'
export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    try{
       const ret = await getStockInfo()
    return {code:20000, msg:'success', data:ret}
    }catch(e){
        console.log(e)
     return {code:500,msg: (e as any).message }
    }
  })
  