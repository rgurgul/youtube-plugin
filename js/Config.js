var ysamsung = function()
{
	this.debug = true; // true | false
	
	/* Youtube configuration parameters */
	this.config = {};
	this.config.numberOfmovies = 10;
	this.config.firstDisplay = 'Prezentacja korporacyjna JW Construction';
	this.config.youtubeUser = 'JWCLifeElevated';
	this.config.fb = "//connect.facebook.net/pl_PL/all.js#xfbml=1";
	
	/* Translations */
	this.translations = {};
	this.translations.title = 'J.W. Construction';
	this.translations.featured = 'Polecane';
	this.translations.videoDisplay = 'wyświetlenia filmów';
	this.translations.subscribe = 'Subskrybuj';
	this.translations.searchInChannal = 'Szukaj w kanale';
	this.translations.share = 'Udostępnij';
	this.translations.author = 'autor';
	this.translations.description = 'opis';
	this.translations.showMore = 'pokaż więcej';
	this.translations.showLess = 'pokaż mniej';
	this.translations.numberDisplay = 'Liczba wyświetleń';
	this.translations.alertNoResult = 'Brak wyników';
	
	/* Get text to translation */
	this.getText = function(key) 
	{
		if (typeof(this.translations[key]) == 'undefined') {
			if (this.debug) {
				console.log('[No translation for key: ' + key.toUpperCase() + ']');
				return '[' + key.toUpperCase() + ']';
			}
			return '';			
		}
		return this.translations[key];
	};
	
	/* Get config value */
	this.getCfg = function(key) 
	{
		if (typeof(this.config[key]) == 'undefined') {
			if (this.debug) {
				console.log('[No config value for key: ' + key + ']');
			}
			return '';
		}
		return this.config[key];
	};
};

var cfg = new ysamsung;

//console.log(cfg.getText('title'));
//console.log(cfg.getCfg('numberOfmovies'));
//
//console.log(cfg.getCfg('notExistentValue'));
//console.log(cfg.getText('notExistentTranslation'));