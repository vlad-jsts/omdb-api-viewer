<template>
  <div class="movies-table">
    <v-data-table
      v-if="props.data.length"
      :items-per-page="pageCount"
      :headers="headers"
      :items="props.data"
      hide-default-footer
      :total-count="500"
    >
      <template #item="{ item }">
        <tr>
          <td>
            <div class="movie-poster">
              <img :src="item.columns.Poster" alt="Poster" />
            </div>
          </td>
          <td>{{ item.columns.Title }}</td>
          <td>{{ item.columns.Type }}</td>
          <td>{{ item.columns.Year }}</td>
          <td>{{ item.columns.imdbID }}</td>
        </tr>
      </template>

      <template #bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="Math.ceil(props.totalCount / pageCount)"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>

    <v-card
      v-else
      class="help-text px-4 py-5 d-flex text-center justify-center"
    >
      <p v-if="props.helpText">{{ props.helpText }}</p>
      <p v-else>Please search movies.</p>
    </v-card>
    <div v-if="props.loading" class="overlay">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, PropType } from "vue";
import { Movie } from "@/resources/types";

const props = defineProps({
  data: {
    type: Array as PropType<Movie[]>,
    default: () => [],
  },
  helpText: {
    type: String,
    default: () => '',
  },
  totalCount: {
    type: Number,
    default: () => 0,
  },
  page: {
    type: Number,
    default: () => 1,
  },
  loading: Boolean,
});
const emit = defineEmits(["updatePage"]);
const pageCount = 10;

const page = computed({
  get: () => props.page,
  set: (newValue) => {
    emit("updatePage", newValue);
  },
});

const headers = [
  {
    title: "Poster",
    align: "start",
    sortable: false,
    key: "Poster",
  },
  {
    title: "Title",
    align: "start",
    sortable: false,
    key: "Title",
  },
  {
    title: "Type",
    align: "start",
    sortable: false,
    key: "Type",
  },
  {
    title: "Year",
    align: "start",
    sortable: false,
    key: "Year",
  },
  {
    title: "imdbID",
    align: "start",
    sortable: false,
    key: "imdbID",
  },
];
</script>

<style scope lang="scss">
.movies-table {
  margin-top: 30px;
  position: relative;

  thead {
    tr th {
      background-color: #F5F5F5 !important;
    }
  }

  tr {
    td {
      .movie-poster {
        border-radius: 8px;
        margin: 5px 10px;
        width: 45px;
        height: 60px;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .help-text {
    box-shadow: 0px 0 3px gray;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000030;
  }

  .v-pagination__list {
    li .v-btn {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
