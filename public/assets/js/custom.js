(function(){
    $('.pick-package').click(function(){
        $('.pick-package').removeClass('picked')
        $(this).addClass('picked')
        $('#plan_id').val($(this).data('id'));
    })
    $('.choose-payment').click(function(){
        $('.choose-payment').removeClass('picked')
        $(this).addClass('picked')
        $('#method').val($(this).data('method')); 
    })
    $('.btn-danger').click(function (evt) {
        response = window.confirm("Are You Sure You Want To Do This");
        if (!response) {
          evt.preventDefault();
        }
      });
})();