const Store = {
  menu: null,
  car: [],
};

const proxiedTore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if ((property = "cart")) {
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
});

export default proxiedTore;
