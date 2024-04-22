<template>
  <div v-show="active" class="tab-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["active"],
};
</script>
