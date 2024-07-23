import axios from 'axios';

import {insertStock} from './op-data'
// 股票的行业
const url = 'https://26.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=200&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_='+(new Date().getTime())
// 行业对应的股票
const url2Stock = (f12:string)=> `https://push2.eastmoney.com/api/qt/clist/get?fid=f62&po=1&pz=500&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=b%3A${f12}&fields=f12%2Cf14%2Cf2%2Cf3%2Cf62%2Cf184%2Cf66%2Cf69%2Cf72%2Cf75%2Cf78%2Cf81%2Cf84%2Cf87%2Cf204%2Cf205%2Cf124%2Cf1%2Cf13`


 export const getStockInfo = function(){
    console.log('start')
    axios.get(url)
     .then((res: any) => 
        {
            // console.log(res.data);
            const dataJson = res.data
            // const dataJson = parseJsonFromStr(dataStr)
            console.log(dataJson?.data?.total,'---');
            dataJson?.data?.diff?.forEach((e: { f12: string; f14: any; }) => {
                
                axios.get(url2Stock(e.f12)).then((res2: { data: any; }) => {
                    const dataJson2 = res2.data
                    dataJson2?.data?.diff?.forEach(e => {
                        insertStock(e)
                    });
                    console.log(e.f12,e.f14,dataJson2?.data?.total);
                })
            });
            console.log(dataJson?.data?.diff.length,'---');
        }
     )
     .catch((error: any) => console.error('请求出错:', error));
 }