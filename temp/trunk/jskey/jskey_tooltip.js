var $jskey = $jskey || {};
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

$jskey.$link = function(path)
{
    var k = document.createElement("link");
    k.rel = "stylesheet";
    k.type = "text/css";
    k.href = path;
    document.getElementsByTagName("head")[0].appendChild(k);
    k = null;
};


if(typeof (jQuery)=="function"){
$jskey.$link($jskey.$path+"themes/tooltip/jskey_tooltip.css");
(function($) {
    function fix($e) {
        if (typeof($e.attr('msg')) != 'string') {
            $e.attr('msg', $e.attr('title') || '').removeAttr('title');
        }
    }
    $jskey.tooltip = function(element, options) {
        this.$element = $(element);
        this.options = options;
        fix(this.$element);
    };
    $jskey.tooltip.prototype = {
        show: function() {
            var t = this.getTitle();
            if (t) {
                var $tip = this.tip();
                $tip.find('.jskey-tooltip-inner')[this.options.html ? 'html' : 'text'](t);
                $tip[0].className = 'jskey-tooltip';
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(this.$element.parent());
                
                var p = $.extend({}, this.$element.position(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                
                var ww = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
                var g = this.options.show;
                var tp;
                switch (g.charAt(0)) {
                    case 'n':
                        tp = {top: p.top + p.height + this.options.offset, left: p.left + p.width / 2 - ww / 2};
                        break;
                    case 's':
                        tp = {top: p.top - actualHeight - this.options.offset, left: p.left + p.width / 2 - ww / 2};
                        break;
                    case 'e':
                        tp = {top: p.top + p.height / 2 - actualHeight / 2, left: p.left - ww - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: p.top + p.height / 2 - actualHeight / 2, left: p.left + p.width + this.options.offset};
                        break;
                }
                
                if (g.length == 2) {
                    if (g.charAt(1) == 'w') {
                        tp.left = p.left + p.width / 2 - 15;
                    } else {
                        tp.left = p.left + p.width / 2 - ww + 15;
                    }
                }
                
                $tip.css(tp).addClass('jskey-tooltip-' + g);
                $tip.css({visibility: 'visible', opacity: this.options.opacity});
            }
        },
        hide: function() {
            this.tip().remove();
        },
        getTitle: function() {
            var t, $e = this.$element, o = this.options;
            var t, o = this.options;
            if (typeof o.title == 'string') {
                t = $e.attr(o.title == 'title' ? 'msg' : o.title);
            } else if (typeof o.title == 'function') {
                t = o.title.call($e[0]);
            }
            t = ('' + t).replace(/(^\s*|\s*$)/, "");
            return t || o.text;
        },
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="jskey-tooltip"></div>').html('<div class="jskey-tooltip-arrow"></div><div class="jskey-tooltip-inner"/></div>');
            }
            return this.$tip;
        },
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        }
    };
    $.fn.tipx = function(options) {
        if (options === true) {
            return this.data('tipx');
        } else if (typeof options == 'string') {
            return this.data('tipx')[options]();
        }
        options = $.extend({}, $.fn.tipx.defaults, options);
        if(options.show == ""){options.show = $.fn.tipx.autoWE(this);}
        function get(ele) {
            var tipx = $.data(ele, 'tipx');
            if (!tipx) {
                tipx = new $jskey.tooltip(ele, $.fn.tipx.init(ele, options));
                $.data(ele, 'tipx', tipx);
            }
            return tipx;
        }
        function enter() {
            var tipx = get(this);
            tipx.show();
        }
        function leave() {
            var tipx = get(this);
            tipx.hide();
        }
        if (!options.live) this.each(function() { get(this); });
        this['bind']('mouseenter', enter)['bind']('mouseleave', leave);
        return this;
    };
    $.fn.tipx.defaults = {
        text: '',
        show: '',
        html: false,
        offset: 0,
        opacity: 1,
        title: 'title'
    };
    $.fn.tipx.init = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    $.fn.tipx.autoWE = function(ele) {
        return $(ele).position().left > ($(document).scrollLeft() + $(window).width()*3/4) ? 'e' : 'w';
    };
})(jQuery);
}


