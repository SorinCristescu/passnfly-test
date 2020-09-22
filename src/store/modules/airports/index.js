import axios from "axios";
import { BASE_URL } from "../../../constants";

const state = {
  airports: [],
};

const getters = {
  allAirports: (state) => state.airports,
};

const actions = {
  async getAllAirports({ commit }) {
    try {
      const response = await axios.get(`${BASE_URL}`);
      commit("setAirports", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createAirport({ commit }, airport) {
    try {
      const response = await axios.post(`${BASE_URL}`, airport);
      commit("addAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateAirport({ commit }, airport) {
    try {
      const response = await axios.put(`${BASE_URL}${airport.id}`, airport);
      commit("editAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAirport({ commit }, id) {
    try {
      const response = await axios.delete(`${BASE_URL}${id}`);
      commit("removeAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setAirports: (state, airports) => (state.airports = airports),
  addAirport: (state, airport) =>
    (state.airports = state.airports.unshift(airport)),
  editAirport: (state, updAirport) => {
    const index = state.airports.findIndex(
      (airport) => airport.id === updAirport.id
    );
    if (index !== -1) {
      state.airports.splice(index, 1, updAirport);
    }
  },
  removeAirport: (state, id) =>
    (state.airports = state.airports.filter((airport) => airport.id !== id)),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
