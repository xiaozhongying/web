var $jskey=$jskey||{};
;!function(){"use strict";
$jskey.$=function(id){return document.getElementById(id);};$jskey.$isDOM=(typeof HTMLElement==='object')?function(o){return o instanceof HTMLElement;}:function(o){return o&&typeof o==='object'&&o.nodeType===1&&typeof o.nodeName==='string';};$jskey.$byTagName=function(name){return document.getElementsByTagName(name);};$jskey.$replace=function(str,t,u){str=str+"";var i=str.indexOf(t);var r="";while(i !=-1){r+=str.substring(0,i)+u;str=str.substring(i+t.length,str.length);i=str.indexOf(t);}r=r+str;return r;};$jskey.$link=function(path){var k=document.createElement("link");k.rel="stylesheet";k.type="text/css";k.href=path;document.getElementsByTagName("head")[0].appendChild(k);k=null;};
$jskey.$src=$jskey.$replace($jskey.$byTagName("script")[$jskey.$byTagName("script").length-1].src+"","\\","/");$jskey.$path=$jskey.$src.substring(0,$jskey.$src.lastIndexOf("/")+1);try{if($jskey.$path.length>7&&$jskey.$path.substring($jskey.$path.length-7)!="/jskey/"){$jskey.$path="/web/js/jskey/";}}catch(e){}
$jskey.$CalendarLang={};
$jskey.Calendar=function(){this.d=new Date();this.$p={"min":"0100-01-01 00:00:00","max":"9999-12-31 23:59:59","cy":this.d.getFullYear(),"cM":this.d.getMonth(),"cd":this.d.getDate()};this.$s={};this.v="jskey_cal";this.$k={"div":this.v+"_a","panel":this.v+"_b","date":this.v+"_c","show":this.v+"_d","x":this.v+"_e","title":this.v+"_f","data":this.v+"_g","prevY":this.v+"_py","nextY":this.v+"_ny","prevP":this.v+"_pp","nextP":this.v+"_np","prevM":this.v+"_pm","nextM":this.v+"_nm","y":this.v+"_y","M":this.v+"_nn","H":this.v+"_H","m":this.v+"_m","s":this.v+"_s","clear":this.v+"_i","ok":this.v+"_j","close":this.v+"_k"};this.$c={"format":"yyyy-MM-dd","lang":"zh-CN","left":0,"top":0,"level":4};this.$focus=false;this.$input=null;this.$div=null;this.$panel=null;this.$sel=null;};
$jskey.Calendar.prototype={$:function(i){return $jskey.$(i);},$skin:function(n){$jskey.$link($jskey.$path+"themes/calendar/"+n+"/skin.css");},$bindData:function(){var E=this;var S=E.$s,I=E.$c.min,A=E.$c.max;E.$(E.$k.show).style.display="none";E.$recovery();var dateArray=E.$getViewArray(E.$int(S.y),E.$int(S.M));var tds=E.$(E.$k.date).getElementsByTagName("td");for(var i=0;i<tds.length;i++){var z=tds[i];z.onclick=z.onmouseover=z.onmouseout=function(){};z.setAttribute("otd","");var v=dateArray[i];z.innerHTML=v;if(v<0){z.className="";z.innerHTML=-v;if(v<-20){var y=S.y,M=S.M;M--;if(M==-1){y--;M=11;}if(E.$checkDate(4,{y:y,M:M,d:-v})){z.setAttribute("otd","x");z.className=z.getAttribute("tn")=="tdDay" ? "hday":"hholiday";E.$onMouse(z);if(E.$c.level==4){z.onclick=function(){E.$s.d=this.innerHTML;E.goPrevMonth(E);E.$recovery();E.$(E.$k.ok).click();};}else{z.onclick=function(){E.$s.d=this.innerHTML;E.goPrevMonth(E);E.$recovery();E.$bindData();};}}}else{var y=S.y,M=S.M;M++;if(M>11){y++;M=0;}if(E.$checkDate(4,{y:y,M:M,d:-v})){z.setAttribute("otd","x");z.className=z.getAttribute("tn")=="tdDay" ? "hday":"hholiday";E.$onMouse(z);if(E.$c.level==4){z.onclick=function(){E.$s.d=this.innerHTML;E.goNextMonth(E);E.$recovery();E.$(E.$k.ok).click();};}else{z.onclick=function(){E.$s.d=this.innerHTML;E.goNextMonth(E);E.$recovery();E.$bindData();};}}}}else if(!(E.$checkDate(4,{y:S.y,M:S.M,d:v}))){z.className="";}else{z.className=(z.getAttribute("tn")=="tdDay")?"day":"holiday";z.isToday=false;if(E.$p.cy==S.y&&E.$p.cM==S.M&&E.$p.cd==v){z.className="today";z.isToday=true;}if(S.d==v){z.className="sel";E.$sel=z;}if(E.$c.level==4){z.onclick=function(){E.$s.d=this.innerHTML;E.$recovery();E.$(E.$k.ok).click();};}else{z.onclick=function(){if(E.$sel !=null){var t="day";if(E.$sel.isToday){t="today";}else{if(E.$sel.getAttribute("tn")!="tdDay"){t="holiday";}}E.$sel.className=t;}this.className="sel";E.$s.d=this.innerHTML;E.$recovery();E.$sel=this;};}E.$onMouse(z);}}},$blur:function(){if(!(this.$focus)){this.$hide();}},$checkDate:function(t,o){var I=this.$c.min,A=this.$c.max,x={M:0,d:1,H:0,m:0,s:0},i={M:0,d:1,H:0,m:0,s:0},a={M:0,d:1,H:0,m:0,s:0};switch(t){case 1:x.s=o.s;i.s=I.s,a.s=A.s;case 2:x.m=o.m;i.m=I.m,a.m=A.m;case 3:x.H=o.H;i.H=I.H,a.H=A.H;case 4:x.d=o.d;i.d=I.d,a.d=A.d;case 5:x.M=o.M;i.M=I.M,a.M=A.M;}var di=(new Date(I.y,i.M,i.d,i.H,i.m,i.s)).valueOf();var da=(new Date(A.y,a.M,a.d,a.H,a.m,a.s)).valueOf();var d=(new Date(o.y,x.M,x.d,x.H,x.m,x.s)).valueOf();return di<=d&&d<=da;},$draw:function(){var E=this;var K=this.$k,L=$jskey.$CalendarLang[E.$c.lang],a=[];a.push('<div style="z-index:10000;">');a.push('<div class="dymd div">');a.push('<div class="dy">');a.push('<div id="'+K.prevY+'" class="btn dp"><div class="jsarr"><div class="left"></div></div></div>');a.push('<div id="'+K.y+'" class="btn year"></div>');a.push('<div id="'+K.nextY+'" class="btn dn"><div class="jsarr"><div class="right"></div></div></div>');a.push('</div>');a.push('<div class="dm"'+(E.$c.level>5?' style="display:none;"':'')+'>');a.push('<div id="'+K.prevM+'" class="btn dp"><div class="jsarr"><div class="left"></div></div></div>');a.push('<div id="'+K.M+'" class="btn month"></div>');a.push('<div id="'+K.nextM+'" class="btn dn"><div class="jsarr"><div class="right"></div></div></div>');a.push('</div>');a.push('</div>');a.push('<div class="date div">');a.push('<table id="'+K.date+'" style="display:'+(E.$c.level>=5 ? 'none':'')+';">');a.push('<tr>');for(var i=0;i<7;i++){a.push('<th class="title">'+L.w[i]+'</th>');}a.push('</tr>');for(var i=0;i<6;i++){a.push('<tr>');for(var j=0;j<7;j++){if(j==0||j==6){a.push('<td tn="tdHoliday"></td>');}else{a.push('<td tn="tdDay"></td>');}}a.push('</tr>');}a.push('</table>');a.push('<div id="'+K.show+'" class="choose">');a.push('<div class="title"><div id="'+K.x+'" class="close" style="float:right;">×</div><div>&nbsp;<span id="'+K.title+'"></span>&nbsp;</div></div>');a.push('<div id="'+K.data+'"></div>');a.push('</div>');a.push('</div>');a.push('<div class="dhmsbtn div">');a.push('<div class="dhms">');a.push('<label'+(E.$c.level>3 ? ' style="display:none;"':'')+'>'+L.t[0]+'</label>');a.push('<label'+(E.$c.level>3 ? ' style="display:none;"':'')+'><div id="'+K.H+'" class="btn"></div>'+L.t[3]+'</label>');a.push('<label'+(E.$c.level>2 ? ' style="display:none;"':'')+'><div id="'+K.m+'" class="btn"></div>'+L.t[2]+'</label>');a.push('<label'+(E.$c.level>1 ? ' style="display:none;"':'')+'><div id="'+K.s+'" class="btn"></div>'+L.t[1]+'</label>');a.push('</div>');a.push('<div class="dbtn">');a.push('<div id="'+K.clear+'" class="btn">'+L.b[1]+'</div>');a.push('<div id="'+K.ok+'" class="btn">'+L.b[0]+'</div>');a.push('<div id="'+K.close+'" class="btn">'+L.b[2]+'</div>');a.push('</div>');a.push('</div>');a.push('</div>');E.$panel.innerHTML=a.join("");E.$(K.prevY).onclick=function(){E.goPrevYear(E);E.$bindData();};E.$(K.nextY).onclick=function(){E.goNextYear(E);E.$bindData();};E.$(K.prevM).onclick=function(){E.goPrevMonth(E);E.$bindData();};E.$(K.nextM).onclick=function(){E.goNextMonth(E);E.$bindData();};E.$(K.y).onclick=function(){E.$drawChoose(6,E.$s.y);};E.$(K.M).onclick=function(){E.$drawChoose(5);};E.$(K.H).onclick=function(){E.$drawChoose(3);};E.$(K.m).onclick=function(){E.$drawChoose(2);};E.$(K.s).onclick=function(){E.$drawChoose(1);};E.$(K.x).onclick=function(){E.$(E.$k.show).style.display="none";};E.$(K.clear).onclick=function(){E.$return("");};E.$(K.close).onclick=function(){E.$hide();};E.$(K.ok).onclick=function(){E.$return(E.$format(new Date(E.$s.y,E.$s.M,E.$s.d,E.$s.H,E.$s.m,E.$s.s),E.$c.format));};},$drawChoose:function(t,year){var E=this;var S=E.$s,o=E.$(E.$k.data),L=$jskey.$CalendarLang[E.$c.lang],a=[];a.push('<table>');if(t<4&&t>0){var m=10;if(t==3){m=4}for(var i=0;i<6;i++){a.push('<tr>');for(var j=0;j<m;j++){a.push('<td cv="'+(i*m+j)+'">'+E.$fnNum(i*m+j)+'</td>');}a.push('</tr>');}}else if(t==5){var m=2;for(var i=0;i<6;i++){a.push('<tr>');for(var j=0;j<m;j++){a.push('<td cv="'+(i*m+j)+'">'+L.M[(i*m+j)]+'</td>');}a.push('</tr>');}}else{var m=4,y=E.$int(E.$fnYear(year).substr(0,3))*10;y=y%20==10 ? y-10:y;for(var i=0;i<5;i++){a.push('<tr>');for(var j=0;j<m;j++){a.push('<td cv="'+(y+i*m+j)+'">'+E.$fnYear(y+i*m+j)+'</td>');}a.push('</tr>');}a.push('<tr>');a.push('<td colspan="2" class="day" cv="'+(y-20)+'" id="'+E.$k.prevP+'"><div class="jsarr"><div class="up"></div></div></td>');a.push('<td colspan="2" class="day" cv="'+(y+20)+'" id="'+E.$k.nextP+'"><div class="jsarr"><div class="down"></div></div></td>');a.push('<tr>');}a.push('</table>');E.$(E.$k.title).innerHTML=L.f[t];o.innerHTML=a.join("");var tds=E.$(E.$k.data).getElementsByTagName("td");for(var i=0;i<tds.length;i++){var z=tds[i];var v=E.$int(z.getAttribute("cv")),q=-1;if(t==6){var _id=z.getAttribute("id")||"";if(_id==E.$k.prevP||_id==E.$k.nextP){var _j=E.$int(z.getAttribute("cv"));if((_id==E.$k.prevP&&(_j>=E.$c.min.y||E.$c.min.y<=(_j+19)))||(_id==E.$k.nextP&&_j<=E.$c.max.y)){z.onclick=function(){E.$drawChoose(6,this.getAttribute("cv"));};E.$onMouse(z);}}else{q=E.$s.y;if(E.$checkDate(6,{y:v})){z.className="day";z.onclick=function(){E.$s.y=this.getAttribute("cv");E.$bindData();};E.$onMouse(z);}}}else if(t==5){q=E.$s.M;if(E.$checkDate(5,{y:S.y,M:v})){z.className="day";z.onclick=function(){E.$s.M=this.getAttribute("cv");E.$bindData();};E.$onMouse(z);}}else if(t==3){q=E.$s.H;if(E.$checkDate(3,{y:S.y,M:S.M,d:S.d,H:v})){z.className="day";z.onclick=function(){E.$s.H=this.innerHTML;E.$bindData();};E.$onMouse(z);}}else if(t==2){q=E.$s.m;if(E.$checkDate(2,{y:S.y,M:S.M,d:S.d,H:S.H,m:v})){z.className="day";z.onclick=function(){E.$s.m=this.innerHTML;E.$bindData();};E.$onMouse(z);}}else if(t==1){q=E.$s.s;if(E.$checkDate(1,{y:S.y,M:S.M,d:S.d,H:S.H,m:S.m,s:v})){z.className="day";z.onclick=function(){E.$s.s=this.innerHTML;E.$bindData();};E.$onMouse(z);}}if(v==q){z.className="sel";z.isMe=true;}}E.$(E.$k.show).style.display="";},$fnNum:function(v){return v<10 ? '0'+(v|0):v;},$fnYear:function(v){v="000"+v;return v.substring(v.length-4,v.length);},$format:function(d,f){var t={"y+":d.getFullYear(),"M+":d.getMonth()+1,"d+":d.getDate(),"H+":d.getHours(),"m+":d.getMinutes(),"s+":d.getSeconds(),"S+":d.getMilliseconds(),"W+":this.$getWeek(d),"w+":$jskey.$CalendarLang[this.$c.lang].w[d.getDay()]};var _t;for(var k in t){while(new RegExp("("+k+")").test(f)){_t=(RegExp.$1.length==1)? t[k]:("0000000000".substring(0,RegExp.$1.length)+t[k]).substr((""+t[k]).length);f=f.replace(RegExp.$1,_t+"");}}return f;},$getLevel:function(s){if(s.indexOf('ss')>-1){return 1;}if(s.indexOf('mm')>-1){return 2;}if(s.indexOf('HH')>-1){return 3;}if(s.indexOf('dd')>-1){return 4;}if(s.indexOf('MM')>-1){return 5;}if(s.indexOf('yyyy')>-1){return 6;}return 6;},$getPoint:function(e){var x=e.offsetLeft,y=e.offsetTop;while(e=e.offsetParent){x+=e.offsetLeft;y+=e.offsetTop;}var a={"sx":x,"sy":y-document.documentElement.scrollTop,"x":x,"y":y,"w":this.$(this.$k.panel).offsetWidth,"h":this.$(this.$k.panel).offsetHeight};return a;},$getViewArray:function(y,m){var a=[];var f=new Date(y,m,1).getDay();var L=new Date(y,m+1,0).getDate();var afL=new Date(y,m,0).getDate();for(var i=f;i>0;i--){a[i-1]=f-i-afL;}for(var i=f+L,j=1;i<42;i++,j++){a[i]=-j;}for(var i=0;i<L;i++){a[i+f]=i+1;}if(this.$s.d>L){this.$s.d=L;}return a;},$getWeek:function(d){var x=new Date(d.getFullYear(),0,1);var y=this.$int(Math.abs(d-x)/ 86400000)+1;var w=(y+x.getDay())/ 7;var i=this.$int(w);return((w>i)?(i+1):i);},goPrevYear:function(E){if(E.$s.y<=E.$c.min.y){return;}E.$s.y--;},goNextYear:function(E){if(E.$s.y>=E.$c.max.y){return;}E.$s.y++;},goPrevMonth:function(E){var S=E.$s,I=E.$c.min;if(S.y<=I.y&&S.M<=I.M){return;}S.M--;if(S.M==-1){S.y--;S.M=11;}},goNextMonth:function(E){var S=E.$s,A=E.$c.max;if(S.y>=A.y&&S.M>=A.M){return;}S.M++;if(S.M==12){S.y++;S.M=0;}},$hide:function(){this.$panel.style.display="none";this.$div.style.display="none";this.$focus=false;},$init:function(){var E=this;var v=E.$k.div;if(E.$(v)==null){var s='<div id="'+E.$k.panel+'" style="position:absolute;display:none;z-index:9999;" class="jskey_cal"></div>';if(document.all){s+='<iframe style="position:absolute;z-index:8888;width:expression(this.previousSibling.offsetWidth);';s+='height:expression(this.previousSibling.offsetHeight);';s+='left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);';s+='display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>';}var o=document.createElement("div");o.innerHTML=s;o.id=v;o.style.display="none";document.body.appendChild(o);E.$panel=E.$(E.$k.panel);E.$div=E.$(v);}},$int:function(v){return parseInt(v,10);},$myDate:function(f){var E=this,y=1,M=0,d=1,H=0,m=0,s=0;switch(f.length){case 19:s=E.$int(f.substring(17,19));case 16:m=E.$int(f.substring(14,16));case 13:H=E.$int(f.substring(11,13));case 10:d=E.$int(f.substring(8,10));case 7:M=E.$int(f.substring(5,7))-1;case 4:y=E.$int(f.substring(0,4));}var v=new Date(y,M,d,H,m,s);var o={y:v.getFullYear(),M:v.getMonth(),d:v.getDate(),H:v.getHours(),m:v.getMinutes(),s:v.getSeconds()};return o;},$onMouse:function(z){var E=this;z.onmouseover=function(){this.className="over";};z.onmouseout=function(){var t="day";if(E.$sel==this){t="sel";}else{if(this.isToday){t="today";}else if(this.isMe){t="sel";}else if(this.getAttribute("otd")=="x"){t=this.getAttribute("tn")!="tdDay" ? "hholiday":"hday";}else if(this.getAttribute("tn")=="tdHoliday"){t="holiday";}}this.className=t;};},$recovery:function(){var E=this;var S=E.$s,K=E.$k,I=E.$c.min,A=E.$c.max;if(S.y==I.y&&S.M<=I.M){S.M=I.M;if(S.d<=I.d){S.d=I.d;if(S.H<=I.H){S.H=I.H;if(S.m<=I.m){S.m=I.m;if(S.s<=I.s){S.s=I.s;}}}}}else if(S.y==A.y&&S.M>=A.M){S.M=A.M;if(S.d>=A.d){S.d=A.d;if(S.H>=A.H){S.H=A.H;if(S.m>=A.m){S.m=A.m;if(S.s>=A.s){S.s=A.s;}}}}}E.$(K.y).innerHTML=E.$fnYear(S.y);if(E.$c.level>=6){return;}E.$(K.M).innerHTML=$jskey.$CalendarLang[E.$c.lang].M[S.M];E.$(K.H).innerHTML=E.$fnNum(S.H);E.$(K.m).innerHTML=E.$fnNum(S.m);E.$(K.s).innerHTML=E.$fnNum(S.s);},$reset:function(d){var E=this;var S=E.$s;S.y=d.getFullYear();S.M=d.getMonth();S.d=d.getDate();S.H=E.$fnNum(d.getHours());S.m=E.$fnNum(d.getMinutes());S.s=E.$fnNum(d.getSeconds());},$return:function(dt){var E=this;var o=E.$input;if(o !=null){o.value=dt;}E.$hide();if(o.onchange==null){if(typeof(o.changeEvent)=='function'){o.changeEvent();}return;}var ev=o.onchange.toString();ev=ev.substring(((ev.indexOf("ValidatorOnChange();")>0)? ev.indexOf("ValidatorOnChange();")+20:ev.indexOf("{")+1),ev.lastIndexOf("}"));o.changeEvent=new Function(ev);o.changeEvent();},$isChange:function(p){var C=this.$c;C.left=p.left;C.top=p.top;C.min=this.$myDate(p.min);C.max=this.$myDate(p.max);if(C.lang !=p.lang||C.level !=p.level||C.format !=p.format){C.lang=p.lang;C.format=p.format;C.level=p.level;return true;}return false;},showCalendar:function(o,p){var E=this;var t;E.$init();if(o==null){throw new Error("error");}if(p.min==null){p.min=E.$p.min;}if(p.max==null){p.max=E.$p.max;}if(p.lang==null){p.lang="zh-CN";}if($jskey.$CalendarLang[p.lang]==null){p.lang="zh-CN";}if(p.left==null){p.left=0;}if(p.top==null){p.top=0;}if(p.format==null){p.format="yyyy-MM-dd";}p.level=E.$getLevel(p.sample||p.show||"yyyy-MM-dd");t=new Date();try{var f=p.format,v=o.value;if(v.length>=f.length){var y=0,M=1,d=1,H=0,m=0,s=0,_y=f.indexOf('yyyy'),_M=f.indexOf('MM'),_d=f.indexOf('dd'),_H=f.indexOf('HH'),_m=f.indexOf('mm'),_s=f.indexOf('ss');if(_y !=-1){y=E.$int(v.substring(_y,_y+4));};if(!isNaN(y)&&y>0){if(_M !=-1){M=v.substring(_M,_M+2);if(isNaN(M)){M=(t.getMonth()+1);}}if(_d !=-1){d=E.$int(v.substring(_d,_d+2));if(isNaN(d)){d=t.getDate();}}if(_H !=-1){H=E.$int(v.substring(_H,_H+2));if(isNaN(H)){H=t.getHours();}}if(_m !=-1){m=E.$int(v.substring(_m,_m+2));if(isNaN(m)){m=t.getMinutes();}}if(_s !=-1){s=E.$int(v.substring(_s,_s+2));if(isNaN(s)){s=t.getSeconds();}}eval("t=new Date("+y+","+(E.$int(M)-1)+","+E.$int(d)+","+E.$int(H)+","+E.$int(m)+","+E.$int(s)+")");}}}catch(e){t=new Date();}E.$reset(t);E.$skin(p.skin||"default");E.$input=o;var x=E.$isChange(p);if(E.$panel.innerHTML==""||x){E.$draw();}E.$bindData();E.$panel.style.display="";E.$div.style.display="";E.$(E.$k.show).style.display="none";t=E.$getPoint(o);E.$panel.style.left=(t.x+E.$c.left)+"px";E.$panel.style.top=((E.$c.top==0)?((t.sy>340)?(t.y-t.h):(t.y+o.offsetHeight)):(t.y+o.offsetHeight+E.$c.top))+"px";if(!o.isTransEvent){o.isTransEvent=true;if(o.onblur !=null){o.blurEvent=o.onblur;}o.onblur=function(){E.$blur();if(typeof(this.blurEvent)=='function'){this.blurEvent();}};}E.$div.onmouseover=function(){E.$focus=true;};E.$div.onmouseout=function(){E.$focus=false;};},show:function(p,old){if($jskey.$isDOM(p)){this.showCalendar(p,old);return true;}if(typeof(old)=='object'){p=old;}if(p.target){this.showCalendar($jskey.$isDOM(p.target)? p.target:this.$(p.target+""),p);return true;}return false;}};
$jskey.$CalendarLang["zh-CN"]={"M":["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"],"w":["日","一","二","三","四","五","六"],"t":["","秒","分","时"],"f":["","秒钟","分钟","时钟","","月份","年份"],"b":["确定","清空","关闭"]};
$jskey.$CalendarLang["zh-TW"]={"M":["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"],"w":["日","一","二","三","四","五","六"],"t":["","秒","分","時"],"f":["","秒鐘","分鐘","時鐘","","月份","年份"],"b":["確定","清空","關閉"]};
$jskey.$CalendarLang["en-US"]={"M":["January","February","March","April","May","June","July","August","September","October","November","December"],"w":["Su","Mo","Tu","We","Th","Fr","Sa"],"t":["Time","",":",":"],"f":["","second","minute","hour","","month","year"],"b":["Done","Cls","Close"]};
$jskey.calendar=new $jskey.Calendar();$jskey.calendar.$skin("default");
}();
"function"===typeof define ? define(function(){return $jskey;}):"undefined" !=typeof exports ? module.exports=$jskey:window.$jskey=$jskey;