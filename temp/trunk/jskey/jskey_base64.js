var $jskey = $jskey || {};



(function(){



	var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";



	var enc = function(str)
	{
		str = str.replace(/\r\n/g, "\n");
		var v = "";
		for(var i = 0; i < str.length; i++)
		{
			var c = str.charCodeAt(i);
			if(c < 128)
			{
				v += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048))
			{
				v += String.fromCharCode((c >> 6) | 192);
				v += String.fromCharCode((c & 63) | 128);
			}
			else
			{
				v += String.fromCharCode((c >> 12) | 224);
				v += String.fromCharCode(((c >> 6) & 63) | 128);
				v += String.fromCharCode((c & 63) | 128);
			}
		}
		return v;
	};



	var dec = function(str)
	{
		var v = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while(i < str.length)
		{
			c = str.charCodeAt(i);
			if(c < 128)
			{
				v += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224))
			{
				c2 = str.charCodeAt(i + 1);
				v += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else
			{
				c2 = str.charCodeAt(i + 1);
				c3 = str.charCodeAt(i + 2);
				v += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return v;
	};



	var encodeBase64 = function(str)
	{
		var v = "";
		var c1, c2, c3, e1, e2, e3, e4;
		var i = 0;
		str = enc(str);
		while(i < str.length)
		{
			c1 = str.charCodeAt(i++);
			c2 = str.charCodeAt(i++);
			c3 = str.charCodeAt(i++);
			e1 = c1 >> 2;
			e2 = ((c1 & 3) << 4) | (c2 >> 4);
			e3 = ((c2 & 15) << 2) | (c3 >> 6);
			e4 = c3 & 63;
			if(isNaN(c2))
			{
				e3 = e4 = 64;
			}
			else if(isNaN(c3))
			{
				e4 = 64;
			}
			v = v + key.charAt(e1) + key.charAt(e2) + key.charAt(e3) + key.charAt(e4);
		}
		return v;
	};



	var decodeBase64 = function(str)
	{
		var v = "";
		var c1, c2, c3;
		var e1, e2, e3, e4;
		var i = 0;
		str = str.replace(/\-/g, "+");
		str = str.replace(/_/g, "/");
		str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while(i < str.length)
		{
			e1 = key.indexOf(str.charAt(i++));
			e2 = key.indexOf(str.charAt(i++));
			e3 = key.indexOf(str.charAt(i++));
			e4 = key.indexOf(str.charAt(i++));
			c1 = (e1 << 2) | (e2 >> 4);
			c2 = ((e2 & 15) << 4) | (e3 >> 2);
			c3 = ((e3 & 3) << 6) | e4;
			v = v + String.fromCharCode(c1);
			if(e3 != 64)
			{
				v = v + String.fromCharCode(c2);
			}
			if(e4 != 64)
			{
				v = v + String.fromCharCode(c3);
			}
		}
		v = dec(v);
		return v;
	};



	$jskey.encodeBase64 = encodeBase64;



	$jskey.decodeBase64 = decodeBase64;



})();
