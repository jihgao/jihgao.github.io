  $(function(){
    var sidebar = $("#sidebar");
    var lst_scroll = 0;
    function onScroll(){
      var current_scroll = $(document).scrollTop();
      if( sidebar.css('position') === 'fixed'){
        if ( current_scroll < lst_scroll ){
          TweenLite.to("#sidebar", 1, {top:"0", ease:Power2.easeIn});
        }else if( current_scroll > sidebar.outerHeight() + 100 ){
          TweenLite.to("#sidebar", 1, {top:"-40px", ease:Power2.easeInOut});
        }else{
          TweenLite.to("#sidebar", 1, {top:"0", ease:Power2.easeIn});
        }
        lst_scroll = current_scroll;
      }
    }
    $(window).on('scroll', _.throttle(onScroll, 50));
  });