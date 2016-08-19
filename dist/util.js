;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Util = factory();
  }
}(this, function() {
var oUtil = {};

oUtil.String = {
    fStartWith: function(sSrc, str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    },

    fEndWith: function(sSrc, str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    },
    fTtrimStart: function(sSrc, trimStr) {
        if (!trimStr) {
            return this;
        }
        var temp = this;
        while (true) {
            if (temp.substr(0, trimStr.length) != trimStr) {
                break;
            }
            temp = temp.substr(trimStr.length);
        }
        return temp;
    },
    fTrimEnd: function(sSrc, trimStr) {
        if (!trimStr) {
            return this;
        }
        var temp = this;
        while (true) {
            if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
                break;
            }
            temp = temp.substr(0, temp.length - trimStr.length);
        }
        return temp;
    },
    fTrim: function(sSrc, trimStr) {
        var temp = trimStr;
        if (!trimStr) { temp = " "; }
        return this.trimStart(temp).trimEnd(temp);
    },
    /*
     * var a = "I Love {0}, and You Love {1},Where are {0}! {4}";
     * String.format(a, "You","Me");
     * a.format("You","Me");
     */
    format: function(sSrc) {
        var args = arguments;
        return sSrc.replace(/\{(\d+)\}/g,
            function(m, i) {
                return args[i];
            });
    },
    //过滤html标签，空白，空行
    fFilterHtml: function(str) {
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
        str = str.replace(/&+nbsp;/ig, ''); //去掉&+nbsp; 
        str = str.replace(/^\s+/g, ''); //去掉空格，换行符，制表符
        return str;
    },
    /*  
     * formatMoney(s,type)  
     * 功能：金额按千位逗号分割  
     * 参数：s，需要格式化的金额数值.  
     * 参数：type,判断格式化后的金额是否需要小数位.  
     * 返回：返回格式化后的数值字符串.  
     */
    formatMoney: function(s, type) {
        if (/[^0-9\.]/.test(s)) return "0";
        if (s == null || s == "") return "0";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)) {
            s = s.replace(re, "$1,$2");
        }
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    }
}

oUtil.Date = {
    /*
     * 对Date的扩展，将 Date 转化为指定格式的String 
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
     * 例子： 
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
     * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     * 调用方法：
     * var time1 = new Date().format("yyyy-MM-dd HH:mm:ss"); 
     * var time2 = new Date().format("yyyy-MM-dd");
     */
    format: function(sSrc, fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}

oUtil.g = {
    //get all query string
    fGetQueryStrings: function() {
        var params = document.location.search,
            reg = /(?:^\?|&)(.*?)=(.*?)(?=&|$)/g,
            temp, args = {};
        while ((temp = reg.exec(params)) != null) {
            args[temp[1]] = decodeURIComponent(temp[2]);
        }
        return args;
    },
    //get a query string
    fGetQueryString: function(key) {
        return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
    }
}
return oUtil;
}));