(function () {

  $('.nk-menu-trigger-open').click(() => {
    $('.nk-sidebar-overlay').css('display', 'block');
    $('body').addClass('bg-lighter no-touch as-mobile nk-nio-theme nav-shown');
    $('#nk-sidebar').addClass('nk-sidebar-mobile nk-sidebar-active');
  });

  $('.nk-menu-trigger-close').click(() => {
    $('.nk-sidebar-overlay').css('display', 'none');
    $('body').removeClass('bg-lighter no-touch as-mobile nk-nio-theme nav-shown');
    $('#nk-sidebar').removeClass('nk-sidebar-mobile nk-sidebar-active');
  });

  $ ('.btn-danger').click (function (evt) {
    response = window.confirm ('Are You Sure You Want To Do This');
    if (!response) {
      evt.preventDefault ();
    }
  });

  if ($ ('.admin-menu')) {
    $ ('.nk-content').css ('min-height', `${window.innerHeight + 10}px`);
  } else {
    $ ('.nk-content').css ('min-height', `${window.innerHeight - 62}px`);
  }

  const presentMoney = money => {
    if (money) {
      money = Number (money);
      return `&#8358;${money.toFixed (0).replace (/\d(?=(\d{3})+$)/g, '$&,')}`;
    }
    return `&#8358;0.00`;
  };

  $ ('.select-package').click (function () {
    $ ('#select-package .coin-item').html (
      $ (this).find ('.coin-item').html ()
    );
    const value = $ (this).data ('id');
    $ ('#name_of_scheme').text ($ (this).find ('.coin-name').text ());
    $ ('#duration_of_scheme').text (
      $ (this).find ('.duration').text () + ' Years'
    );
    $ ('#annual_return').text ($ (this).find ('.annual_return').text ());
    $ ('#capital').html (presentMoney ($ (this).find ('.capital').text ()));
    $ ('#capital__plain_text').html ($ (this).find ('.capital').text ());
    $ ('#project_id').val (value);
    $ ('#minute-payment').addClass ('hidden');
  });

  const getPaymentOptions = (amount, monthly=false)=>{
    // const amountSegment = [amount/2,amount/4,amount/8,amount/16];
    const amountSegment = monthly? [amount/12]:
    [amount/2,amount/4,amount/8,amount/16];
    return amountSegment.map((eachAmount)=>{
        return `<div class="invest-amount-item" data-amount="${eachAmount}">
            <input type="radio" class="invest-amount-control" 
              name="iv-amount" id="iv-amount-${eachAmount}">
            <label class="invest-amount-label" for="iv-amount-${eachAmount}">
                ${ presentMoney(eachAmount) }
            </label>
        </div>`
    }).join('');
  };

  $ ('.select-payment-method').click (function () {
    $ ('#select-payment-method .coin-item').html (
      $ (this).find ('.coin-item').html ()
    );
    const value = $ (this).find ('.coin-name').text ();
    $ ('#paymentMethod').text (value);
    $ ('#form_payment_method').val (value);
  });

  // $ ('.invest-amount-item').click (function () {
  $('#invest-amount-group').on('click','.invest-amount-item',function () {
    $ ('#amount_to_invest').html (presentMoney ($ (this).data ('amount')));
    $ ('#form_amount_to_invest').val ($ (this).data ('amount'));
  });

  $ ('.select-payment-mode').click (function () {
    $ ('#select-payment-mode .coin-item').html (
      $ (this).find ('.coin-item').html ()
    );
    const value = $ (this).find ('.coin-name').text ();
    if (
      value === 'Full Payment' &&
      $ ('#capital').text () != 'Please Select Project'
    ) {
      $ ('#amount_to_invest').html ($ ('#capital').text ());
      $ ('#form_amount_to_invest').val ($ ('#capital__plain_text').text ());
      $ ('#minute-payment').addClass ('hidden');
    }
    // if (value != 'Full Payment') {
    if (value === 'Part Payment') {
      $('#invest-amount-group').html(
        getPaymentOptions($('#capital__plain_text').text())
      );
      $('#minute-payment').removeClass ('hidden');           
    } 
    // else {
    //   $ ('#minute-payment').addClass ('hidden');
    // }
    if (value === 'Year Payment') {
      $('#invest-amount-group').html(
        getPaymentOptions($('#capital__plain_text').text(),true)
      );
      $('#minute-payment').removeClass ('hidden');           
    } 

    $ ('#paymentMode').text (value);
    $ ('#form_payment_mode').val (value);
  });

  $ ('#confirm_and_proceed').click (event => {
    event.preventDefault ();
    let error = false;

    if (!$ ('#form_payment_method').val ()) {
      error = 'Please Select A Payment Method';
    }
    if (!$ ('#form_amount_to_invest').val ()) {
      error = 'Please Select Amount To Invest';
    }
    if (!$ ('#form_payment_mode').val ()) {
      error = 'Please Select A Payment Mode';
    }
    if (!$ ('#project_id').val ()) {
      error = 'Please Select A Project';
    }

    if (error) {
      $ ('#error').text (error);
      return;
    }

    $ ('#error').text ('');

    $ ('#choose_form').submit ();
  });
}) ();
