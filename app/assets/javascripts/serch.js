$(function() {
  var DeleteUsers = [];

  function addUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <div class="chat-group-user__name">${user.name}</div>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user" data-user-id="${id}">
      <div class="chat-group-user__deletename">${name}</div>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $("#chat-group-users").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`.chat-group-user#${userId}`).append(html);
  }
  
  $("#user-search-field").on("keyup", function() {
    $(".chat-group-user__deletename").each(function(i) {
      DeleteUsers.push($(this).text());
    });
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input ,DeleteUser: DeleteUsers},
      dataType: 'json',
    })
    .done(function(members){
      $("#user-search-result").empty();
      if (members.length !== 0) {
        members.forEach(function(user){
          addUser(user);
        });
      }
      else {
        addNoUser();
      }
    })
    .fail(function() {
      alert('メンバーの検索に失敗しました');
    })
  });

  $(document).on("click", ".user-search-add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});