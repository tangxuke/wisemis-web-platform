<template>
    <Checkbox v-model="Value" ref="control"></Checkbox>
</template>

<script>
export default {
  props: ["oFieldObject"],
  computed: {
    Value: {
      get() {
        if (typeof this.oFieldObject.Value !== "boolean") return false;
        else return this.oFieldObject.Value;
      },
      set(value) {
        this.oFieldObject.Value = value;
      }
    }
  }
};
</script>
