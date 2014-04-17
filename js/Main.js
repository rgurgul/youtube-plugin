//	youtube object
var samsungVideo = new Youtube();

$(document).ready(function() 
{
	setLanguage();
	initApp();
});
function setLanguage()
{
	document.title = cfg.getText('title');
	document.getElementById('lan-btn-featured').innerHTML = cfg.getText('featured');
	document.getElementById('lan-top-stat').innerHTML = cfg.getText('videoDisplay');
	document.getElementById('lan-subscribe').innerHTML = cfg.getText('subscribe');
	document.getElementById('lan-user-request').setAttribute("placeholder", cfg.getText('searchInChannal'));
}

function initApp() 
{
	samsungVideo.user = cfg.getCfg('youtubeUser');
	samsungVideo.playerContainer = 'player';
	samsungVideo.maxResults = cfg.getCfg('numberOfmovies'); // max 50; default 10
	samsungVideo.firstDisplay = cfg.getCfg('firstDisplay'); // first displayed clip
	
	samsungVideo.addListener("reloadVideo", refreshVideoThumbContainer);
	samsungVideo.addListener("createNewLikeButton", addNewLikeButton);
	
	samsungVideo.videosThumbs = document.getElementById('videos-thumbs');
	samsungVideo.playerTitle = document.getElementById('player-title');
	samsungVideo.playerAutor = document.getElementById('player-author');
	samsungVideo.playerDesc = document.getElementById('player-desc');
	samsungVideo.playerViewCount = document.getElementById('player-view-count');
	samsungVideo.topViewCount = document.getElementById('view-count');//top - number of films	
	
	samsungVideo.getTotalUploadViews();
	samsungVideo.getFeeds('videos');

//	menu
	$('#btn-polecane').click( selectBtn );
	$('#btn-filmy').click( selectBtn );
	
//	video min box, black scroll
	$('#scrollbar-box').tinyscrollbar();
	
	setTimeout( refreshThumbContainer ,1000)
}

function refreshVideoThumbContainer()
{
	refreshThumbContainer();
	truncate('.opis', 300, '', '', false);
	truncatePlayerDesc();
}
function refreshThumbContainer()
{
	$('#scrollbar-box').tinyscrollbar_update();
}
function addNewLikeButton()
{
	createNewLikeButton(samsungVideo.currentUrl);
}
function truncatePlayerDesc()
{
	truncate('#player-desc', 90, cfg.getText('showMore'), cfg.getText('showLess'), true);	
}

function truncate(obj, len, showMore, hideMore, styleBtn)
{
	$(obj).jTruncate({  
	  length: len,
	  minTrail: 0, 
	  moreText: showMore,  
	  lessText: hideMore,  
	  ellipsisText: "...",  
	  moreAni: "fast",  
	  lessAni: 500,
	  style: styleBtn
	 });  
}

function loadVideoMain(playerUrl, autoplay, title, author, desc, viewCount, url)
{
	samsungVideo.loadVideo(playerUrl, autoplay, title, author, desc, viewCount, url);
	truncatePlayerDesc();
}

function userQuery()
{
	samsungVideo.userQuery = document.forms['channel-search']['q'].value;
	samsungVideo.getFeeds('videos');
	//truncatePlayerDesc();
}

function searchClick(e) 
{
    if (e.keyCode == 13) 
    {
    	userQuery();
    	return false;
    }
}