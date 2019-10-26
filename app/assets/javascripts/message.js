$(function(){
  function buildHTML(message){
    var insertImage = message.image.url ? `<img src="${message.image.url}">` : '';
    var html = `<div class='chat-main__messages__user'>
                  ${message.name}
                </div>
                <div class='chat-main__messages__date'>
                  ${message.created_at}
                </div>
                <div class='chat-main__messages__text'>
                  ${message.content}
                    </div>
                  ${insertImage}
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
})




//       var html = buildHTML(data);
//       $('.chat-main__messages').append(html)
//       $('.new_message').get(0).reset();
//       $('.chat-main__form__submit').prop('disabled', false);
//       $('.chat-main__messages').animate({scrollTop: $(".chat-main__messages")[0].scrollHeight}, 1500);
//     })
//   });
// });