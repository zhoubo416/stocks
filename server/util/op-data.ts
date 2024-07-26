// utils/dataOperations.js

import { query } from './db'; // 假设你的 db.js 文件路径
import  dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');
export async function insertStock(data:any) {

const dt = dayjs().format('YYYYMMDD');
const opdt = dayjs().valueOf();

  const queryText = `
    INSERT INTO stock_list (f1, f2, f3, f12, f13, f14, f62, f66, f69, f72, f75, f78, f81, f84, f87, f124, f184, f204, f205, f206, dt, op_dt,p_f12,p_f14)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
  `;
  
  const values = [
    data.f1,
    data.f2,
    data.f3,
    data.f12,
    data.f13,
    data.f14,
    data.f62,
    data.f66,
    data.f69,
    data.f72,
    data.f75, 
    data.f78,
    data.f81,
    data.f84,
    data.f87,
    data.f124,
    data.f184,
    data.f204,
    data.f205,
    data.f206,
    dt,
    opdt,
    data.p_f12,
    data.p_f14
  ];

  const ret = await query(queryText, values);
  return ret
}

export async function insertStockIndustries(data:any) {
  const dt = dayjs().format('YYYYMMDD');
  const opdt = dayjs().valueOf();
  const queryText = `
    INSERT INTO stock_industries (
      f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f20, f21, f22, f23, f24, f25, f26, f33, f62, f104, f105, f107, f115, f124, f128, f140, f141, f136, f152, f207, f208, f209, f222, dt, op_dt
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43
    )
  `;

  const values = [
    data.f1, data.f2, data.f3, data.f4, data.f5, data.f6, data.f7, data.f8, data.f9, data.f10,
    data.f11, data.f12, data.f13, data.f14, data.f15, data.f16, data.f17, data.f18, data.f20, data.f21,
    data.f22, data.f23, data.f24, data.f25, data.f26, data.f33, data.f62, data.f104, data.f105, data.f107,
    data.f115, data.f124, data.f128, data.f140, data.f141, data.f136, data.f152, data.f207, data.f208, data.f209,
    data.f222, dt, opdt
  ];

  const ret = await query(queryText, values);
  return ret
}

export async function deleteByDt() {
  const dt = dayjs().format('YYYYMMDD');
  const queryText = `
  delete from stock_list t where t.dt = $1
  `;

  const queryText2 = `
  delete from stock_industries t where t.dt = $1
  `;

  const values = [ dt  ];

  const r1 = await query(queryText, values);
  const r2 = await query(queryText2, values);
  return { r1, r2 };
}

export async function startStockLog() {

  const dt0 = dayjs().format('YYYYMMDD HH:mm:ss');
  const dt = dayjs().format('YYYYMMDD');

    const queryText = `
      INSERT INTO stock_log (start_time, dt, status)
      VALUES ($1, $2, $3)
    `;
    
    const values = [
      dt0,
      dt,
      '0'
    ];
  
    const ret = await query(queryText, values);
    return ret
  }

  export async function endStockLog() {

    const dt0 = dayjs().format('YYYYMMDD HH:mm:ss');
    const dt = dayjs().format('YYYYMMDD');
  
      const queryText = `
        UPDATE stock_log set end_time=$1, status='1' where status = '0' and dt=$2
      `;
      
      const values = [
        dt0,
        dt,
      ];
    
      const ret = await query(queryText, values);
      return ret
    }

    export async function isRunning() {

      const dt = dayjs().format('YYYYMMDD');
    
        const queryText = `
          select * from stock_log where dt=$1 and status = '0'
        `;
        
        const values = [
          dt,
        ];
      
        const ret = await query(queryText, values);
        return ret?.rows
      }