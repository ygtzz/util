//判断字符串是否以某个字符串开始
function startWith(target, str){     
    var reg = new RegExp("^"+str);     
    return reg.test(target);        
}

//判断字符串是否以某个字符串结尾
function endWith(target, str){     
    var reg = new RegExp(str+"$");     
    return reg.test(target);        
}

/*比较两个array，是否相等*/
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

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

//判断元素是否在视口内
function isElementInViewport (el, offset) {
    var h = offset || 20,
        box = el.getBoundingClientRect(),
        top = (box.top >= 0),
        left = (box.left >= 0),
        bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + h),
        right = (box.right <= (window.innerWidth || document.documentElement.clientWidth) + h);
    return (top && left && bottom && right);
}

/**
 * 修改url的参数值，没有该值，就添加
 * @param {String} url 要修改的url，可以是完整的url，也可以是?后面的参数部分 
 * @param {Object} obj 要修改的键值对
 */
function updateUrlParams(url, obj) {
    if (url) {
        for (var p in obj) {
            var name = p,
                value = encodeURIComponent(obj[p]),
                reg = new RegExp("([?&])" + name + "=(?:[^=&?]+)(&|$)"),
                kv = name + '=' + value;
            var match = url.match(reg);
            if (match) {
                url = url.replace(reg, '$1' + kv + '$2');
            } else {
                if (url.indexOf('?') > -1) {
                    url = url + '&' + kv;
                } else {
                    url = url + '?' + kv;
                }
            }
        }
    }
    return url;
}
/**
 * 修复location.replace兼容问题
 * @param {String} url 
 */
function locationReplace(url){
    if(history.replaceState){
        history.replaceState(null, document.title, url);
        history.go(0);
    }
    else{
        location.replace(url);
    }
}
/**
 * 目标数据超出范围就取对应的下限或上限
 * @param {Number} mid 目标数据 
 * @param {Number} min 数据下限
 * @param {Number} max 数据上限
 */
function mid(mid,min,max){
    if(typeof min === undefined || min == null){
        min = Number.NEGATIVE_INFINITY;
    }
    if(typeof max == undefined || max == null){
        max = Number.POSITIVE_INFINITY;
    }
    return Math.min(Math.max(min,mid),max);
}
/**
 * 
 * @param {Date} date1  
 * @param {Date} date2 
 */
function fCompareDate(date1,date2){
    if(!date1 || !date2){
        throw new Error('invalid date');
    }
    date1 = new Date(date1);
    date2 = new Date(date2);
    var year1 = date1.getFullYear(),
        month1 = parseInt(date1.getMonth()) + 1,
        dt1 = date1.getDate(),
        year2 = date2.getFullYear(),
        month2 = parseInt(date2.getMonth()) + 1,
        dt2 = date2.getDate();
    var d1 = +new Date(year1 + '/' + month1 + '/' + dt1 + ' 00:00:00'),
        d2 = +new Date(year2 + '/' + month2 + '/' + dt2 + ' 00:00:00');
    if (d1 > d2) {
        return 1;
    } else if (d1 < d2) {
        return -1;
    } else {
        return 0;
    }
}
/**
 * 
 * @param {目标的Id} tplId 
 * @param {传递给模板的数据} data 
 * @param {要显示内容的容器的选择器} target 
 */
function fRender(tplId,data,target){
    var html = template(tplId,data);
    $(target).html(html);
}






