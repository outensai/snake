/**
 * Created by OhTao on 2019/11/25.
 */
//自调用函数----生成食物
(function(){
    var elements=[];  //用来保存每个小方块食物

//        创建小方块食物
    function Food(x,y,width,height,color){
//            横纵坐标
        this.x=x||0;
        this.y=y||0;
//            宽、高和颜色
        this.width=width||20;
        this.height=height||20;
        this.color=color||"red";
        this.img="url(food.png)";

        this.radius=360;

    };

    Food.prototype.init=function(map){
//            先删除这个小食物
        remove();

        var div=document.createElement("div");
        map.appendChild(div);
        div.style.position="absolute";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.backgroundImage=this.img;
        div.style.backgroundRepeat="no-repeat";
        div.style.backgroundSize="100% 100%";
        div.style.backgroundPosition="center";

        div.style.borderRadius=this.radius+"px";

//            随机生成横纵坐标
        this.x=Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        elements.push(div);  //把div添加到数组elements中
    }

//        私有函数--删除食物
    function remove(){
        for(var i=0;i<elements.length;i++){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);  //找到子元素的父级元素，然后删掉子元素
            elements.splice(i,1);   //再次把elements的子元素删除

        }
    }

//        把Food暴露给window,外部可以使用
    window.Food=Food;
}());