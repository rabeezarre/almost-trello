<template>
  <div class="h-min w-72 p-3 rounded-lg bg-gray-300">
    <div class="flex flex-row">
      <div class="w-11/12 text-xl mb-3 px-2">
        {{ col.name }}
      </div>
      <div
        class="w-1/12 text-gray-300 hover:text-black"
        @click="removeCol(col.id)"
      >
        X
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <CardsList v-bind:colId="col.id" />
      <AddCard v-bind:colId="col.id" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const removeCol = (colId) => {
  store.dispatch("removeCol", colId);
};
</script>

<script>
import CardsList from "./CardsList.vue";
import AddCard from "./AddCard.vue";
export default {
  name: "ColumnItem",
  components: { AddCard, CardsList },
  props: {
    col: {},
  },
};
</script>

<style scoped></style>
