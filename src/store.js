import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

const store = createStore({
  state: {
    cards: {},
    cols: {},
    colToCards: {},
  },
  mutations: {
    addCol(state, { id, name }) {
      state.cols[id] = { id, name };
      state.colToCards[id] = [];
    },
    removeCol(state, id) {
      state.colToCards[id].forEach((cardId) => delete state.cards[cardId]);
      delete state.cols[id];
      delete state.colToCards[id];
    },
    addCard(state, { id, text, colId }) {
      state.cards[id] = { id, text, colId };
      try {
        state.colToCards[colId].push(id);
      } catch (e) {
        console.error("addCard: Invalid payload", { text, colId });
      }
    },
    removeCard(state, cardId) {
      try {
        const { colId } = state.cards[cardId];
        state.colToCards[colId] = state.colToCards[colId].filter(
          (id) => id !== cardId
        );
        delete state.cards[cardId];
      } catch (e) {
        console.error("removeCard: Invalid payload", { state, cardId });
      }
    },
  },
  actions: {
    addCol(context, name) {
      const id = uuid();
      context.commit("addCol", { id, name });
    },
    removeCol(context, id) {
      context.commit("removeCol", id);
    },
    addCard(context, { text, colId }) {
      const id = uuid();
      context.commit("addCard", { id, text, colId });
    },
    moveCard(context, { toColId, cardId }) {
      const card = context.state.cards[cardId];
      context.commit("removeCard", card.id);
      context.commit("addCard", { ...card, colId: toColId });
    },
    removeCard(context, cardId) {
      context.commit("removeCard", cardId);
    },
  },
  getters: {
    getColumns(state) {
      return Object.values(state.cols);
    },
    getCardsOfColumn(state) {
      return function (columnId) {
        return state.colToCards[columnId].map((cardId) => state.cards[cardId]);
      };
    },
  },
});

export default store;
