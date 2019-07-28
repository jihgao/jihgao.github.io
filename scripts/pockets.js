var db;
var pockets = [];
var store = localforage.createInstance({
  name: "webhulu.com"
});
window.AV.init('LK2HVhuVJrNVf0yJnST2TVNb-gzGzoHsz', 'KNyncdaxOVjveO3PmJXmBthl');
var Post = window.AV.Object.extend('article');
var pageSize = 50;
var vm = new Vue({
  el: '#pockets',
  data: {
    total: 0,
    loading: false,
    offset_end: 0,
    db: pockets
  },
  methods: {
    getTotal: function(){
      const me = this;
      return Post.query.count().then(function (count) {
        me.total = count;
        console.log(me.total);
      });
    },
    loadData: function(){
      const me = this;
      this.loading = true;
      return Post.query
        .skip(me.offset_end)
        .limit(pageSize)
        .exists('excerpt')
        .exists('givenTitle')
        .notEqualTo('excerpt', '')
        .notEqualTo('givenTitle', '')
        .find()
        .then(function (response) {
          const newArticles = response.map(function (record) {
            var ret = record.toJSON();
            return ret;
          });
          me.db = (me.db.concat(newArticles)).slice();
          me.loading = false;
        });
    },
    loadMore: function(){
      if(this.loading){ return false;}
      let offset_end = this.offset_end;
      offset_end += (pageSize + 2);
      this.offset_end = offset_end;
      this.loadData();
    }
  },
  mounted: function () {
    const me = this;
    me.$nextTick(function () {
      me.getTotal().then(function(){
        me.loadData();
      });
    })
  },
  computed: {
    pockets: function(){
      return this.db;
    }
  }
});

// $(function () {
//   $(window).on('scroll', function () {
//     if($('#pocket-load-more:in-viewport').length){
//       vm.loadMore();
//     };
//   });
// });

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
  store.iterate(function(value) {
    console.error(value);
    if( value && value.resolvedUrl && value.excerpt ){
      items.push(value);
    }
  }).then(function() {
    vm.$data.db = items;
  });
}
