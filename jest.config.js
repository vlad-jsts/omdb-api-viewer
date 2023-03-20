module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [1343]
      },
      astTransformers: {
        before: [
          {
            path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
            options: {
              metaObjectReplacement: {
                env: {
                  VITE_OMDB_API: 'http://www.omdbapi.com',
                  VITE_OMDB_API_KEY: 'a272439c'
                }
              }
            }
          }
        ]
      }
    }
  }
};
