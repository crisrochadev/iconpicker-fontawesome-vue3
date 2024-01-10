<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col">
    <IconpickerFontawesome v-model:icon="icon"  />
  </div>
</template>

<script>
import IconpickerFontawesome from "./components/IconpickerFontawesome.vue";

export default {
  name: "App",
  components: {
    IconpickerFontawesome,
  },
  data(){
    return {
      icon:null
    }
  }
};
</script>

<style></style>
