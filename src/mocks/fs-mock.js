export default {
  readFileSync: () => '',
  readFile: () => {},
  statSync: () => ({ isDirectory: () => false }),
  // Add other fs methods if jsdom complains in the console
};