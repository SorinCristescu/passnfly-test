<template>
  <div class="airports">
    <v-data-table
      :headers="headers"
      :items="allAirports"
      :items-per-page="10"
      :search="search"
      class="elevation-5 ma-5"
      fixed-header
      loading="allAirports.length > 0 "
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Airports</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="60%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >+ Add New Aiport</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        dense
                        height="30px"
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.city"
                        label="City"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.country"
                        label="Country"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.iata"
                        label="IATA"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.icao"
                        label="ICAO"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.timezone"
                        label="Timezone"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.tz"
                        label="TZ"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="8">
                      <v-row class="pl-10 pr-10">
                        <p>Latitude:</p>
                        <v-spacer></v-spacer>
                        <p>Longitude:</p>
                        <v-spacer></v-spacer>
                        <p>Altitude:</p>
                        <Map
                          ref="map"
                          apiKey="C12Se5f7UD7sOTcQ0MFSyw9zCJeO4i7qclGL6c-tTSE"
                          latitude="37"
                          longitude="-121"
                          zoom="10"
                        />
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit Airport</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small @click="deleteItem(item)" v-bind="attrs" v-on="on">
              mdi-delete
            </v-icon>
          </template>
          <span>Delete Airport</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Airports",
  components: {
    // Map,
  },
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "City", value: "city" },
      { text: "Country", value: "country" },
      { text: "IATA", value: "iata" },
      { text: "ICAO", value: "icao" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    airports: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      city: "",
      country: "",
      iata: "",
      icao: "",
      DST: "U",
      latitude: "",
      longitude: "",
      source: "OurAirports",
      timezone: "",
      type: "airport",
      tz: "",
    },
    defaultItem: {
      id: "",
      name: "",
      city: "",
      country: "",
      iata: "",
      icao: "",
      DST: "U",
      latitude: "",
      longitude: "",
      source: "OurAirports",
      timezone: "",
      type: "airport",
      tz: "",
    },
  }),

  computed: {
    ...mapGetters(["allAirports"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.getAllAirport();
  },

  methods: {
    ...mapActions([
      "getAllAirport",
      "addNewAirport",
      "updateAirport",
      "deleteAirport",
      "searchAirport",
    ]),
  },

  initialize() {
    this.getAllAirport();
  },

  editItem(item) {
    this.editedIndex = this.desserts.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  },

  deleteItem(item) {
    const index = this.desserts.indexOf(item);
    confirm("Are you sure you want to delete this item?") &&
      this.desserts.splice(index, 1);
  },

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  },

  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem);
    } else {
      this.desserts.push(this.editedItem);
    }
    this.close();
  },
};
</script>
<style scoped>
.airports {
  width: 100%;
  height: 100vh;
}
</style>
