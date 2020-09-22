<template>
  <div class="airports">
    <v-data-table
      :headers="headers"
      :items="allAirports.length > 0 && allAirports"
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedAirport.name"
                        label="Name"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.city"
                        label="City"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.country"
                        label="Country"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.iata"
                        label="IATA"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.icao"
                        label="ICAO"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedAirport.latitude"
                        label="Latitude"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.longitude"
                        label="Longitude"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.altitude"
                        label="Altitude"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.timezone"
                        label="Timezone"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedAirport.tz"
                        label="TZ"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="dialog2 = !dialog2"
                  >Save</v-btn
                >
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
              @click="setAirport(item, 2)"
              v-bind="attrs"
              v-on="on"
              >mdi-pencil</v-icon
            >
          </template>
          <span>Edit Airport</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small @click="setAirport(item, 1)" v-bind="attrs" v-on="on"
              >mdi-delete</v-icon
            >
          </template>
          <span>Delete Airport</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog2" class="pa-10" max-width="500px" height="300px">
      <v-card>
        <v-card-title>
          <p v-if="this.handlerType === 1">
            Are you sure you want to delete the airport?
          </p>
          <p v-else-if="this.handlerType === 2">
            Are you sure you want to update the airport?
          </p>
          <p v-else>Are you sure you want to create the airport?</p>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" class="ml-5" text @click="dialog2 = !dialog2"
            >No</v-btn
          >
          <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" class="mr-5" black @click="airportHandler()"
              >Yes</v-btn
            >
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { generate } from "shortid";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Airports",
  components: {
    // Map,
  },
  data: () => ({
    search: "",
    dialog2: false,
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
    airport: {},
    handlerType: 0,
    editedAirport: {
      id: "",
      name: "",
      city: "",
      country: "",
      iata: "",
      icao: "",
      DST: "",
      latitude: "",
      longitude: "",
      source: "",
      timezone: "",
      type: "",
      tz: "",
    },
    defaultAirport: {
      id: "",
      name: "",
      city: "",
      country: "",
      iata: "",
      icao: "",
      DST: "U",
      latitude: "",
      longitude: "",
      source: "",
      timezone: "",
      type: "",
      tz: "",
    },
  }),

  computed: {
    ...mapGetters(["allAirports"]),
    formTitle() {
      return this.handlerType === 2 ? "Edit Airport" : "New Airport";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.getAllAirports();
  },

  methods: {
    ...mapActions([
      "getAllAirports",
      "createAirport",
      "updateAirport",
      "deleteAirport",
      "searchAirport",
    ]),
    initialize() {
      this.airports = this.allAirports;
    },

    setAirport(item, type) {
      this.handlerType = type;
      this.airport = item;
      if (type === 1) {
        this.dialog2 = true;
      } else if (type === 2) {
        this.dialog = true;
        this.editedAirport = item;
      }
    },

    airportHandler() {
      if (this.handlerType === 1) {
        this.deleteAirport(this.airport.id);
      } else if (this.handlerType === 2) {
        this.updateAirport(this.editedAirport);
      } else {
        const newAirport = Object.assign(this.editedAirport, {
          id: generate(),
          DST: "U",
          source: "OurAirports",
          type: "airport",
        });

        this.createAirport(newAirport);
      }
      this.editedAirport = this.defaultAirport;
      this.handlerType = 0;
      this.dialog = false;
      this.dialog2 = false;
    },

    close() {
      this.editedAirport = this.defaultAirport;
      this.handlerType = 0;
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.airports {
  width: 100%;
  height: 80vh;
}
</style>
