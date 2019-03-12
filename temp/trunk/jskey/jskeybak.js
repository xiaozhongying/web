
$jskey.$bind = function(name, fn)
{
	if(document.addEventListener)
	{
		document.addEventListener(name, fn, false);
	}
	else if(document.attachEvent)
	{
		document.attachEvent("on" + name, fn);
	}
};
$jskey.$style = function(o, name)
{
	return (o.currentStyle || getComputedStyle(o, null))[name];
};