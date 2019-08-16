(function(){
    // 1.顶部搜索框透明,随着滚动加深,超过轮播图后就完全不透明
    // 获取顶部卷曲出去的距离
    // 获取轮播图的高度
    // 透明度=卷曲出去的距离/轮播图的高度
    setHeader();
    function setHeader(){
        // 获取头部
        var header=document.querySelector(".jd-header");
        // 获取卷曲出去的距离
        var scrollY=0;
        // 获取轮播图的高度
        var bannerHeight=document.querySelector(".jd-banner").offsetHeight;
        // 设置透明度
        var value=0;
        // 页面滚动事件
        window.addEventListener("scroll",function(){
            // 获取页面卷曲出去的距离
            scrollY=window.pageYOffset;
            // 设置透明度
            value=scrollY/bannerHeight;
            if(value > 1){
                value = 1;
            }
            // 为头部设置透明度
            header.style.backgroundColor="rgba(222,24,27,"+value+")";
            
        })
    }

    // 2.京东快报,无缝轮播效果
    // 复制一个给用户看的新闻
    // 获取新闻高度,声明变量index
    // 设置定时器,变量改变实现轮播
    // 获取新闻总条数,判断index是否到了最后一条,是的话index=0
    setNews();
    function setNews(){
        // 获取新闻显示高度
        var newsHeight=document.querySelector(".jd-news").offsetHeight;
        // 获取装新闻的盒子
        var ul=document.querySelector(".jd-news .info");
        // 获取所有的新闻
        var list=ul.querySelectorAll("li");
        // 声明变量,改变变量实现动画效果
        var index=0;
        var timeId=window.setInterval(function(){
            index++;
            // 设置动画效果
            ul.style.transition="transform 0.5s";
            // 设置新闻的盒子往上滑动
            ul.style.transform="translateY("+(-index*newsHeight)+"px)";
        },1000)

        // 在动画结束的时候进行判断
        ul.addEventListener("transitionend",function(){
            if(index>=list.length-1){
                index=0;
                // 清除动画效果,瞬间跳回
                ul.style.transition="none";
                // 跳回第一条
                ul.style.transform="translateY(0px)";
            }
        })

    }

    // 3.秒杀倒计时
    // 获取服务器传过来的时间
    // 设置定时器,倒计时
    countDown();
    function countDown(){
        // 获取倒计时盒子
        var seckill=document.querySelector(".seckill");
        // 获取倒计时
        var seckillTime=seckill.querySelectorAll(".title .time span:nth-child(2n+1)");
        // 获取标题
        var title=seckill.querySelector(".text").innerHTML;
        var result=title.substring(0,2);
        var date=new Date();
        // 目标时间
        var targetHours = result;
        // 当前时间
        var currentHours=date.getHours();//小时
        var currentMinute=date.getMinutes();//分钟
        var currentSecond=date.getSeconds();//秒

        // 计算当前总共多少秒
        var currentTime = ( currentHours * 60 * 60 ) + ( currentMinute * 60 ) + currentSecond;
        
        // 目标时间
        var targetTime = targetHours * 60 * 60;

        // 获取时间差
        var timeDifference=targetTime-currentTime;
        var time=Math.floor(timeDifference / 3600);//小时 
        var hours=Math.floor(timeDifference % 3600 / 60);//分钟
        var second=Math.floor(timeDifference % 60);//秒
        // 创建定时器
        var timer=window.setInterval(function(){
            timeDifference--;
            time=Math.floor(timeDifference / 3600);//小时 
            hours=Math.floor(timeDifference % 3600 / 60);//分钟
            second=Math.floor(timeDifference % 60);//秒
            time=time >= 10 ? time : "0" + time ;
            hours=hours >= 10 ? hours : "0" +hours ;
            second=second >= 10 ? second : "0" + second ;
            seckillTime[0].innerHTML=time;
            seckillTime[1].innerHTML=hours;
            seckillTime[2].innerHTML=second;
        },1000);
    }

    // 4.banner轮播图,无缝轮播效果
    // 复制开始的轮播图放置结尾,复制结尾轮播图放置开始,做到给用户观看
    // 获取每张轮播图的宽,声明变量index
    // 创建定时器,通过改变变量实现轮播
    setBanner();
    function setBanner(){
        // 获取显示轮播图的相框
        var banner=document.querySelector(".jd-banner");
        // 获取相框的宽度
        var bannerWidth=banner.offsetWidth;
        // 获取装轮播图的盒子
        var ul=banner.querySelector("ul");
        // 获取轮播图
        var list=ul.querySelectorAll("li");
        // 获取小圆点
        var point=banner.querySelectorAll("ol li");
        // 声明变量,改变变量实现轮播
        var index=1;
        var timeId=window.setInterval(startTimer,1500);

        // 监听动画结束,进行判断
        ul.addEventListener("transitionend",function(){
            // 判断当前显示的轮播图是否是最后一张轮播图
            if(index>=list.length-1){
                
                index=1;
                // 删除动画效果,瞬间跳转
                removeTransition();
                // 轮播图盒子平移,跳转回去
                addTransform(-index*bannerWidth);
            }
            // 判断当前显示的轮播图是不是第一张
            if(index<=0){
                index=list.length-2;
                // 删除动画效果,瞬间跳转
                remvoeTransition();
                // 轮播图盒子平移,跳转回去
                addTransform(-index*bannerWidth);
            }

            // 动画结束后设置小圆点
            setPoint(index-1);
        })
        // 触屏切换轮播图
        // 创建变量存储数据
        var startX=0;//开始
        var moveX=0;//移动
        var distanceX=0;//差值
        // 触屏开始
        // 触屏开始的时候停止定时器,获取当前的手指在可视区域的X轴
        banner.addEventListener("touchstart",function(e){
            // 停止定时器
            clearInterval(timeId);
            // 获取手指进入的X轴值
            startX=e.targetTouches[0].clientX;
        }) 
        // 触屏移动
        banner.addEventListener("touchmove",function(e){
            // 获取手指移动的X轴值
            moveX=e.targetTouches[0].clientX;
            // 计算间差
            distanceX=moveX - startX;
            // 添加动画效果
            removeTransition();
            // 添加transform平移
            addTransform(-index * bannerWidth + distanceX);
        })
        // 触屏结束
        banner.addEventListener("touchend",function(e){
            // 判断滑动的间差是否大于显示盒子的三分之一
            if( Math.abs( distanceX ) > bannerWidth / 3 ){
                //判断差值是否大于0,大于则是左滑,小于右滑动
                if( distanceX > 0 ){
                    console.log("左滑动");
                    index--;
                    // 添加动画效果
                    addTransition();
                    // 添加transform平移
                    addTransform((-index * bannerWidth ));
                }
                if( distanceX < 0 ){
                    console.log("右滑动");
                    index++;
                    // 添加动画效果
                    addTransition();
                    // 添加transform平移
                    addTransform((-index * bannerWidth ));
                }
            }else{
                // 添加动画效果
                addTransition();
                // 添加transform平移
                addTransform((-index * bannerWidth ));
            }

            // 重新添加定时器
            timeId=setInterval(startTimer,1500);
        })

        // 屏幕变动,动态改变轮播图位移距离
        window.addEventListener("resize",function(){
            bannerWidth=banner.offsetWidth;
            // 删除动画效果
            removeTransition();
            // 添加transform平移
            addTransform(-index*bannerWidth);
        })

        // 小圆点实时变化函数
        function setPoint(index){
            // 排他,清空所有小圆点的高亮
            point.forEach(function(v,i){
                v.classList.remove("current");
            })
            // 设置当前index值的小圆点高亮
            point[index].classList.add("current");
        }
        // 定时器函数
        function startTimer() {
            index++;
            // 添加动画效果
            addTransition();
            // 添加transform平移
            addTransform((-index * bannerWidth ));
        }
        

        // 兼容代码
        // 删除transition动画效果
        function removeTransition(){
            // 删除动画效果,瞬间跳转
            ul.style.transition="none";
            ul.style.webkitTransition="none";
        }

        // 添加transition动画效果
        function addTransition(){
            // 设置动画效果
            ul.style.transition="transform 0.5s";
            ul.style.webkitTransition="transform 0.5s";
        }

        // 添加transform平移
        function addTransform(x){
            // 轮播图盒子平移,实现轮播
            ul.style.transform="translateX("+ x +"px)";
            ul.style.webkitTransform="translateX("+ x +"px)";
        }
    }



})()