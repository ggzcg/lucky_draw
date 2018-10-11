function turntableDraw(obj, jsn) {
    "use strict";
    this.draw = {};
    this.draw.obj = $(obj);
    this.draw.objClass = $(obj).attr("class");
    this.draw.newClass = "rotary" + "new" + parseInt(Math.random() * 1000);
    var _jiaodu = parseInt(360 / jsn.share);
    var _yuan = 360 * (jsn.weeks || 4)+22.5;
    var _str = "";
    var _speed = jsn.speed || "2s";
    var _velocityCurve = jsn.velocityCurve || "ease";
    var _this = this;
    for (var i = 1; i <= jsn.share; i++) {
        _str += "." + this.draw.newClass + i + "{";
        _str += "transform:rotate(" + ((i - 1) * _jiaodu + _yuan) + "deg);";
        _str += "-ms-transform:rotate(" + ((i - 1) * _jiaodu + _yuan) + "deg);";
        _str += "-moz-transform:rotate(" + ((i - 1) * _jiaodu + _yuan) + "deg);";
        _str += "-webkit-transform:rotate(" + ((i - 1) * _jiaodu + _yuan) + "deg);";
        _str += "-o-transform:rotate(" + ((i - 1) * _jiaodu + _yuan) + "deg);";
        _str += "transition: transform " + _speed + " " + _velocityCurve + ";";
        _str += "-moz-transition: -moz-transform " + _speed + " " + _velocityCurve + ";";
        _str += "-webkit-transition: -webkit-transform " + _speed + " " + _velocityCurve + ";";
        _str += "-o-transition: -o-transform " + _speed + " " + _velocityCurve + ";";
        _str += "}";
        _str += "." + this.draw.newClass + i + "stop{";
        _str += "transform:rotate(" + ((i - 1) * _jiaodu+22.5) + "deg);";
        _str += "-ms-transform:rotate(" + ((i - 1) * _jiaodu+22.5) + "deg);";
        _str += "-moz-transform:rotate(" + ((i - 1) * _jiaodu+22.5) + "deg);";
        _str += "-webkit-transform:rotate(" + ((i - 1) * _jiaodu+22.5) + "deg);";
        _str += "-o-transform:rotate(" + ((i - 1) * _jiaodu+22.5) + "deg);";
        _str += "}";
    };
    $(document.head).append("<style>" + _str + "</style>");
    _speed = _speed.replace(/s/, "") * 1000;
    this.draw.startTurningOk = false;
    this.draw.goto = function(ind) {
        if (_this.draw.startTurningOk) {
            return false
        };
        _this.draw.obj.attr("class", _this.draw.objClass + " " + _this.draw.newClass + ind);
        _this.draw.startTurningOk = true;
        setTimeout(function() {
            _this.draw.obj.attr("class", _this.draw.objClass + " " + _this.draw.newClass + ind + "stop");
            if (jsn.callback) {
                _this.draw.startTurningOk = false;
                jsn.callback(ind);
            };
        }, _speed + 10);
        console.log(_this.draw);
        return _this.draw;
    };
    return this.draw;
};

//share份额[数字没有默认],
//speed速度[单位s,最小0.1s],
//velocityCurve速度曲线[linear匀速，ease慢快慢，ease-in慢慢开始，ease-out慢慢结束，ease-in-out慢快慢等，用的是css3的速度曲线],可以不写，ease默认值；
//callback回调函数
//weeks几周[默认2周，可以不写]

//几份和回调函数这两个参数是必填

var giftArr = [{
    name: "现金券",
    imgSrc: "images/prize_03.png"
}, {
    name: "重庆小面",
    imgSrc: "images/prize_01.png"
}, {
    name: "麻辣鸭脖",
    imgSrc: "images/prize_01.png"
}, {
    name: "谢谢参与",
    imgSrc: "images/prize_01.png"
}, {
    name: "胖吴萝卜干",
    imgSrc: "images/prize_01.png"
}, {
    name: "现金券",
    imgSrc: "images/prize_03.png"
}, {
    name: "麻辣鸭脖",
    imgSrc: "images/prize_01.png"
}, {
    name: "现金券",
    imgSrc: "images/prize_01.png"
}];

function callbackA(ind) {
    console.log(1);
    $(".prize_txt span").text(giftArr[ind - 1].name);
    $(".lucky_wd .prize_logo").attr("src", giftArr[ind - 1].imgSrc);
    if (ind == 8) {
        $(".sorry_wd").fadeIn(300);
        $('.hidden_mask').fadeIn(250);
    } else {
        $(".lucky_wd").fadeIn(300);
        $('.hidden_mask').fadeIn(250);
    }
    isRotate = false;
};
var newdraw = new turntableDraw('.rotate > .rotate_img', {
    share: 8,
    speed: "8s",
    velocityCurve: "ease",
    weeks: 8,
    callback: function(num) {
        callbackA(num);
    },
});
var isRotate = false;
// 抽奖
$(".rotate-btn").click(function(event) {
     newdraw.goto(1);
     // console.log(s);
    // if (chance <= 0) {
    //     $(".error-mask").fadeIn(300).children("div").addClass("slide-box").find("h2").text("抱歉客官，您没有抽奖机会");
    //     return;
    // }
    // var random;
    // if (!isRotate) {
    //     $.ajax({
    //         type: 'post',
    //         url: apiUrl.takeGift,
    //         data: {
    //             code: 'langrensha',
    //             nickname: info.nickname,
    //             youId: info.youId,
    //             openId: info.openId
    //         },
    //         success: function(result) {
    //             if (typeof result == "string") {
    //                 result = JSON.parse(result);
    //             }
    //             if (result.item == undefined) {
    //                 random = 4;
    //             } else if (result.item == 0) {
    //                 var codeArr = [2, 6, 8]
    //                 random = codeArr[parseInt(Math.random() * 3)];
    //                 $('.see-gift').attr('href', 'https://weixin.youzhipai.cn/warehouse/weixin/notMenu/redirect?sid=12&tourl=/showAllTickets/12');
    //             } else if (result.item == 1) {
    //                 switch (result.data.code) {
    //                     case '1':
    //                         random = 1;
    //                         break;
    //                     case '2':
    //                         random = 3;
    //                         break;
    //                     case '3':
    //                         random = 5;
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //                 $('.see-gift').attr('href', 'https://weixin.youzhipai.cn/warehouse/weixin/notMenu/redirect?sid=12&tourl=/recharge/distribution/12');
    //             }
    //             chance -= 1;
    //             $(".rotate-box p strong").text(chance);
    //             newdraw.goto(random);
    //         },
    //         error: function() {
    //             console.log('error...');
    //         }
    //     })
    // }
    // isRotate = true;
});


$(".konw_btn").click(function(){
    $('.sorry_wd').fadeOut(300);
    $('.hidden_mask').fadeOut(250);
})
$('.rule_btn').click(function(){
    $('.hidden_mask').fadeIn(250);
    $('.rules_wd').slideDown(400);
    $('.hidden_mask').addClass('active');
})
$('.hidden_mask').click(function(){
    if($(this).hasClass('active')){
        $(this).fadeOut(250);
        $('.rules_wd').slideUp(400);
        $(this).remove('active');
    }else{
        return
    }
})
