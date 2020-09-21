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
    (state.airports = state.airports.push(airport)),
  editAirport: (state, airports) => (state.airports = airports),
  removeAirport: (state, airports) => (state.airports = airports),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
