(function(){
    // $('.pick-package').click(function(){
    //     $('.pick-package').removeClass('picked')
    //     $(this).addClass('picked')
    //     $('#plan_id').val($(this).data('id'));
    // });
    // $('.choose-payment').click(function(){
    //     $('.choose-payment').removeClass('picked')
    //     $(this).addClass('picked')
    //     $('#method').val($(this).data('method')); 
    // });
    // $('.btn-danger').click(function (evt) {
    //     response = window.confirm("Are You Sure You Want To Do This");
    //     if (!response) {
    //       evt.preventDefault();
    //     }
    //   });

  const presentMoney = (money) => {
    if(money){
      money = Number(money);
      return `&#8358;${money.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}`
    }
    return `&#8358;0.00`
  }

    $('.select-package').click(function(){
      $('#select-package .coin-item').html($(this).find('.coin-item').html());
      const value = $(this).data('id');
      $('#name_of_scheme').text($(this).find('.coin-name').text());
      $('#duration_of_scheme').text($(this).find('.duration').text());
      $('#annual_return').text($(this).find('.annual_return').text());
      $('#capital').html(presentMoney($(this).find('.capital').text()));
      $('#plan_id').val(value);
    });

      $('.select-payment-method').click(function(){
        $('#select-payment-method .coin-item').html($(this).find('.coin-item').html());
        const value = $(this).find('.coin-name').text();
        $('#paymentMethod').text(value);
        $('#form_payment_method').val(value);
      });

      $('.invest-amount-item').click(function() {
        $('#amount_to_invest').html(presentMoney($(this).data('amount')));
        $('#form_amount_to_invest').val($(this).data('amount'));
        $('#custom-amount').val($(this).data('amount'));
      });

      $('#custom-amount').change(function(){
        console.log();
        $('#amount_to_invest').html(presentMoney($(this).val()));
        $('#form_amount_to_invest').val($(this).val());
      });

      $('.select-payment-mode').click(function(){
        $('#select-payment-mode .coin-item').html($(this).find('.coin-item').html());
        const value = $(this).find('.coin-name').text();
        if(value === 'Full Payment' && $('#capital').text() != 'Please Select Project'){
          $('#amount_to_invest').html($('#capital').text());
          $('#form_amount_to_invest').val($('#capital').text());
        }
        if(value != 'Full Payment'){
          $('#minute-payment').removeClass('hidden');
        }else{
          $('#minute-payment').addClass('hidden');
        }
        $('#paymentMode').text(value);
        $('#form_payment_mode').val(value);
      });

})();