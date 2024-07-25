import axios from 'axios';

import {deleteByDt, insertStockIndustries, insertStock, isRunning,startStockLog, endStockLog} from './op-data'
// 股票的行业
const url = 'https://26.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=200&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&wbp2u=|0|0|0|web&fid=f3&fs=m:90+t:2+f:!50&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f26,f22,f33,f11,f62,f128,f136,f115,f152,f124,f107,f104,f105,f140,f141,f207,f208,f209,f222&_='+(new Date().getTime())
// 行业对应的股票
const url2Stock = (f12:string)=> `https://push2.eastmoney.com/api/qt/clist/get?fid=f62&po=1&pz=500&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=b%3A${f12}&fields=f12%2Cf14%2Cf2%2Cf3%2Cf62%2Cf184%2Cf66%2Cf69%2Cf72%2Cf75%2Cf78%2Cf81%2Cf84%2Cf87%2Cf204%2Cf205%2Cf124%2Cf1%2Cf13`


export const getStockInfo = async function() {
   
        // 1 判断是否正在运行中
        const rows = await isRunning();
        if (rows?.length) {
            throw new Error('正在运行中');
        }

        // 2 开始拉取数据
        await startStockLog();
        console.log('start');

        // 删除当前日期的数据
        const result = await deleteByDt();

        // 获取行业数据
        const res = await axios.get(url);
        const dataJson = res.data;

        // 处理行业数据
        if (dataJson?.data?.diff) {
            for (const e of dataJson.data.diff) {
                await insertStockIndustries(e);

                // 获取每个行业的股票数据
                const res2 = await axios.get(url2Stock(e.f12));
                const dataJson2 = res2.data;

                // 处理股票数据
                if (dataJson2?.data?.diff) {
                    for (const e2 of dataJson2.data.diff) {
                        e2.p_f12 = e.f12;
                        e2.p_f14 = e.f14;
                        await insertStock(e2);
                    }
                }
            }
        }

        // 3 结束拉取数据
        await endStockLog();
        console.log(dataJson?.data?.diff.length, "---");
        return dataJson?.data?.diff?.length || 0;
    
};
