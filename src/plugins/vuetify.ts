import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import { VDataTable } from 'vuetify/labs/VDataTable';
import * as directives from "vuetify/directives";


export default createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
