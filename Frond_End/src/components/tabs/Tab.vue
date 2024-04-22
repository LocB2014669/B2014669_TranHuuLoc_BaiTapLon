<template>
  <div
    class="inline-block p-4 rounded-t-lg hover:text-black hover:bg-white font-bold duration-200 cursor-pointer"
    @click="selectTab"
  >
    <div>
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "index"],
  methods: {
    selectTab() {
      this.$emit("tab-selected", this.index);
    },
  },
};
</script>
