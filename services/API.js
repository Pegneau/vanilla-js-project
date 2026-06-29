const API = {
  fetchMenu: async () => {
    const result = await fetch(new URL("../data/menu.json", import.meta.url));
    return await result.json();
  },
};

export default API;
