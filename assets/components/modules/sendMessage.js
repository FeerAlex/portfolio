import Message from '../message';

export default class Request {
  constructor(form, url) {
    this.form = form;
    this.url = url;
    this.message = this.createMessage();

    $(form).on('click', '.error', this.removeError);
    $(form).on('reset', this.clearForm);
  }

  createMessage() {
    let message = new Message();
    document.querySelector('body').appendChild(message.elem);
    return message;
  }

  validate(form) {
    let inputs = form.find('input, textarea').not('input[type="file"], input[type="hidden"], input[type="checkbox"], input[type="radio"]'),
      valid = true;
    
    $.each(inputs, function(index, v) {
      let input = $(v),
        val = input.val();
        
      if(val.length === 0) {
        input.addClass('error');
        valid = false;
      }
    });

    return valid;
  }

  ajax(form, url) {
    let Request = this;
    if (!this.validate(form)) {
      this.message.text('Вы заполнили не все поля');
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
    let Request = this;
    let serverAnswer = Request.ajax($(Request.form), Request.url);
      
    if(serverAnswer) {
      serverAnswer.done(function(ans) {
        
        if(ans.status === 'ok') {
          Request.message.text(ans.message);
          Request.message.show();
        } else {
          Request.message.text(ans.message);
          Request.message.show();
        }
      });
    }
  }

  removeError(e) {
    let tar = $(e.target);
    tar.removeClass('error');
  }

  clearForm(e) {
    let form = $(e.target);
    form.find('.error').removeClass('error');
  }
}