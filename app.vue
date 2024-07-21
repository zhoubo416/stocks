<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/test')
console.log(data.value,'data')
</script>
