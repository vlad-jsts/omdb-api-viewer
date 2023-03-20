<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col sm="4" class="py-0">
        <v-select
          v-model="filter.type"
          density="compact"
          :items="typeOptions"
          label="Type"
          variant="outlined"
          clearable
        ></v-select>
      </v-col>
      <v-col sm="4" class="py-0">
        <v-select
          v-model="filter.plot"
          density="compact"
          :items="plotOptions"
          label="Plot"
          variant="outlined"
          clearable
        ></v-select>
      </v-col>
      <v-col sm="4" class="py-0">
        <div class="datepicker-wrapper">
          <v-text-field
            v-model="filter.y"
            label="Year"
            density="compact"
            placeholder="Year"
            variant="outlined"
          ></v-text-field>

          <Datepicker
            v-model="year"
            starting-view="year"
            minimum-view="year"
            input-format="yyyy"
            clearable
          ></Datepicker>
        </div>
      </v-col>
      <v-col sm="12" class="py-0">
        <div class="d-flex">
          <v-text-field
            v-model="filter.s"
            :rules="searchRule"
            label="Search"
            density="compact"
            placeholder="Search"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>

          <div class="d-flex justify-end ml-4">
            <v-btn type="submit" color="success">Search</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref, watch, PropType } from "vue";
import Datepicker from "vue3-datepicker";

import { MovieType, MoviePlot } from "@/resources/enums";
import { MovieFilter } from "@/resources/types";

const props = defineProps({
  modelValue: {
    type: Object as PropType<MovieFilter>,
    default: () => ({
      s: ""
    })
  },
});
const emit = defineEmits(["update:modelValue", "search"]);

const filter = computed({
  get: (): MovieFilter => props.modelValue,
  set: (newValue) => {
    emit("update:modelValue", newValue);
  },
});

const year = ref<Date>();

const searchRule = [
  (value: string) => {
    if (!value) return "You must enter search key.";
    return true;
  },
];

const typeOptions = Object.keys(MovieType).map((key: string, index: number) => ({
  title: key,
  value: Object.values(MovieType)[index],
}));

const plotOptions = Object.keys(MoviePlot).map((key: string, index: number) => ({
  title: key,
  value: Object.values(MoviePlot)[index],
}));

const validateForm = () => !!filter.value.s;

const handleSubmit = () => {
  emit("search");
  if (validateForm()) {
  }
};

watch(year, (newValue) => {
  if (newValue) {
    filter.value.y = new Date(newValue).getFullYear();
  } else {
    filter.value.y = undefined;
  }
});
</script>

<style scope lang="scss">
.datepicker-wrapper {
  position: relative;
  border-radius: 8px;

  .v3dp__datepicker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .v3dp__input_wrapper {
      position: relative;

      .v3dp__clearable {
        position: absolute;
        left: unset;
        right: 12px;
        top: 7px;
      }
    }

    input {
      width: 100%;
      height: 40px;
      padding-left: 20px;
      padding-right: 10px;
      border: 0;
      color: transparent;
      background: transparent;
      outline: none;
    }
  }
}
</style>
