/**
 * Created by OhTao on 2019/11/25.
 */
//自调用函数---生成小蛇
(function(){
    var elements=[];  //存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width,height,direction){
        //            小蛇的每个部分的宽高
        this.width=width||20;
        this.height=height||20;

        this.radius=360;

//            小蛇的身体
        this.body=[
            {x:3,y:2,color:"red",img:"url(snake.png)"}, //头
            {x:2,y:2,color:"#579e4c",img:""}, //身体
            {x:1,y:2,color:"#579e4c",img:""} //身体
        ];
//            小蛇的方向
        this.direction=direction||"right";

    }

//        为原型添加方法---小蛇的初始化方法
    Snake.prototype.init=function(map){
//            删除小蛇
        remove();

        for(var i=0;i<this.body.length;i++){   //循环遍历div
            var obj=this.body[i];               //数组中每个数组元素都是一个对象
            var div=document.createElement("div");
            map.appendChild(div);                //把div加入到地图中
            div.style.position="absolute";
            div.style.width=this.width+"px"
            div.style.height=this.height+"px";
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            div.style.backgroundColor=obj.color;
            div.style.backgroundImage=obj.img;
            div.style.backgroundRepeat="no-repeat";
            div.style.backgroundSize="170% 170%";
            div.style.backgroundPosition="center";

            div.style.borderRadius=this.radius+"px";

            elements.push(div);                  //把div存放到elements中---目的是为了删除
        }
    }

//        为原型添加方法---小蛇动起来
    Snake.prototype.move=function(food,map){
        var i=this.body.length-1;         //小蛇身体的长度，不包括头
        for(i;i>0;i--){                     //改变小蛇的身体坐标位置
            this.body[i].x=this.body[i-1].x;  //将小蛇身体的后一格移到前一格
            this.body[i].y=this.body[i-1].y;
        }
//            判断方向---改变小蛇头部的坐标位置
        switch (this.direction){
            case "right":this.body[0].x+=1;
                break;
            case "left":this.body[0].x-=1;
                break;
            case "top":this.body[0].y-=1;
                break;
            case "bottom":this.body[0].y+=1;
                break;
        }

//            判断有没有吃到食物，小蛇的头的坐标和食物坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
//                获取小蛇最后的尾巴
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
//                alert("吃了")
            food.init(map);
        }
    }
//        删除小蛇的私有函数
    function remove(){
        var i=elements.length-1;
        for(i;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);

        }
    }
//        把小蛇Snake暴露给window，供外部使用
    window.Snake=Snake;
}());