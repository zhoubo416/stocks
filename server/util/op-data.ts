// utils/dataOperations.js

import { query } from './db'; // 假设你的 db.js 文件路径

export async function insertStock(data:any) {
  const queryText = `
    INSERT INTO stock_list (f1, f2, f3, f12, f13, f14, f62, f66, f69, f72, f75, f78, f81, f84, f87, f124, f184, f204, f205, f206)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
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
  ];

  try {
    await query(queryText, values);
    return { success: true, message: 'Data inserted successfully' };
  } catch (error) {
    console.error('Error inserting data:', error, data);
    return { success: false, message: 'Error inserting data', error: error.message };
  }
}
