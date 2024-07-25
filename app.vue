<template>
  <div>
    <Button label="StockData" icon="pi pi-check" :loading="loading" @click="getStockData"/>
  </div>
</template>
<script setup lang="ts">
const toast = useToast();

const loading = ref(false)
const getStockData = async function(){
  const { data,status,error } = await useFetch('/api/stock-info')
  console.log(data.value,'data')
  watchEffect(()=>{
    loading.value = status.value === 'pending'
    console.log(status.value, '---');
    if(status.value === 'success'){
      console.log(error,'error');
      if(data.value?.code == 20000){
        toast.add({ severity: 'success', summary: '错误', detail: data.value?.msg, life: 3000 });
      }else{
        toast.add({ severity: 'error', summary: '错误', detail: data.value?.msg, life: 3000 });
      }
    }
  })
}
</script>
