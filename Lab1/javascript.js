var currentweet = 0;
var currentnameduser = 0;

$(document).ready(function(){
	var data;
	var success;
	$.ajax({
			dataType: "text",
			url: "tweetsFromTwitter.json",	
			success:function(result){
				var json = $.parseJSON(result);
				var i;
				var count = Object.keys(json).length;
				for (i=0;i<count;i++){
					var tweet = json[i];
					$(".tweets").append("<section class='tweeted'><p>"+ "<img class='profile' src=" + tweet.user.profile_image_url + " ><a href='" + tweet.user.screen_name + "'>" + tweet.user.screen_name + "</a> - "+ tweet.user.description +"</p><p class='text'> " + tweet.text + "</p></section>");
					var usermentions = Object.keys(tweet.entities.user_mentions).length;
					if(usermentions > 0){
						for (j=0;j<usermentions;j++){
							$(".others").append("<p class='other'><a href='http://twitter.com/" + tweet.entities.user_mentions[j].screen_name + "'>@" + tweet.entities.user_mentions[j].screen_name + "</a></p>");
						}
					}
				}
				$(".tweeted").hide();
				$(".other").hide();
				shownexttweet();
				shownextuser();
			}
	});
});

function shownexttweet(){
	var $list = $(".tweeted");
	var from = (currentweet);
	var to = currentweet+5;
	$list.slice(from-1,from).slideUp();	
	$list.slice(from,to).show(450);
  window.setTimeout(nextplease,3000);	
}

function nextplease(){
	currentweet++;	
	shownexttweet();
}

function shownextuser(){
	var $users = $(".other");
	var from = (currentnameduser);
	var to = currentnameduser+5;
	$users.slice(currentnameduser-1,from).slideUp();
  $users.slice(from,to).show(450);
  window.setTimeout(nextuser,3500);	
}

function nextuser(){
	currentnameduser++;
	shownextuser();

}