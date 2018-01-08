import Message from '../message';
// import Qtip from '../qtip';

export default class Request {
  constructor(form, url) {
    this.form = form;
    this.url = url;
    this.message = this.createMessage();

    $(form).on('click', '.error', this.removeError);
    $(form).on('reset', this.clearForm);
  }

  // createQtip(el) {
  //   let qtip = new Qtip();
  //   let msg = $(el).data('qtip');
  //   let label = el.closest('label');
    
  //   qtip.text(msg);
  //   label.appendChild(qtip.elem);
  // }

  createMessage() {
    let message = new Message();
    document.querySelector('body').appendChild(message.elem);
    return message;
  }

  validate(form) {
    let inputs = form.find('input, textarea').not('input[type="file"], input[type="hidden"], input[type="checkbox"], input[type="radio"]');
    let human = form.find('input[type="checkbox"]').prop('checked');
    let sure = form.find('input[type="radio"]:checked').val() == 'yes';
    let status = {'valid': true, 'msg': ''};
    
    if(!human || !sure) {
      status.valid = false;
      status.msg = 'Роботам тут не место';
    }

    $.each(inputs, function(index, v) {
      let input = $(v),
        val = input.val();
        
      if(val.length === 0) {
        input.addClass('error');
        // Request.createQtip(input[0]);
        status.valid = false;
        status.msg = 'Вы заполнили не все поля';
      }
    });

    return status;
  }

  ajax(form, url) {
    let Request = this;
    let status = this.validate(form);
    if (!status.valid) {
      this.message.text(status.msg);
      this.message.show();

      return false;
    }

    let data = form.serialize();

    var result = $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data,
    }).fail(function() {
      Request.message.text('Ошибка сервера');
      Request.message.show();
    });
    
    return result;
  }

  request() {
    let serverAnswer = this.ajax($(this.form), this.url);
      
    if(serverAnswer) {
      serverAnswer.done(function(ans) {
        
        if(ans.status === 'OK') {
          this.message.text(ans.text);
          this.message.show();
        } else {
          this.message.text(ans.text);
          this.message.show();
        }
      });
    }
  }

  removeError(e) {
    let tar = $(e.target);

    // tar.closest('label').find('.qtip').remove();
    tar.removeClass('error');
  }

  clearForm(e) {
    let form = $(e.target);
    // form.find('.qtip').remove();
    form.find('.error').removeClass('error');
  }
}