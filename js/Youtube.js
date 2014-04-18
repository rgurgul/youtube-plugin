function Youtube()
{
	this.user = '';
	//this.userNameDiv;
	this.state = '';
	this.videosThumbs = '';
	this.playerContainer = '';
	this.userQuery;
	this.firstDisplay;
	this.idFirstVideo = 0;
	this.maxResults = 10;
	this.topViewCount;
	this.playerTitle;
	this.playerAutor;
	this.playerDesc;
	this.playerViewCount;
	this.currentUrl;
};

Youtube.prototype = new EventTarget();

Youtube.prototype.getTotalUploadViews = function()
{
	$.ajax({
		url: "http://gdata.youtube.com/feeds/api/users/" + this.user + "?alt=json",
		dataType: 'jsonp',
		data: '',
		context: this,
		success: function(data)
		{
			this.topViewCount.innerHTML = data.entry[ "yt$statistics" ].totalUploadViews;
			//this.userNameDiv.innerHTML = data.entry.title.$t;
		}
	 });
};

Youtube.prototype.getFeeds = function(state)
{
	this.state = state;
	var rootLink;
	var query;

	if(state == 'videos')
	{
		rootLink = "http://gdata.youtube.com/feeds/api/videos?author=" + this.user + "&v=1";
	}
	else if(state == 'featured')
	{
		rootLink = "http://gdata.youtube.com/feeds/api/videos?author=" + this.user + "&v=1";
	}
	else
	{
		rootLink = "http://gdata.youtube.com/feeds/users/" + user +"/uploads?v=1";
	}
	var alt = "&alt=json";
	//var callback = "&callback=showMyVideos";
	var maxResults = "&max-results=" + this.maxResults;
	var orderby = "&orderby=published";
	//var feature = "&feature=plcp";

	if(this.userQuery)
	{
		query = rootLink + alt + maxResults + '&q=' + this.userQuery + orderby;
	}else{
		query = rootLink + alt + maxResults + orderby;
	}

	$.ajax({
			url: query,
			dataType: 'jsonp',
			data: '',
			context: this,
			success: this.youtube_callback
		 });
};

Youtube.prototype.youtube_callback = function(data)
{
	//this.showMyVideos(data, (this.state == 'featured' ? 4 : 0));
	this.showMyVideos(data);
	//this.fire("reloadVideo");
};

Youtube.prototype.loadVideo = function(playerUrl, autoplay, title, author, desc, viewCount, url)
{
	swfobject.embedSWF(playerUrl + '&rel=1&border=0&showinfo=0&fs=1&autoplay='
			+ (autoplay ? 1 : 0), this.playerContainer, '560', '315', '9.0.0', false,
			false, {
				allowfullscreen : 'true',
				allowScriptAccess: "always"
			});

	this.playerTitle.innerHTML = title;
	this.playerViewCount.innerHTML = cfg.getText('numberDisplay') + ': ' + viewCount;
	this.playerAutor.innerHTML = cfg.getText('author') + ': ' + author;
	this.playerDesc.innerHTML = cfg.getText('description') + ': ' + desc;
	//createNewLikeButton(url);
	this.currentUrl = url;
	this.fire("createNewLikeButton");
};

Youtube.prototype.showMyVideos = function(data)
{
	this.idFirstVideo = 0;
	var feed = data.feed;
	var entries = feed.entry || [];

	if(entries.length == 0)
	{
		this.videosThumbs.innerHTML = "<p style='color: #9C0B08; font-weight: bold;' >" + cfg.getText('alertNoResult') + "</p>";
		refreshThumbContainer();
		return;
	}

	var html = [ '<ul class="videos">' ];
	for ( var i = 0; i < entries.length; i++)
	{
		var entry = entries[i];
		var tmp = entry.title.$t;
		var title = tmp.replace("'", "");
		var tmp = entry.media$group.media$description.$t;
		var tmp1 = tmp.replace("'", "");
		var opis = tmp1.replace(/'/g, "&apos;").replace(/"/g, "&quot;") + ' ';

		if(title == this.firstDisplay)
		{
			this.idFirstVideo = i;
			continue;
		}
		var thumbnailUrl = entry.media$group.media$thumbnail[0].url;
		var playerUrl = entry.media$group.media$content[0].url;
		var url = entry.media$group.media$player[0].url;
		var author = entry.author[0].name.$t;
		var stat = 'brak danych';
		try{
			 stat = entry[ "yt$statistics" ].viewCount;
			}
			catch(e){
			}
		var viewCount = stat;

		var func = "loadVideoMain('"
			+ playerUrl + "','"
			+ true + "','"
			+ title + "','"
			+ author + "','"
			+ opis + "','"
			+ viewCount + "','"
			+ url + "')";

		html.push('<li class=thumbbox-back onclick="', func, '">', '<img src="',
				thumbnailUrl, '" />', '<div class=\'txt-container\'><p class="titlec">', title,
				'</p><span class="video-view-count">', cfg.getText('numberDisplay'), ': ',
				viewCount, '</span>',
				'<p class="opis">', opis,
				'</p></div></li>');
	}
    html.push('</ul><br style="clear: left;"/>');
    this.videosThumbs.innerHTML = html.join('');
    if (entries.length > 0) {
        var stat = 'brak danych';
        try {
            stat = entries[this.idFirstVideo][ "yt$statistics" ].viewCount;
        } catch (e) {
        }
        this.loadVideo(entries[this.idFirstVideo].media$group.media$content[0].url,
            true,
            entries[this.idFirstVideo].title.$t,
            entries[this.idFirstVideo].author[0].name.$t,
                entries[this.idFirstVideo].media$group.media$description.$t
                + ' ',
            stat,
            entries[this.idFirstVideo].media$group.media$player[0].url);

        this.fire("reloadVideo");
    }
};