var btnLastClicked = '';

function selectBtn()
{
	document.forms['channel-search'].q.value = '';
	
	$(btnLastClicked).removeClass( 'selected' );
	$(this).addClass( 'selected' );
	btnLastClicked = this;
}