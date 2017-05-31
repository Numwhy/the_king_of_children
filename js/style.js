$(function(){
    /***********box4***********/
    var box4Li = $('.con-box4-top ul').children('li');
    box4Li.each(function(){
        var c4 = $(this).index();
        if(c4%2 != 0){
            box4Li.eq(c4).css('margin-left','20px');
        }
    });
    //box4图片轮播
    var conBox4 = document.getElementById('con-box4-bottom'),
        box4Ul1 = conBox4.getElementsByTagName('ul')[0],
        box4Li1 = box4Ul1.getElementsByTagName('li'),
        box4Pre = document.getElementById('pre'),
        box4Nex = document.getElementById('nex'),
        arr = [];
    for(var i = 0;i < box4Li1.length;i++){
        var oImg = box4Li1[i].getElementsByTagName('img')[0];
        arr.push([
            parseInt(getStyle(box4Li1[i],'left')),
            parseInt(getStyle(box4Li1[i],'top')),
            getStyle(box4Li1[i],'opacity')*100,
            getStyle(box4Li1[i],'zIndex'),
            oImg.height
        ])
    }
    box4Ul1.onmouseover = function(){
        clearInterval(timer);
    };
    box4Ul1.onmouseout = function(){
        timer = setInterval(slide1,5000);
    };
    var timer = setInterval(slide1,5000);
    function slide(){
        for(var i = 0;i < box4Li1.length;i++){
            var oImg = box4Li1[i].getElementsByTagName('img')[0];
            box4Li1[i].style.zIndex = arr[i][3];
            startMove(box4Li1[i],{
                'left' : arr[i][0],
                'top' : arr[i][1],
                'opacity' : arr[i][2]
            });
            startMove(oImg,{
                'height' : arr[i][4]
            })
        }
    }
    //向左
    box4Pre.onclick = function(){
        arr.push(arr[0]);
        arr.shift();
        slide();
    };
    //向右
    function slide1(){
        arr.unshift(arr[arr.length - 1]);
        arr.pop();
        slide();
    }
    box4Nex.onclick = slide1;
    //更改样式
    function getStyle(obj,attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj,false)[attr];
        }
    }
    /*******回到顶部********/
    var goTop = $('.goTop');
    goTop.click(function(){
        $('html,body').animate({
            'scrollTop' : '0'
        },1500)
    });
    $(window).scroll(function(){
        var winT = $(this).scrollTop();
        if(winT > 222){
            goTop.show();
        }else{
            goTop.hide();
        }
    })
    /**************表单验证***************/
    var sex = $('.sex'),
        name = $('#name'),
        age = $('#age'),
        tel = $('#tel'),
        adress = $('#adress'),
        ljbm = $('#ljbm').children('input[type=button]');
    //性别判断
    sex.click(function(){
        checkedSex($(this),0);
        if($('.sex:checked')){
            sexVal = $(this).next('span').text();
        }
    });
    function checkedSex(obj,ischeck){
        if(ischeck == 0){
            obj.attr('checked','checked');
            obj.siblings().removeAttr('checked');
        }
    }
    ljbm.click(function(){
        checkedName(name);
        checkedSex(sex,0);
        checkedAge(age);
        checkTel(tel);
        checkedAdress(adress);
    });
    //姓名判断
    function checkedName(obj){
        if(obj.val() == ''){
            alert('请输入姓名');
        }else if(!obj.val().match(/^[\u4e00-\u9fa5]{1,10}$/)){
            alert('姓名格式不正确，请输入中文');
            obj.val('');
        }
    }
    //年龄判断
    function checkedAge(obj){
        if(obj.val() == '' || isNaN(obj.val())){
            alert('请输入正确的年龄');
            obj.val('');
        }
    }
    //电话判断
    function checkTel(obj){
        if(obj.val() == '' || !obj.val().match(/^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/)){
            alert('手机号码不正确，请重新输入!');
            obj.val('');
        }
    }
    //地址判断
    function checkedAdress(obj){
        if(obj.val() == ''){
            alert('请输入家庭住址');
        }
    }
});
