/* global $ */

var like = function(event){

	var post_id = event.target.attributes["data-id"].value;

	var status_message = $('.likes__button-message[data-id="' + post_id + '"]');

	$.ajax(
		{
			type: 'POST',
			url: '/gokturkce/' + 'like/' + post_id + '/',
			beforeSend: function(xhr, settings){
				status_message.css('color', 'black').html('Beğeniyor...');
			},
			success: function(data){
				var likes_el = $('.likes[data-id="' + post_id + '"]');
				likes_el.html(data);
			},
			error: function(xhr, status){
					status_message.css('color', 'red').html('Beceremedi.');
			}
		}
	);

};

var comment = function(event){

	console.log(event);
	var post_id = event.target.attributes["data-id"].value;

	$.ajax(
		{
			type: 'POST',
			url: '/gokturkce/' + 'comment/' + post_id + '/',
			data: $('.comments__textarea').val(),
			contentType: 'text/plain',
			beforeSend: function(xhr, settings){
				$('.comments__submit-status').css('color', 'black').html('Yolda...');
			},
			success: function(data, status, xhr){
				$('.comments__submit-status').css('color', 'green').html('Kaydoldu!');
				var comment_el = $('.comments__list[data-id="' + post_id + '"]');
				var new_comment = comment_el.append(data);
				new_comment.addClass('comments__freshly-posted');
			},
			error: function(xhr, status){
				if (xhr.status == 403){
					$('.comments__submit-status').css('color', 'red').html('Önce <a href="/gokturkce/kayit/">Kayıt</a> | <a href="/gokturkce/giris/">Giriş</a>');
				} else if (xhr.status == 422){
					$('.comments__submit-status').css('color', 'red').html('');
				} else {
					$('.comments__submit-status').css('color', 'red').html('Kaydolmadı.');
				}
			}
		}
	);

};


$('.likes__submit').on('click', '.likes__button', function(event){
	like(event);
});

$('.comments__wrapper').on('click', '.comments__submit-button', function(event){
	var text = $('.comments__textarea').val();
	if(text != ''){
		comment(event);
	}
});

var deleteComment = function(event){
	var comment_id = event.target.attributes["data-comment"].value;

	$.ajax(
		{
			type: 'DELETE',
			url: '/gokturkce/' + 'comment/' + comment_id + '/',
			beforeSend: function(xhr, settings){
				$('.comments__comment-status[data-comment="' + comment_id + '"]').css('color', 'black').html('Deleting...');
			},
			success: function(data, status, xhr){
				$('.comments__comment[data-comment="' + comment_id + '"]').remove();
			},
			error: function(xhr, status){
				$('.comments__comment-status[data-comment="' + comment_id + '"]').css('color', 'red').html(status);
			}
		}
	);
};
$('.comments__list').on('click', '.comments__comment-delete', function(event){
	deleteComment(event);
});

var editComment = function(event){
	var comment_id = event.target.attributes["data-comment"].value;
	var comment_text_el = $('.comments__comment-text[data-comment="' + comment_id + '"]');
	var comment_info_el = $('.comments__comment-info[data-comment="' + comment_id + '"]');

	var old_comment_text = comment_text_el.html();
	var old_comment_info = comment_info_el.html();

	/* replace comment text with textarea */
	$('.comments__comment-text[data-comment="' + comment_id + '"]').html(
		'<div class="form-group"><label>Edit Comment</label><textarea rows=5 class="form-control comment__editor" data-comment="' + comment_id + '">'
		+ old_comment_text.replace(/<br>/g, "\n") + '</textarea></div>'
	);

	/* replace comment info with submit button */
	$('.comments__comment-info[data-comment="' + comment_id + '"]').html(
		'<button data-comment="'+ comment_id +'"'
		+ 'class="btn btn-default comments__edit-comment-cancel">İptal et</a>'+
		'<button data-comment="'+ comment_id +'"'
		+ 'class="pull-right btn btn-default comments__edit-comment-btn">Kaydet</a>'
	);

	/* event listener for submit button */
	$('.comments__edit-comment-btn[data-comment="' + comment_id + '"]').on('click', function(event){
		$.ajax(
			{
				type: 'PUT',
				url: '/gokturkce/' + 'comment/' + comment_id + '/',
				data: $('.comment__editor[data-comment="' + comment_id + '"]').val(),
				beforeSend: function(xhr, settings){
					$('.comments__edit-comment-btn[data-comment="' + comment_id + '"]').text('Yolda...');
				},
				success: function(data, status, xhr){
					comment_text_el.html(data);
					comment_info_el.html(old_comment_info);
				},
				error: function(xhr, status){
					$('.comments__edit-comment-btn[data-comment="' + comment_id + '"]').text('Becerdi!');
				}
			}
		);
	});

	$('.comments__edit-comment-cancel').on('click', function(event){
		comment_text_el.html(old_comment_text);
		comment_info_el.html(old_comment_info);
	});
};
$('.comments__list').on('click', '.comments__comment-edit', function(event){
	editComment(event);
});


var search = function(){
	var search_query = $('.search-terms').val();
//    search_query = decodeURIComponent( escape( search_query ) );
	var results_el = $('.search-results');

	$.ajax(
		{
			type: 'GET',
			url: '/gokturkce/' + 'ara/' + search_query,
			beforeSend: function(xhr, settings){
				results_el.css('color', 'black').html('<span class="ariyor">Arıyor...</span>');
			},
			success: function(data, status, xhr){
				if(data.length > 0){
					results_el.html("<h3>Arama sonuçları</h3>");
					console.log(data)
					for(i = 0; i < data.length; i++){
						results_el.append(
							'<div class="result"><h3>'
							+ '<a href="/gokturkce/' + data[i].url_fragment + '/">' + data[i].title + '</a>'
							+ '</h3><span class="ukayits">' + data[i].content.substr(0, 200)+'</span></div>');
					}
				} else {
					results_el.html('<big><span class="aranan_yok">Aradığınız yok.</span> <a href="/gokturkce/yaz/">Göktürkçe yaz</a></big>');
				}
			},
			error: function(xhr, status){
				result_el.html('Beceremedi :(');
			}
		}
	);
};

$('.search-terms').keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
	search();
    }
});

$('.search-submit').on('click', function(){
	search();
});
