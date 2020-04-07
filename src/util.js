const head = document.head;
export const loadScripts = (urls, attrs = {}) => {
  const loader = (url, _attrs = {}) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      Object.keys(_attrs || {}).forEach(attr => {
        script.setAttribute(attr, _attrs[attr]);
      });
      head.appendChild(script);
      script.onload = function() {
        resolve(script);
      };
      script.onerror = function() {
        reject(script);
      };
    });
  };
  if (Array.isArray(urls)){
    return Promise.all(urls.map(([url, _attrs={}]) => {
      return loader(url, _attrs);
    }));
  } else {
    return loader(urls, attrs);
  }
};

