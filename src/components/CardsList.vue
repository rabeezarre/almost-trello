<template>
  <div v-for="card in cards" :key="card">
    <CardItem v-bind:card="card"/>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, defineProps } from "vue";

const props = defineProps({
  colId: String,
  card: {},
});

const store = useStore();
const cards = computed(() => store.getters.getCardsOfColumn(props.colId));
</script>

<script>
import CardItem from "./CardItem.vue";
export default {
  name: "CardsList",
  components: { CardItem },
};
</script>
