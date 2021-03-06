/**
 * 日历类
 * @version 6
 * @datetime 2013-01-17 18:00
 * @author skey_chen
 * @email skey_chen@163.com
 */
if(typeof ($jskey) != "object")
{
	$jskey = {};
}
//内部自定义参数
//根据id获得元素
$jskey.$ = function(id)
{
	return document.getElementById(id);
};
//根据tagName获得元素数组
$jskey.$byTagName = function(name)
{
	return document.getElementsByTagName(name);
};
$jskey.$replace = function(str, t, u)
{
	str = str + "";
	var i = str.indexOf(t);
	var r = "";
	while(i != -1)
	{
		r += str.substring(0, i) + u;//已经匹配完的部分+替换后的字符串
		str = str.substring(i + t.length, str.length);//未匹配的字符串内容
		i = str.indexOf(t);//其余部分是否还包含原来的str
	}
	r = r + str;//累加上剩下的字符串
	return r;
};

$jskey.$src = $jskey.$replace($jskey.$byTagName("script")[$jskey.$byTagName("script").length - 1].src + "", "\\", "/");
//当前此js文件的目录路径
$jskey.$path = $jskey.$src.substring(0, $jskey.$src.lastIndexOf("/") + 1);



//需要$jskey.$()方法
//需要$jskey.$byTagName()方法
//需要$jskey.$replace()方法
//需要$jskey.$path变量
//加载所有皮肤
if(true)
{



	//皮肤列表，其中name值为皮肤文件夹名称
	var _skin = [
		{name:"default"},//必须存在default
		{name:"gray"},
		{name:"lightGreen"}
	];



	// _h:head标签
	var _h = $jskey.$byTagName("head");
	for(var i = _skin.length - 1;i >= 0 ;i--)
	{
		// _f:css文件的url地址
		var _f = $jskey.$path + "themes/calendar/" + _skin[i].name + "/skin.css";
		//document.write('<link rel="stylesheet" type="text/css" skinType="WebCalendar" disabled="true"' + ' href="' + _f + '" skin="' + _skin[i].name + '"/>');
		// _k:创建的link标签
		var _k = document.createElement("link");
		_k.setAttribute("rel", "stylesheet");
		_k.setAttribute("type", "text/css");
		_k.setAttribute("skinType", "JskeyCalendar");
		_k.setAttribute("disabled", "true");
		if(i == 0)
		{
			_k.disabled = false;//默认加载default皮肤
		}
		_k.setAttribute("href", _f);
		_k.setAttribute("skin", _skin[i].name);
		_h[_h.length - 1].appendChild(_k);
	}



}



