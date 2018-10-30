var isfalse =false; //控制滑动

div.onmousedown =function(e){
  isfalse =true;

  let X =e.clientX; //获取当前元素相对于窗口的X左边

  let offleft =div.offsetLeft; //当前元素相对于父元素的左边距

  let max = con.offsetWidth - this.offsetWidth; //宽度的差值

  document.body.onmousemove=function(e){
    if (isfalse == false){
      return;
    }
    let changeX = e.clientX; //在移动的时候获取X坐标

    let moveX = Math.min(max, Math.max(-2, offleft+(changeX - X))); //超过总宽度取最大宽
    leave.style.marginLeft = Math.max(0, moveX) +"px"; // 进度宽度
  }
}
document.body.onmouseup =function(){
    isfalse =false;
}