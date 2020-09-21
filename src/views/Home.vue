<template>
  <v-container class="pa-10">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to AirApp</h1>
        <h4
          class="text-center ma-10"
        >You can find any airport in the world or you can add your own airport!</h4>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <router-link to="/airports">
            <v-btn color="primary" large>see all airports</v-btn>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>
