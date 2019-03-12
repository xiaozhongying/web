var $jskey = $jskey || {};



(function(){



var $$ = function(ele, p) {
	if(!$$.has()) {
		return;
	}
	var o = $$.init(p);
	$$.print(ele, o);
};
$$.init = function(p){
	var o = {
		wmode: "transparent",
		quality: "high",
		scale: "exactfit",
		pluginspage: "http:\/\/www.adobe.com/go/getflashplayer",
		type: "application/x-shockwave-flash"
	};
	var w = p.width || 320;
	var h = p.height || 240;
	o.style = "width:" + w + "px;height:" + h + "px;";
	o.src = p.src || "#";
	o.flashvars = p.flashvars || {};
	o.allowScriptAccess = p.allowScriptAccess || "always";
	//o.movie = o.src;
	return o;
};
$$.has = function() {
	var pv = $$.version().match(/\d+/g);
	//var rv = String([arguments[0], arguments[1], arguments[2]]).match(/\d+/g) || String("6,0,65").match(/\d+/g);
	var rv = String("6,0,65").match(/\d+/g);
	for(var i = 0; i < 3; i++) {
		pv[i] = parseInt(pv[i] || 0);
		rv[i] = parseInt(rv[i] || 0);
		if(pv[i] < rv[i]) return false;
		if(pv[i] > rv[i]) return true;
	}
	return true;
};
$$.version = function() {
	// ie
	try {
		try {
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			try { axo.AllowScriptAccess = "always";	} 
			catch(e) { return "6,0,0"; }				
		} catch(e) {}
		return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
	// other browsers
	} catch(e) {
		try {
			if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
				return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
			}
		} catch(e) {}		
	}
	return "0,0,0";
};
function toAttributeString() {
	var s = "";
	for(var key in this) {
		if(typeof this[key] != "function") {
			s += key+"=\""+this[key]+"\" ";
		}
	}
	return s;		
}
function toFlashvarsString() {
	var s = "";
	for(var key in this) {
		if(typeof this[key] != "function") {
			s += key+'='+encodeURIComponent(this[key])+"&";
		}
	}
	return s.replace(/&$/, "");		
}
//function toParamString() {
//	var s = "";
//	for(var key in this) {
//		if(typeof this[key] != "function") {
//			s += "<param name=\"" + key+"\" value=\""+this[key]+"\" />";
//		}
//	}
//	return s;		
//}
$$.print = function(obj, o) {
	o.toString = toAttributeString;
	o.flashvars.toString = toFlashvarsString;
	var s = "<embed " + String(o) + "/>";
	//o.toString = toParamString;
	//s = "<object style=\"" + o.style + "\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\">" + String(o) + s + "</object>";
	//alert(s);
	obj.innerHTML = s;
};



$jskey.flash = $$;



if(typeof(jQuery)=="function" && typeof(jQuery.fn)=="object"){
	jQuery.fn.flash = function(p) {
		if(!$$.has()) {
			return this;
		}
		var o = $$.init(p);
		return this.each(function(){
			$$.print(this, o);
		});
	};
}



})();