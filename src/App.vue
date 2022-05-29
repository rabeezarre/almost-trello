<template>
  <section class="flex flex-row overflow-auto p-4 gap-3">
    <ColsList />
    <AddCol />
  </section>
</template>

<script setup>
import AddCol from "./components/AddCol.vue";
import ColsList from "./components/ColsList.vue";
</script>
