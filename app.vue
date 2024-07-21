<template>
  <div>
    <Button label="StockData" icon="pi pi-check" @click="getStockData"/>
  </div>
</template>
<script setup lang="ts">
const getStockData = async function(){
  const { data } = await useFetch('/api/stock-info')
  console.log(data.value,'data')
}
</script>
