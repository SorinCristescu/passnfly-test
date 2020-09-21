<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Airports Logo"
          class="shrink mr-2"
          contain
          src="../../assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>
