var db;
var pockets = [];
window.onload = function() {
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  var DBOpenRequest = window.indexedDB.open("webhulu", 4);
  DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    var objectStore = db.transaction("pockets").objectStore("pockets");

    objectStore.transaction.oncomplete = function(event) {
      var myRequest = new Request('/pockets.json');
      fetch(myRequest).then(function(response) {
        return response.json();
      }).then(function(response) {
        var customerObjectStore = db.transaction("pockets", "readwrite").objectStore("pockets");
        for (var i in response) {
          (function(item){
            customerObjectStore.get(item.item_id).onsuccess = function(event) {
              if( !event.target.result ){
                customerObjectStore.add(item);
              }
            };
            customerObjectStore.get(item.item_id).onerror = function(){
              customerObjectStore.add(item);
            }
          })(response[i]);
        }
      });
    };


    var objectStore2 = db.transaction("pockets").objectStore("pockets");
    objectStore2.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        if( cursor.value.title && cursor.value.excerpt ){
          pockets.push(cursor.value);
        }
        cursor.continue();
      }
    };
  };
  DBOpenRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("pockets", { keyPath: "item_id" });
    objectStore.createIndex("url", "url", { unique: false });
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("excerpt", "excerpt", { unique: false });
    objectStore.createIndex("item_id", "item_id", { unique: true });
  };
}


new Vue({
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