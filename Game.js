/**
 * Created by OhTao on 2019/11/25.
 */
//自调用函数---游戏对象
(function(){
    var timer;        //设置定时器
    var speed=150;    //设置小蛇移动速度
    var that=null;   //用来保存游戏对象this

    var sscore=document.getElementById('score');

//        游戏构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    }
    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
//            setInterval(function(){
//                that.snake.move(that.food,that.map);
//                that.snake.init(that.map);
//            },150);
        this.runSnake(this.food,this.map);
        this.bindKey();
    }

//        添加原型方法---设置小蛇自动动起来
    Game.prototype.runSnake=function(food,map){
        timer=setInterval(function(){
//                此时的this指的是window
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
//                console.log(this.snake.body[0].x+"======"+maxX);
//                小蛇头部的横纵坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //改进：设置分数
            var score=(this.snake.body.length-3)*10;
            sscore.innerHTML='得分：'+score;
            if(headX<0||headX>=maxX){
                clearInterval(timer);
                //alert("游戏结束！");
                alert("你的分数是："+score+"分");
            }
            if(headY<0||headY>=maxY){
                clearInterval(timer);
                //alert("游戏结束！");
                alert("你的分数是："+score+"分");
            }
            //改进：当小蛇头部撞到身体，游戏结束
            for(var i=this.snake.body.length-1;i>0;i--){
                if(headX==this.snake.body[i].x&&headY==this.snake.body[i].y){
                    clearInterval(timer);
                    //alert("游戏结束！");
                    alert("你的分数是："+score+"分");
                }
            }
            //if(this.snake.body.length%4==0){
            //    speed=speed-this.snake.body.length/4*10;
            //    clearInterval(timer);
            //    this.runSnake(this.food,this.map)
            //}
        }.bind(that),speed)    //bind把this的指向改成了that指的实例对象
    }

//        添加原型方法---设置用户按键，改变小蛇移动方向
    Game.prototype.bindKey=function(){
        var temp="false";
        document.addEventListener("keydown",function(e){
            switch (e.keyCode){
                //改进：小蛇不能反向移动
                case 37:if(this.snake.direction!="right")this.snake.direction="left";break;
                case 38:if(this.snake.direction!="bottom")this.snake.direction="top";break;
                case 39:if(this.snake.direction!="left")this.snake.direction="right";break;
                case 40:if(this.snake.direction!="top")this.snake.direction="bottom";break;
                //改进：按下空格使小蛇暂停，再按下则重新开始运动
                case 32:if(temp=="false"){clearInterval(timer);temp="ture";}else if(temp=="ture"){this.runSnake(this.food,this.map);temp="false";};break;
            }
        }.bind(that),false)
    }
    window.Game=Game;
//        var game=new Game(document.querySelector(".map"));
//        game.init();
}());