$jskey.Calendar = function()
{
	this.d = new Date();// 临时变量
	this.$p = {
		"s":1,"m":2,"H":3,"d":4,"M":5,"y":6,// 从秒(小)到年(大)
		"begin":1900,//this.d.getFullYear() - 100,// 默认的初始化年份个数
		"end":this.d.getFullYear() + 20,
		"cy":this.d.getFullYear(),//当前年
		"cM":this.d.getMonth(),//当前月
		"cd":this.d.getDate()//当前日
	};
	// 记录当前需要显示的月历，需要$fnReset初始化
	this.$s = {
		//"y":this.$p.begin,"M":1,"d":1,"H":1,"m":1,"s":1
	};
	//上次选的，默认为当前天，可考虑不要，因为不太需要标记出上次选的值，因为输入框中还保有原值
	//this.$v = {"y":this.$p.cy,"M":this.$p.cM,"d":this.$p.cd};//当前值年月日
	this.v = "jskeyCalendar";
	this.$k = {// id不区分大小写
		"div"   :this.v + "_div",//Container最外围容器
		"panel" :this.v + "_p",  //日历容器
		"y"     :this.v + "_y",  //Select Year
		"prevM" :this.v + "Mp",  //Button PrevMonth
		"M"     :this.v + "Mc",  //Select CurrMonth
		"nextM" :this.v + "Mn",  //Button NextMonth
		"table" :this.v + "_T",  //Table
		"H"     :this.v + "_H",  //Select Hour
		"m"     :this.v + "_m",  //Select Minute
		"s"     :this.v + "_s",  //Select Second
		"bclear":this.v + "_r",  //Button Clear
		"btoday":this.v + "_d",  //Button Today
		"bclose":this.v + "_e"   //Button Close
	};
	this.$c = {
		"format":"yyyy-MM-dd",//yyyy-MM-dd HH:mm:ss
		"begin":this.$p.begin,
		"end":this.$p.end,
		"lang":0,//0(中文) | 1(英文)
		"left":0,
		"top":0,
		"level":this.$p.d//复位相对于show值为yyyy-MM-dd
	};
	//public 初始化
	this.$focus = false;//是否为焦点
	this.$input = null;
	this.$div = null;//因为ie下需要增加frame才能置顶，所以它放了日历容器和frame，顺便用于控制是否显示
	this.$panel = null;//div容器中实际的日历div
	this.$skin = [];
	this.$selTD = null;// 当前被选中的td单元格
	//语言包，可自由扩展
	this.$lang =
	{
		"y":[
			""
			,""
		],
		"M":[
			["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
			,["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
		],
		"w":[
			["日","一","二","三","四","五","六"]
			,["SUN","MON","TUR","WED","THU","FRI","SAT"]
		],
		//考虑到每个地方的季节分布不一样(1月-12月)比如中国春季是3-5月 etc.
		//"q":[
		//	["冬", "冬", "春", "春", "春", "夏", "夏", "夏", "秋", "秋", "秋", "冬"]
		//	,["WINTER", "WINTER", "SPRING", "SPRING", "SPRING", "SUMMER", "SUMMER", "SUMMER", "AUTUMN", "AUTUMN", "AUTUMN", "WINTER"]
		//],
		"t":[
			["时", "分", "秒"]
			,["H", "M", "S"]
		],
		"b":[//精确到年、月时把今天变成“确定”
			["今天", "确定", "清空", "关闭"]
			,["TODAY","OK","CLS","CLOSE"]
		]
	};
};



$jskey.Calendar.prototype =
{
	// 按日期重置$s @param d Date类型
	$fnReset:function(d)
	{
		this.$s.y = d.getFullYear();
		this.$s.M = d.getMonth();
		this.$s.d = d.getDate();
		this.$s.H = d.getHours();
		this.$s.m = d.getMinutes();
		this.$s.s = d.getSeconds();
	},
	// 把$s转化为date类型
	$fnDate:function()
	{
		var o = this.$s;
		return new Date(o.y, o.M, o.d, o.H, o.m, o.s);
	},
	/**
	 * 取出指定日期是该年的第几周@param currDate当前时间对象
	 */
	$fnGetWeek:function(d)
	{
		var _co = new Date(d.getFullYear(), 0, 1);//当前年1月1日
		var cDay = parseInt(Math.abs(d - _co) / 86400000) + 1;//计算当前时间是今年第几天86400000 = 1000 * 60 * 60 * 24
		// 这里将不足七天的开头几天也作为第一周，而不是作为上年最后一周
		var _w = (cDay + _co.getDay()) / 7;//补上今年第一周不足七天的时间，求几周
		var _wInt = parseInt(_w);
		return((_w > _wInt) ? (_wInt + 1) : _wInt);//返回当前是今年第几周
	},
	/**
	 * 格式化日期@param d时间对象，f格式化样式
	 */
	$fnFormat:function(d, f)
	{
		var t =
		{
			"y+" : d.getFullYear(),
			"M+" : d.getMonth()+1,
			"d+" : d.getDate(),
			"H+" : d.getHours(),
			"m+" : d.getMinutes(),
			"s+" : d.getSeconds(),
			"S+" : d.getMilliseconds(),
			"W+":this.$fnGetWeek(d),
			"w+":this.$lang.w[this.$c.lang][d.getDay()]
		};
		var _t;
		for(var k in t)
		{
			while(new RegExp("(" + k + ")").test(f))
			{
				_t = (RegExp.$1.length == 1) ? t[k] : ("0000000000".substring(0, RegExp.$1.length) + t[k]).substr(("" + t[k]).length);
				f = f.replace(RegExp.$1, _t + "");
			}
		}
		return f;
	},
	//初始化容器
	$fnInit:function()
	{
		var cid = this.$k.div;
		if($jskey.$(cid) == null)
		{
			var s = '<div id="' + this.$k.panel + '" style="position:absolute;display:none;z-index:9999;" class="CalendarPanel"></div>';
			if(document.all)//ie中将层浮于顶层
			{
				s += '<iframe style="position:absolute;z-index:8888;width:expression(this.previousSibling.offsetWidth);';
				s += 'height:expression(this.previousSibling.offsetHeight);';
				s += 'left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);';
				s += 'display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>';
			}
			var o = document.createElement("div");
			o.innerHTML = s;
			o.id = cid;
			o.style.display = "none";
			document.body.appendChild(o);//确保日历容器节点在 body 最后，否则 FireFox 中不能出现在最上方

			this.$panel = $jskey.$(this.$k.panel);
			this.$div = $jskey.$(cid);
		}
	},
	//返回所选日期
	$fnReturn:function(dt)
	{
		if(this.$input != null)
		{
			this.$input.value = dt;
		}
		this.$hide();
		if(this.$input.onchange == null)
		{
			if(typeof(this.$input.changeEvent) == 'function')
			{
				this.$input.changeEvent();// 调用转化后的自定义函数
			}
			return;
		}
		//将onchange转成其它函数，以免触发验证事件ValidatorOnChange(DotNet提供的的校验控件)
		var ev = this.$input.onchange.toString();//找出函数的字串
		ev = ev.substring(((ev.indexOf("ValidatorOnChange();") > 0) ? ev.indexOf("ValidatorOnChange();") + 20 : ev.indexOf("{") + 1), ev.lastIndexOf("}"));//去除验证函数 ValidatorOnChange();
		var fun = new Function(ev);//重新定义函数
		this.$input.changeEvent = fun;
		this.$input.changeEvent();//触发自定义 changeEvent 函数
	},
	$fnDraw:function()
	{
		var e = this;
		var a = [];
		a.push('<div style="margin: 0px; ">');
		//start
		//------------------------------放置上一月、年、月、下一月按钮------------------------------
		a.push('<table width="100%" cellpadding="0" cellspacing="1" class="CalendarTop">');
		a.push('<tr class="title">');
		a.push('<th align="left" class="prevMonth"><input style="');
		if(e.$c.level > e.$p.M)
		{
			a.push('display:none;');
		}
		//精确到年时隐藏“月”
		a.push('" id="' + this.$k.prevM + '" type="button" value="&lt;" /></th>');
		a.push('<th align="center" width="98%" nowrap="nowrap" class="YearMonth">');
		a.push('<select id="' + this.$k.y + '" class="Year"></select>');
		a.push('<select id="' + this.$k.M + '" class="Month" style="');
		if(e.$c.level > e.$p.M)
		{
			a.push('display:none;');
		}
		//精确到年时隐藏“月”
		a.push('"></select></th>');
		a.push('<th align="right" class="nextMonth"><input style="');
		if(e.$c.level > e.$p.M)
		{
			a.push('display:none;');
		}
		//精确到年时隐藏“月”
		a.push('" id="' + this.$k.nextM + '" type="button" value="&gt;" /></th>');
		a.push('</tr>');
		a.push('</table>');
		//------------------------------放置日期------------------------------
		a.push('<table id="' + this.$k.table + '" width="100%" class="CalendarDate" style="');
		if(e.$c.level >= e.$p.M)
		{
			a.push('display:none;');
		}
		//精确到年、月时隐藏“天”
		a.push('" cellpadding="0" cellspacing="1">');
		a.push('<tr class="title">');
		for( var i = 0;i < 7;i++)
		{
			a.push('<th>' + e.$lang.w[e.$c.lang][i] + '</th>');
		}
		a.push('</tr>');
		for( var i = 0;i < 6;i++)
		{
			a.push('<tr align="center" class="date" style="display:;">');
			for( var j = 0;j < 7;j++)
			{
				if(j == 0)
				{
					a.push('<td class="sun" tdname="tdSun"></td>');
				}
				else if(j == 6)
				{
					a.push('<td class="sat" tdname="tdSat"></td>');
				}
				else
				{
					a.push('<td class="day" tdname="tdDay"></td>');
				}
			}
			a.push('</tr>');
		}
		a.push('</table>');
		//------------------------------放置时间的行------------------------------
		a.push('<table width="100%" class="CalendarTime" style="');
		if(e.$c.level > e.$p.H)
		{
			a.push('display:none;');
		}
		//精确到时日隐藏“时间”
		a.push('" cellpadding="0" cellspacing="1">');
		a.push('<tr><td align="center" colspan="7">');
		a.push('<select id="' + this.$k.H + '" class="Hour"></select>' + e.$lang.t[e.$c.lang][0]);
		a.push('<span style="');
		if(e.$c.level > e.$p.m)
		{
			a.push('display:none;');
		}
		//精确到小时时隐藏“分”
		a.push('"><select id="' + this.$k.m + '" class="Minute"></select>' + e.$lang.t[e.$c.lang][1] + '</span>');
		a.push('<span style="');
		if(e.$c.level > e.$p.s)
		{
			a.push('display:none;');
		}
		//精确到小时、分时隐藏“秒”
		a.push('"><select id="' + this.$k.s + '" class="Second"></select>' + e.$lang.t[e.$c.lang][2] + '</span>');
		a.push('</td></tr>');
		a.push('</table>');
		a.push('<div align="center" class="CalendarButtonDiv">');
		a.push('<input id="' + this.$k.bclear + '" type="button" value="' + e.$lang.b[e.$c.lang][2] + '"/> ');
		a.push('<input id="' + this.$k.btoday + '" type="button" value="');
		a.push((e.$c.level == e.$p.d) ? e.$lang.b[e.$c.lang][0] : e.$lang.b[e.$c.lang][1]);
		a.push('" /> ');
		a.push('<input id="' + this.$k.bclose + '" type="button" value="' + e.$lang.b[e.$c.lang][3] + '" />');
		a.push('</div>');
		a.push('</div>');
		//end
		e.$panel.innerHTML = a.join("");
		//上一月按钮事件注册
		var o = $jskey.$(this.$k.prevM);
			o.onclick = function(){e.goPrevMonth(e);};
			o.onblur = function(){e.$fnBlur();};
		//下一月按钮事件注册
		o = $jskey.$(this.$k.nextM);
			o.onclick = function(){e.goNextMonth(e);};
			o.onblur = function(){e.$fnBlur();};
		//清空按钮事件注册
		o = $jskey.$(this.$k.bclear);
			o.onclick = function(){e.$fnReturn("");};//, null
		//关闭按钮事件注册
		o = $jskey.$(this.$k.bclose);
			o.onclick = function(){e.$hide();};
		//年份下拉框事件注册
		o = $jskey.$(this.$k.y);
			o.onclick = function(){e.$s.y = parseInt(this.options[this.selectedIndex].value);e.$bindData();};
			o.onblur = function(){e.$fnBlur();};
		//月份下拉框事件注册
		o = $jskey.$(this.$k.M);
			o.onclick = function(){e.$s.M = parseInt(this.options[this.selectedIndex].value);e.$bindData();};
			o.onblur = function(){e.$fnBlur();};
		//小时下拉框事件注册
		o = $jskey.$(this.$k.H);
			o.onclick = function(){e.$s.H = parseInt(this.options[this.selectedIndex].value);};
			o.onblur = function(){e.$fnBlur();};
		//分钟下拉框事件注册
		o = $jskey.$(this.$k.m);
			o.onclick = function(){e.$s.m = parseInt(this.options[this.selectedIndex].value);};
			o.onblur = function(){e.$fnBlur();};
		//秒数下拉框事件注册
		o = $jskey.$(this.$k.s);
			o.onclick = function(){e.$s.s = parseInt(this.options[this.selectedIndex].value);};
			o.onblur = function(){e.$fnBlur();};
		//今天、确定按钮事件注册
		o = $jskey.$(this.$k.btoday);
			o.onclick = function()
			{
				var _t = (e.$c.level != e.$p.d)?(e.$fnDate()):(new Date());
				e.$fnReturn(e.$fnFormat(_t, e.$c.format));//, _t
			};
	},
	//下拉框绑定数据
	$bindSelect:function()
	{
		//年份
		var o, _t, i;
		o = $jskey.$(this.$k.y);
		o.length = 0;
		for(i = this.$c.begin;i <= this.$c.end;i++)
		{
			o.options[o.length] = new Option(i + this.$lang.y[this.$c.lang], i);
		}
		
		//月份
		o = $jskey.$(this.$k.M);
		o.length = 0;
		for(i = 0;i < 12;i++)
		{
			o.options[o.length] = new Option(this.$lang.M[this.$c.lang][i], i);
		}
		
		//小时
		o = $jskey.$(this.$k.H);
		if(o.length == 0)
		{
			for(i = 0;i < 24;i++)
			{
				_t = ("00" + i + "").substr(("" + i).length);
				o.options[o.length] = new Option(_t, _t);
			}
		}
		
		//分钟
		o = $jskey.$(this.$k.m);
		if(o.length == 0)
		{
			for(i = 0;i < 60;i++)
			{
				_t = ("00" + i + "").substr(("" + i).length);
				o.options[o.length] = new Option(_t, _t);
			}
		}
		
		//秒钟
		o = $jskey.$(this.$k.s);
		if(o.length == 0)
		{
			for(i = 0;i < 60;i++)
			{
				_t = ("00" + i + "").substr(("" + i).length);
				o.options[o.length] = new Option(_t, _t);
			}
		}
	},
	//向前一月
	goPrevMonth:function(e)
	{
		if(e.$s.y == e.$c.begin && e.$s.M == 0)// 无法再向前了
		{
			return;
		}
		e.$s.M--;
		if(e.$s.M == -1)
		{
			e.$s.y--;
			e.$s.M = 11;
		}
		e.$bindData();
	},
	//向后一月
	goNextMonth:function(e)
	{
		if(e.$s.y == e.$c.end && e.$s.M == 11)// 无法再向后了
		{
			return;
		}
		e.$s.M++;
		if(e.$s.M == 12)
		{
			e.$s.y++;
			e.$s.M = 0;
		}
		e.$bindData();
	},
	//根据年、月得到月视图数据(数组形式)
	$fnGetViewArray:function(y, m)
	{
		var a = [];
		var firstDay = new Date(y, m, 1).getDay();
		var days = new Date(y, m + 1, 0).getDate();// 从 Date对象返回一个月中的某一天 (1~31)。0即上个月最后一天
		for(var i = 0;i < 42;i++)// 匹配生成的html格式数
		{
			a[i] = "&nbsp;";
		}
		for(var i = 0;i < days;i++)
		{
			a[i + firstDay] = i + 1;
		}
		// 顺便处理一下当前日
		if(this.$s.d > days)
		{
			this.$s.d = days;
		}
		return a;
	},
	//绑定数据到月视图
	$bindData:function()
	{
		var e = this;
		
		//改变SELECT选中状态，当初始值为空时，若有效年份并不包括今天时将有可能超出索引位置
		$jskey.$(e.$k.y)[(e.$s.y - e.$c.begin < 0 || e.$s.y - e.$c.begin >= $jskey.$(e.$k.y).length)?0:(e.$s.y - e.$c.begin)].selected = true;
		if(e.$c.level >= e.$p.y)
		{
			return;
		}
		// 不管有没有到这个级别，直接初始化
		$jskey.$(e.$k.M)[e.$s.M].selected = true;
		$jskey.$(e.$k.H)[e.$s.H].selected = true;
		$jskey.$(e.$k.m)[e.$s.m].selected = true;
		$jskey.$(e.$k.s)[e.$s.s].selected = true;
		
		var dateArray = e.$fnGetViewArray(parseInt(e.$s.y), parseInt(e.$s.M));
		var tds = $jskey.$(this.$k.table).getElementsByTagName("td");// 去掉了th的标题头了
		for(var i = 0;i < tds.length;i++)
		{
			tds[i].onmouseover = function(){return;};
			tds[i].onmouseout = function(){return;};
			// if(i > dateArray.length - 1){break};格子数一样多
			tds[i].innerHTML = dateArray[i];
			//还原样式
			if(tds[i].getAttribute("tdname") == "tdSun")
			{
				tds[i].className = "sun";
			}
			else if(tds[i].getAttribute("tdname") == "tdSat")
			{
				tds[i].className = "sat";
			}
			else
			{
				tds[i].className = "day";
			}
			if(dateArray[i] == "&nbsp;")
			{
				tds[i].onclick = function(){return;};
			}
			else
			{
				tds[i].isToday = false;//初始化
				//是今天的单元格
				if(e.$p.cy == e.$s.y && e.$p.cM == e.$s.M && e.$p.cd == dateArray[i])
				{
					tds[i].className = "today";
					tds[i].isToday = true;
				}
				//是已被选中的单元格，只要天数对上了即可
				if(e.$s.d == dateArray[i])
				{
					tds[i].className = "selDay";
					e.$selTD = tds[i];//记录已选中的日子
				}
				//显示级别为日时，当选择日期时，点击格子即返回值
				if(e.$c.level == e.$p.d)
				{
					tds[i].onclick = function()
					{
						e.$s.d = this.innerHTML;// 设置为新的日
						e.$fnReturn(e.$fnFormat(e.$fnDate(), e.$c.format));//, e.$fnDate()
					};
				}
				else
				{
					tds[i].onclick = function()
					{
						if(e.$selTD != null)
						{
							var t = "day";
							//清除已选中的背景色
							if(e.$selTD.isToday)
							{
								t = "today";
							}
							else
							{
								var s = e.$selTD.getAttribute("tdname");
								if(s == "tdSun")
								{
									t = "sun";
								}
								else if(s == "tdSat")
								{
									t = "sat";
								}
							}
							e.$selTD.className = t;
						}
						this.className = "selDay";
						e.$s.d = this.innerHTML;// 设置为新的日
						e.$selTD = this;//记录已选中的日子
					};
				}
				tds[i].onmouseover = function()
				{
					this.className = "dayOver";
				};
				tds[i].onmouseout = function()
				{
					var t = "day";
					if(e.$selTD != this)
					{
						if(this.isToday)
						{
							t = "today";
						}
						else
						{
							var s = this.getAttribute("tdname");
							if(s == "tdSun")
							{
								t = "sun";
							}
							else if(s == "tdSat")
							{
								t = "sat";
							}
						}
					}
					else
					{
						t = "selDay";
					}
					this.className = t;
				};
				tds[i].onblur = function()
				{
					e.$fnBlur();
				};
			}
		}
	},
	//取得HTML控件绝对位置
	$fnPoint:function(e)
	{
		var x = e.offsetLeft;
		var y = e.offsetTop;
		while(e = e.offsetParent)
		{
			x += e.offsetLeft;
			y += e.offsetTop;
		}
		var sy = 0;
		try{sy = event.clientY;}catch(ee){sy = 0;}//仅firefox不支持
		var a = {"sx":x, "sy":sy, "x":x, "y":y, "w":$jskey.$(this.$k.panel).offsetWidth, "h":$jskey.$(this.$k.panel).offsetHeight};
		return a;
	},
	$fnSkin:function(p)
	{
		var hasSkin = false;
		if(p.skin == null)p.skin = "default";
		//初始化加载所有皮肤对象到数组中，避免每次都进行循环
		if(this.$skin.length == 0)
		{
			var linkList = $jskey.$byTagName("link");
			for(var i = 0;i < linkList.length;i++)
			{
				if(linkList[i].getAttribute("skinType") == "JskeyCalendar")
				{
					this.$skin[this.$skin.length] = linkList[i];
				}
			}
		}
		for(var i = 0;i < this.$skin.length;i++)
		{
			if(this.$skin[i].getAttribute("skin") == p.skin)
			{
				//加载过该皮肤
				this.$skin[i].disabled = false;
				hasSkin = true;//标记已匹配一种皮肤
			}
			else
			{
				this.$skin[i].disabled = true;
			}
		}
		if(!hasSkin)
		{
			//该皮肤未在$skin中找到，则显示默认皮肤
			for(var i = 0;i < this.$skin.length;i++)
			{
				if(this.$skin[i].getAttribute("skin") == "default")
				{
					//加载过该皮肤
					this.$skin[i].disabled = false;
					break;
				}
			}
		}
	},
	//设置日历显示内容
	$fnGetLevel:function(s)//args.show
	{
		var t = this.$p;
		if(s.indexOf('ss') > -1){return t.s;}//秒
		else if(s.indexOf('mm') > -1){return t.m;}//分
		else if(s.indexOf('HH') > -1){return t.H;}//时
		else if(s.indexOf('dd') > -1){return t.d;}//日
		else if(s.indexOf('MM') > -1){return t.M;}//月
		else if(s.indexOf('yyyy') > -1){return t.y;}//年
		return t.d;//复位
	},
	//更新值并判断是否需要初始化
	$fnIsChange:function(p)
	{
		var b = false,t = this.$c;// b为判断设置是否改变
		//判断是否有值出现变动
		if(
			t.begin != p.beginYear || 
			t.end != p.endYear || 
			t.lang != p.lang || 
			t.level != p.level || 
			t.format != p.format
		)
		{
			b = true;
		}
		this.$c.left = p.left;
		this.$c.top = p.top;
		if(b)
		{
			//更新值
			t.begin = p.beginYear;
			t.end = p.endYear;
			t.lang = p.lang;
			t.format = p.format;
			t.level = p.level;//设置日历显示内容
		}
		return b;
	},
	//显示日历
	showCalendar:function(obj, p)
	{
		var t;// 临时变量
		this.$fnInit();//初始化布局div
		if(obj == null)
		{
			throw new Error("arguments[0] is necessary");
		}
		//补充未定义的args
		if(p.beginYear == null){p.beginYear = this.$p.begin;}
		if(p.endYear == null){p.endYear = this.$p.end;}
		if(p.lang == null){p.lang = 0;}
		if(p.left == null){p.left = 0;}
		if(p.top == null){p.top = 0;}
		if(p.format == null){p.format = "yyyy-MM-dd";}
		//p.format = p.format + "";
		p.level = this.$fnGetLevel(p.sample || p.show || "yyyy-MM-dd");// 转化show为level，兼容旧版属性sample
		//初始化一个时间，用于记录选择日历的时间
		t = new Date();
		try
		{
			var f = p.format, v = obj.value;
			if(v.length >= f.length)
			{
				var y = 1000, M = 1, d = 1, H = 1, m = 1, s = 1, _iy = f.indexOf('yyyy'), _iM = f.indexOf('MM'), _id = f.indexOf('dd'), _iH = f.indexOf('HH'), _im = f.indexOf('mm'), _is = f.indexOf('ss');
				if(_iy != -1){y = v.substring(_iy, _iy + 4);};//年
				if(!isNaN(y) && y > 1000)
				{
					if(_iM != -1)
					{
						M = v.substring(_iM, _iM + 2);
						if(isNaN(M)){M = t.getMonth() + 1;}
					}
					if(_id != -1)
					{
						d = v.substring(_id, _id + 2);
						if(isNaN(d)){d = t.getDate();}
					}
					if(_iH != -1)
					{
						H = v.substring(_iH, _iH + 2);//时
						if(isNaN(H)){H = t.getHours();}
					}
					if(_im != -1)
					{
						m = v.substring(_im, _im + 2);//分
						if(isNaN(m)){m = t.getMinutes();}
					}
					if(_is != -1)
					{
						s = v.substring(_is, _is + 2);//秒
						if(isNaN(s)){s = t.getSeconds();}
					}
					eval("t = new Date('" + y + "', '" + (M - 1) + "','" + d + "','" + H + "','" + m + "','" + s + "')");
					// 如果匹配到默认值时，这里需要设置$v的默认值
					//this.$v.y = y;
					//this.$v.M = M;
					//this.$v.d = d;
				}
			}
		}
		catch(e)
		{
			t = new Date();
		}
		this.$fnReset(t);//初始化$s
		this.$fnSkin(p);//加载皮肤CSS，注释掉即使用默认皮肤
		var isChange = this.$fnIsChange(p);
		this.$input = obj;
		if(this.$panel.innerHTML == "" || isChange)
		{
			//构造表格，若请示的样式改变，则重新初始化
			this.$fnDraw();
			this.$bindSelect();
		}
		this.$bindData();
		this.$panel.style.display = "";
		this.$div.style.display = "";
		
		t = this.$fnPoint(obj);//取得元素坐标
		this.$panel.style.left = (t.x + this.$c.left) + "px";
		this.$panel.style.top = ((this.$c.top == 0) ? ((t.sy > 340) ? (t.y - t.h) : (t.y + obj.offsetHeight)) : (t.y + obj.offsetHeight + this.$c.top)) + "px";
		var e = this;
		if(!e.$input.isTransEvent)
		{
			e.$input.isTransEvent = true;
			//保存主文本框的 onblur，使其原本的事件不被覆盖
			if(e.$input.onblur != null)
			{
				e.$input.blurEvent = e.$input.onblur;
			}
			e.$input.onblur = function()
			{
				e.$fnBlur();
				if(typeof(this.blurEvent) == 'function')
				{
					this.blurEvent();
				}
			};
		}
		e.$div.onmouseover = function(){e.$focus = true;};
		e.$div.onmouseout = function(){e.$focus = false;};
	},
	//隐藏日历
	$hide:function()
	{
		this.$panel.style.display = "none";
		this.$div.style.display = "none";
		this.$focus = false;
	},
	//焦点转移时隐藏日历
	$fnBlur:function()
	{
		if(!(this.$focus)){this.$hide();}
	},
	//画出日历
	show:function(a0, a1)
	{
		//优先调用第二个参数中的对象
		if(a1.object != null)
		{
			this.showCalendar(a1.object, a1);
			return true;
		}
		if(a1.id != null)
		{
			a1.id = a1.id + "";
			var obj = $jskey.$(a1.id);
			if(obj != null)
			{
				this.showCalendar(obj, a1);
				return true;
			}
		}
		if(typeof(a0) == 'object')
		{
			this.showCalendar(a0, a1);
			return true;
		}
		else if(typeof(a0) == 'string')
		{
			var obj = $jskey.$(a0);
			if(obj == null){return false;}
			this.showCalendar(obj, a1);
			return true;
		}
		return false;
	}
};
$jskey.calendar = new $jskey.Calendar();


