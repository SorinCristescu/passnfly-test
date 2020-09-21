<template>
  <div>
    <div ref="map" style="width: 600px; height: 500px"></div>
  </div>
</template>
<script>
export default {
  name: "Map",
  data() {
    return {
      platform: {},
      map: {},
    };
  },
  props: {
    apiKey: String,
    latitude: String,
    longitude: String,
    zoom: String,
  },
  created() {
    const H = window.H;
    this.platform = new H.service.Platform({
      apikey: this.apiKey,
    });
  },
  mounted() {
    const H = window.H;
    this.map = new H.Map(
      this.$refs.map,
      this.platform.createDefaultLayers().vector.normal.map,
      {
        zoom: this.zoom,
        center: { lat: this.latitude, lng: this.longitude },
      }
    );
  },
  methods: {
    dropMarker(position) {
      const H = window.H;
      let marker = new H.map.Marker({
        lat: position.latitude,
        lng: position.longitude,
      });
      this.map.addObject(marker);
    },
  },
};
</script>
