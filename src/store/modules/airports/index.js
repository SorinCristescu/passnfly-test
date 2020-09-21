import axios from "axios";
import { BASE_URL } from "../../../constants";

const state = {
  airports: [],
};

const getters = {
  allAirports: (state) => state.airports,
};

const actions = {
  async getAllAirport({ commit }) {
    try {
      const response = await axios.get(`${BASE_URL}`);
      commit("setAirports", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createAirport({ commit }, formData) {
    try {
      const response = await axios.post(`${BASE_URL}`, formData);
      commit("addAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updAirport({ commit }, airport) {
    try {
      const response = await axios.put(`${BASE_URL}${airport.id}`, airport);
      commit("updateAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async removeAirport({ commit }, id) {
    try {
      const response = await axios.delete(`${BASE_URL}${id}`);
      commit("deleteAirport", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setAirports: (state, airports) => (state.airports = airports),
  addAirport: (state, airports) => (state.airports = airports),
  updateAirport: (state, airports) => (state.airports = airports),
  deleteAirport: (state, airports) => (state.airports = airports),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
