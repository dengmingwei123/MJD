itcast={
	tap:function(element,callback){
		// 获取元素
		var box=element;
		// 定义变量
		var startTime=0;//获取开始时间
		var isMove=false;//是否移动
		var distanceTime=0;//获取时间差
		// 给元素注册触屏事件
		// 触屏开始
		box.addEventListener("touchstart",function(){
			// 获取当前的时间戳
			startTime=Date.now();
		})
		// 触屏移动
		box.addEventListener("touchmove",function(){
			// 移动了
			isMove=true;
		})
		// 触屏结束
		box.addEventListener("touchend",function(e){
			// 获取当前时间戳,删除之前获取的时间戳,小于150ms 并且 没有移动过,就是点击事件
			distanceTime=Date.now()-startTime;
			if (distanceTime<150 && !isMove) {
				// 改变this指向
				callback && callback.call(box,e);
			}
		})
	}
}