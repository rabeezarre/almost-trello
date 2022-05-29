<template>
  <div class="flex flex-row"
       v-bind:key="col.id" v-for="col in cols"
       @drop="onDrop($event, col.id)"
       @dragenter.prevent
       @dragover.prevent
  >
    <ColumnItem v-bind:col="col" />
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import ColumnItem from "./ColumnItem.vue";

const store = useStore();
const cols = computed(() => store.getters.getColumns);

const onDrop = (event, toColId) => {
  const cardId = event.dataTransfer.getData('cardId')
  store.dispatch("moveCard", { toColId, cardId });
}

</script>
<script>
export default {
  name: "ColsList",
};
</script>
