var db;
var pockets = [];
var store = localforage.createInstance({
  name: "webhulu.com"
});
var vm = new Vue({
  el: '#pockets',
  data: {
    offset_end: 11,
    db: pockets
  },
  methods: {
    loadMore: function(){
      let offset_end = this.offset_end;
      offset_end +=  12;
      this.offset_end = offset_end;
    }
  },
  computed: {
    pockets: function(){
      return this.db.slice(0, this.offset_end);
    }
  }
});
window.onload = function() {
  getItems();
  var myRequest = new Request('/pockets.json');
  fetch(myRequest).then(function(response) {
    return response.json();
  }).then(function(response) {
    let i=0, cnt = response.length;
    save(0, cnt-1, response);
  });
}

function save(offset, maxOffset, list){
  if( offset < maxOffset){
      return store.getItem(list[offset].item_id).then(function(value){
        if( !value ){
          return store.setItem(list[offset].item_id, list[offset], function(){
            return save(++offset, maxOffset, list);
          });
        }else{
          return save(++offset, maxOffset, list);
        }
    });
  }else{
    getItems();
  }
}

function getItems(){
  var items = [];
  store.iterate(function(value, key, iterationNumber) {
    if( value && value.url && value.excerpt ){
      items.push(value);
    }
  }).then(function(result) {
    vm.$data.db = items;
  });
}
