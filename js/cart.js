window.onload=function(){
    // 点击垃圾桶按钮,弹出模态框
    // 获取模态框
    var motai=document.querySelector(".cart-motai");
    // 获取垃圾桶
    var dels=document.querySelectorAll(".delete");
    // 获取取消按钮
    var cancel=motai.querySelector(".cancel");
    
    // 触屏点击垃圾桶,显示模态框
    dels.forEach(function(v,i){
        itcast.tap(v,function(v,e){
            // 显示模态框
            motai.style.display="block";
            // 给当前的垃圾桶添加类样式
            this.classList.add("open");
        });
    })
    // 触屏点击取消按钮,关闭模态框,删除垃圾桶样式
    itcast.tap(cancel,function(){
        // 关闭模态框
        motai.style.display="none";
        // 删除垃圾桶样式
        document.querySelector(".open").classList.remove("open");
    })
}