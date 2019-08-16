(function(){
    // 1.手指滑动,左边导航栏跟着滑动,超过距离弹回
    // 获取手指进入的Y轴值,获取移动的Y轴值,判断差值,设置给ul的transformY,进行平移
    // 手指离开后判断是否超出距离,如果超出则弹回
    leftSlide();
    function leftSlide(){
        // 获取右边导航栏盒子
        var leftnav=document.querySelector(".c-left");
        // 获取ul
        var ul=leftnav.querySelector("ul");
        // 获取最大下拉多少,导航盒子的高-ul的高
        var maxLate=leftnav.offsetHeight-ul.offsetHeight;
        // 定义变量,保存数据
        var startY=0;
        var moveY=0;
        var distanceY=0;
        var currentY=0;//当前的值
        // 触屏开始
        leftnav.addEventListener("touchstart",function(e){
            // 获取开始的clientY值
            startY=e.targetTouches[0].clientY;
        })
        // 触屏移动
        leftnav.addEventListener("touchmove",function(e){
            // 移动获取clientY值
            moveY=e.targetTouches[0].clientY;
            // 计算差值
            distanceY=moveY - startY;
            // 移动的时候删除动画效果
            ul.style.transition="none";
            // 将差值给ul
            ul.style.transform="translateY("+(currentY+distanceY)+"px)";

        })
        // 触屏离开
        leftnav.addEventListener("touchend",function(e){
            // 抬起获取当前的Y值
            currentY+=distanceY;
            // 判断当前的Y值是否小于最大平移距离
            if(currentY<maxLate){
                // 如果是的话,当前Y值=最大平移距离
                currentY=maxLate;
                // ul动画弹回去
                ul.style.transition="transform 0.5s";
                ul.style.transform="translateY("+currentY+"px)";
            }
            // 判断当前的Y值是否大于0,如果是则弹回0
            if(currentY>0){
                currentY=0;
                // ul动画弹回去
                ul.style.transition="transform 0.5s";
                ul.style.transform="translateY("+currentY+"px)";
            }
        })
    }

    // 2.左边滑动,通过插件
    var myScroll = new IScroll('.c-right',{
        scrollY:true
    });
})();