<template>
  <div
    class="flex flex-row bg-white py-2 px-2 placeholder-slate-300 relative bg-white rounded border border-slate-300 outline-none"
    draggable="true"
    @dragstart="startDrag($event, card)"
  >
    <div class="w-11/12 break-words">
      {{ card.text }}
    </div>
    <div
      class="w-1/12 text-white hover:text-black text-center font-bold"
      @click="removeCard(card.id)"
    >
      X
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const removeCard = (cardId) => {
  store.dispatch("removeCard", cardId);
};

const startDrag = (event, card) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("cardId", card.id);
};
</script>

<script>
export default {
  name: "CardItem",
  props: {
    card: {},
  },
};
</script>
