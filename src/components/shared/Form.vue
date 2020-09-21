<template>
  <form>
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="item.name"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                :error-messages="nameErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.city"
                label="City"
                @input="$v.city.$touch()"
                @blur="$v.city.$touch()"
                :error-messages="cityErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.country"
                label="Country"
                @input="$v.country.$touch()"
                @blur="$v.country.$touch()"
                :error-messages="countryErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.iata"
                label="IATA"
                @input="$v.iata.$touch()"
                @blur="$v.iata.$touch()"
                :error-messages="iataErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.icao"
                label="ICAO"
                @input="$v.icao.$touch()"
                @blur="$v.icao.$touch()"
                :error-messages="icaoErrors"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="item.latitude"
                label="Latitude"
                @input="$v.latitude.$touch()"
                @blur="$v.latitude.$touch()"
                :error-messages="latitudeErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.longitude"
                label="Longitude"
                @input="$v.longitude.$touch()"
                @blur="$v.longitude.$touch()"
                :error-messages="longitudeErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.altitude"
                label="Altitude"
                @input="$v.altitude.$touch()"
                @blur="$v.altitude.$touch()"
                :error-messages="altitudeErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.timezone"
                label="Timezone"
                @input="$v.timezone.$touch()"
                @blur="$v.timezone.$touch()"
                :error-messages="timezoneErrors"
              ></v-text-field>
              <v-text-field
                v-model="item.tz"
                label="TZ"
                @input="$v.tz.$touch()"
                @blur="$v.tz.$touch()"
                :error-messages="tzErrors"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clear">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
  },
  name: "Form",
  props: {
    title: String,
    item: Object,
    initialValues: Object,
    close: Function,
    save: Function,
  },
  data: () => {
    // values: {
    // }
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.city.required && errors.push("Name is required.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.country.required && errors.push("Name is required.");
      return errors;
    },
    iataErrors() {
      const errors = [];
      if (!this.$v.iata.$dirty) return errors;
      !this.$v.iata.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.iata.required && errors.push("Name is required.");
      return errors;
    },
    icaoErrors() {
      const errors = [];
      if (!this.$v.icao.$dirty) return errors;
      !this.$v.icao.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.icao.required && errors.push("Name is required.");
      return errors;
    },
    latitudeErrors() {
      const errors = [];
      if (!this.$v.latitude.$dirty) return errors;
      !this.$v.latitude.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.latitude.required && errors.push("Name is required.");
      return errors;
    },
    longitudeErrors() {
      const errors = [];
      if (!this.$v.longitude.$dirty) return errors;
      !this.$v.longitude.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.longitude.required && errors.push("Name is required.");
      return errors;
    },
    altitudeErrors() {
      const errors = [];
      if (!this.$v.altitude.$dirty) return errors;
      !this.$v.altitude.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.altitude.required && errors.push("Name is required.");
      return errors;
    },
    timezoneErrors() {
      const errors = [];
      if (!this.$v.timezone.$dirty) return errors;
      !this.$v.timezone.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.timezone.required && errors.push("Name is required.");
      return errors;
    },
    tzErrors() {
      const errors = [];
      if (!this.$v.tz.$dirty) return errors;
      !this.$v.tz.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.tz.required && errors.push("Name is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.save();
    },
    clear() {
      this.$v.$reset();
      //   this.name = "";

      this.close();
    },
  },
};
</script>
