<template>
  <div>
    <button
      class="text-left w-full py-2 px-6 rounded-md bg-gray-300 hover:bg-gray-900 hover:text-white justify-self-start"
      v-if="!isCreating"
      @click="handleToggleCreating"
    >
      + Add a card
    </button>
    <div class="w-full" v-if="isCreating">
      <form class="flex flex-col" @submit.prevent="handleFormSubmit(colId)">
        <input
          class="mb-2 py-2 px-2 placeholder-slate-300 text-slate-600 relative bg-white rounded border border-slate-300 outline-none focus:outline-none focus:ring w-full"
          name="text"
          v-model="name"
          type="text"
          placeholder="Enter a title for this card..."
          autocomplete="off"
        />
        <div class="flex flex-row gap-4 place-content-center">
          <button class="rounded-md py-1 px-2 bg-green-700 text-white hover:bg-green-800">
            Add card
          </button>
          <button
            class="rounded-md py-1 px-2 bg-red-700 text-white hover:bg-red-800"
            @click="handleToggleCreating"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const isCreating = ref(false);
const name = ref("");

const handleToggleCreating = () => {
  isCreating.value = !isCreating.value;
};
const store = useStore();

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

const handleFormSubmit = (colId) => {
  if (!isBlank(name.value)) {
    store.dispatch("addCard", { text: name.value, colId });
    name.value = "";
  }

};
</script>

<script>
export default {
  name: "AddCard",
  props: {
    colId: String,
  },
};
</script>
