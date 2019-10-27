$(function(){
  function buildHTML(message){
    var insertImage = message.image.url ? `<img src="${message.image.url}">` : '';
    var html = `<div class='chat-main__messages__body' data-id="${message.id}">
                <div class='chat-main__messages__body__user'>
                  ${message.name}
                </div>
                <div class='chat-main__messages__body__date'>
                  ${message.created_at}
                </div>
                <div class='chat-main__messages__body__text'>
                  ${message.content}
                    </div>
                  ${insertImage}
                </div>
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.new_message').get(0).reset();
      $('.chat-main__form__submit').prop('disabled', false);
      $('.chat-main__messages').animate({scrollTop: $(".chat-main__messages")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
      $('.chat-main__form__submit').prop('disabled', false);
    })
  })

  function scroll() {
    $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast')
  }

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.chat-main__messages__body:last').data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        if (message.id > last_message_id ) {
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-main__messages').append(insertHTML);
    scroll()
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
    }
  };
  setInterval(reloadMessages, 5000);
})
