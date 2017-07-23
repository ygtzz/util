
/*
 * var a = "I Love {0}, and You Love {1},Where are {0}! {4}";
 * String.format(a, "You","Me");
 * a.format("You","Me");
 */
function formatStr(sSrc) {
    var args = arguments;
    return sSrc.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}
/*  
 * formatMoney(s,type)  
 * 功能：金额按千位逗号分割  
 * 参数：s，需要格式化的金额数值.  
 * 参数：type,判断格式化后的金额是否需要小数位.  
 * 返回：返回格式化后的数值字符串.  
 */
function formatMoney(s, type) {
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
function formatDate(oDate, fmt) {
    var o = {
        "M+": oDate.getMonth() + 1, //月份 
        "d+": oDate.getDate(), //日 
        "h+": oDate.getHours(), //小时 
        "m+": oDate.getMinutes(), //分 
        "s+": oDate.getSeconds(), //秒 
        "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度 
        "S": oDate.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//过滤html标签，空白，空行
function filterHtml(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/&+nbsp;/ig, ''); //去掉&+nbsp; 
    str = str.replace(/^\s+/g, ''); //去掉空格，换行符，制表符
    return str;
}
//get all query string
function queryStringAll() {
    var reg = /(?:^|&)([^&]+)=([^&]+)(?=&|$)/g,
        args = {},
        qs = location.search || location.hash;
    qs = qs.slice(qs.indexOf('?') + 1);
    while (result = reg.exec(qs)) {
        args[result[1]] = result[2];
    }
    return args;
}
//get a query string
function queryString(key) {
    var reg = new RegExp('(?:^|&)' + key + '=([^&]+)(?=&|$)'),
        qs = location.search || location.hash;
    qs = qs.slice(qs.indexOf('?') + 1);
    return (result = qs.match(reg)) == null ? null : result[1];
}

module.exports = {
    formatStr:formatStr,
    formatMoney:formatMoney,
    formatDate:formatDate,
    filterHtml:filterHtml,
    queryString:queryString,
    queryStringAll:queryStringAll
}







