//构造函数
var ValidatorMethodHelper = function(){};

ValidatorMethodHelper.prototype = {
	//判断字符串的强度，返回值为0-3("0-密码过短。""1-密码强度差。""2-密码强度良好。""3-密码强度高。")
	passwordStrong:function(pwd) {
		var reValue = {"strong":0,"msg":"密码为空"};
		var ls = 0;
		if(pwd.length <= 0) {
		}
		else if(pwd.length > 0 && pwd.length < 6) {
			ls = 1;
		}
		else {
			ls = 1;
			if(pwd.match(/[a-z]/ig)) {
				ls++;
			}
			if(pwd.match(/[0-9]/ig)) {
				ls++;
			}
			if(pwd.match(/(.[^a-z0-9])/ig)) {
				ls++;
			}
		}
		switch(ls) {
			case 1:
				reValue.strong = 1;
				reValue.msg = "密码过短";
				return reValue;
				break;
			case 2:
				reValue.strong = 2;
				reValue.msg = "密码强度(复杂度)差";
				return reValue;
				break;
			case 3:
				reValue.strong = 3;
				reValue.msg = "密码强度(复杂度)良好";
				return reValue;
				break;
			case 4:
				reValue.strong = 4;
				reValue.msg = "密码强度(复杂度)高";
				return reValue;
				break;
			default:
				return reValue;
		}
	},
	//身份证号码验证,传入需要验证的字符串
	validateIDCard:function(IDCardNum) {
		var reValue = {"effect":false,"msg":"","city":"","birthday":"","sex":""};
		var _City = {
			"11":"北京","12":"天津","13":"河北","14":"山西","15":"内蒙古",
			"21":"辽宁","22":"吉林","23":"黑龙江",
			"31":"上海","32":"江苏","33":"浙江","34":"安徽","35":"福建","36":"江西","37":"山东",
			"41":"河南","42":"湖北","43":"湖南","44":"广东","45":"广西","46":"海南",
			"50":"重庆","51":"四川","52":"贵州","53":"云南","54":"西藏",
			"61":"陕西","62":"甘肃","63":"青海","64":"宁夏","65":"新疆",
			"71":"台湾",
			"81":"香港","82":"澳门",
			"91":"国外"
		};
		//如果布尔对象没有初始值或是0,-0,null,"",false,无定义的或NaN,对象就设置为假.不然它就是真(哪怕是字符串值为"false")
		var _iSum = 0;
		if(true) {
			//var _b_1 = /^\d{17}([a-zA-Z0-9\*]{1})?$/i.test(IDCardNum);//17位数字 + 1位字母或1位数字
			var _b_1 = /^\d{17}([xX0-9\*]{1})$/i.test(IDCardNum);//17位数字 + (x或X或1位数字)
			if(/^\d{17}([a-wyzA-WYZ0-9\*]{1})?$/i.test(IDCardNum)) {//17位数字 + 1位字母(除x/X)或1位数字
				if(!_b_1) {
					reValue.msg = "末位请使用字母X";
					return reValue;
				}
			}
			var _b_2 = /^\d{15}$/i.test(IDCardNum);//15位数字
			if(!(_b_1 || _b_2)) {//17位数字 + (x或1位数字),或者是15位数字
			//if(!/^\d{17}(\d|x)$/i.test(IDCardNum)) {
			//if(!/^\d{17}([a-zA-Z0-9\*]{1})?$/i.test(IDCardNum)) {//17位数字+x或者18位数字
				reValue.msg = "号码位数不对";
				return reValue;
			}
		}
		if(IDCardNum.length == 17) {
			IDCardNum += "a";
		}
		IDCardNum = IDCardNum.replace(/[a-z\*]{1}$/i, "a");//忽略大小写的以非数字结尾的替换为"a"，a为10(需要11进制)
		if(_City[parseInt(IDCardNum.substr(0, 2))] == null) {//前两位数必须是上面定义的city
			reValue.msg = "非法地区";
			return reValue;
		}
		
		// 15位身份证转换为18位
		if (IDCardNum.length == 15) {
			var _tmp_sBirthday = "19" + IDCardNum.substr(6, 2) + "-" + Number(IDCardNum.substr(8, 2)) + "-" + Number(IDCardNum.substr(10, 2));
			var _tmp_d = new Date(_tmp_sBirthday.replace(/-/g, "/"));
			//alert("");
			var _tmp_dd = _tmp_d.getFullYear() + "-" + (_tmp_d.getMonth() + 1) + "-" + _tmp_d.getDate();
			if(_tmp_sBirthday != _tmp_dd) {
				reValue.msg = "非法生日";
				return reValue;
			}
			IDCardNum = IDCardNum.substring(0, 6) + "19" + IDCardNum.substring(6, 15);
			//IDCardNum = IDCardNum + GetVerifyBit(IDCardNum);
			var _tmp_nTemp = 0;
			var _tmp_arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var _tmp_arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			for(var i = 0; i < 17; i++) {
				_tmp_nTemp += IDCardNum.substr(i, 1) * _tmp_arrInt[i];
			}
			IDCardNum += _tmp_arrCh[_tmp_nTemp % 11];
		}
		
		var _sBirthday = IDCardNum.substr(6, 4) + "-" + Number(IDCardNum.substr(10, 2)) + "-" + Number(IDCardNum.substr(12, 2));//取出生日日期部分
		var _d = new Date(_sBirthday.replace(/-/g,"/"));//将日期部分格式化为javascript识别的日期格式：yyyy/MM/dd HH:mm:ss
		if(_sBirthday != (_d.getFullYear() + "-" + (_d.getMonth() + 1) + "-" + _d.getDate())) {//判断生成的日期所转成的字符串是否与之前的字符串相同
			reValue.msg = "非法生日";
			return reValue;
		}
		for(var i = 17; i >= 0; i--) {
			//Math.pow(double a, double b)，求a的b次方
			//parseInt(numString, [radix])，numString为要转化的字符串，radix指转化的进制(2-36)
			//parseInt(IDCardNum.charAt(17 - i),11)，之所以写为11进制是因为有个"x"转成的"a"
			_iSum += (Math.pow(2, i) % 11) * parseInt(IDCardNum.charAt(17 - i), 11);
			// sss += "<br />" + (Math.pow(2,i) % 11) + "---" + parseInt(IDCardNum.charAt(17 - i),11) + "+++" + (Math.pow(2,i) % 11) * parseInt(IDCardNum.charAt(17 - i),11);
		}
		if(_iSum%11 != 1) {
			reValue.msg = "非法证号";
			return reValue;
		}
		
		reValue.effect = true;
		reValue.msg = "证号有效";
		reValue.city = "" + _City[parseInt(IDCardNum.substr(0,2))];
		reValue.birthday = "" + _sBirthday;
		reValue.sex = ((IDCardNum.substr(16, 1) % 2)?"男":"女");
		return reValue;
	}
};

var __ValidatorMethod__ = new ValidatorMethodHelper();//默认生成一个对象

var $jskey = {};
$jskey.$dateFormat = function(d, f)
{
	var t = {
		"y+" : d.getFullYear(),
		"M+" : d.getMonth()+1,
		"d+" : d.getDate(),
		"H+" : d.getHours(),
		"m+" : d.getMinutes(),
		"s+" : d.getSeconds(),
		"S+" : d.getMilliseconds()
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
};