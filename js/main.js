//位置数组
let nums = new Array();
let score = 0;
let hasConflicted = new Array();    //标记单元格是否做过叠加，true表示叠加过，false表示未叠加

$(document).ready(function(){
    Newgame();
});

//创建新游戏
function Newgame(){
    init();

    //界面中随机产生两个数
    generateOneNumber();
    generateOneNumber();
};

//创建新游戏后初始化界面
function init(){
    //初始化单元格位置
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            let gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i));
            gridCell.css('left',getPosLeft(j));

        }
    }

    //初始化数组
    for (let i = 0; i < 4; i++){
        nums[i] = new Array();
        hasConflicted[i] = new Array();
        for(let j = 0; j < 4; j++){
            nums[i][j] = 0;
            hasConflicted[i][j] = false;    //表示未叠加
        }
    }

    //动态创建上层单元格
    updateView();
    //分数归零
    score = 0;
    updateScore(score);
};

//更新上层单元格视图
function updateView(){
    //清空单元格
    $('.number-cell').remove();

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            $('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')

            let numberCell = $('#number-cell-'+i+'-'+j);

            if(nums[i][j] == 0){
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getPosTop(i)+50);
                numberCell.css('left',getPosLeft(j)+50);
            }else {
                numberCell.css('width','100px');
                numberCell.css('height','100px');
                numberCell.css('top',getPosTop(i));
                numberCell.css('left',getPosLeft(j));
                numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
                numberCell.css('color',getNumberColor(nums[i][j]));
                numberCell.text(nums[i][j]);
            }
        hasConflicted[i][j] = false;
        }
    }
}

/*
    在剩余的单元格中随机产生一个数：
    1、在空余的单元格中随机找一个
    2、随机产生一个2或4
*/
function generateOneNumber(){
    if(noSpace(nums)){
        return;
    }

    //在空余单元格中找到一个随机位置
    let count = 0;
    let temp = new Array();
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (nums[i][j] == 0){
                temp[count] = i * 4 + j;    //i = temp[count] / 4 ;j = temp[count] % 4
                count++;
            }
        }
    }
    let randPos = Math.floor(Math.random()*count);
    let randX = Math.floor(randPos / 4);
    let randY = Math.floor(randPos % 4);

    //在随机的位置上产生一个随机数
    let randNum = Math.random() < 0.5 ? 2 : 4;

    //在随机位置上显示随机数字
    nums[randX][randY] = randNum;
    showNumberWithAnimation(randX,randY,randNum);
}

//实现键盘响应
$(document).keydown(function (event){
    //阻止事件的默认动作
    event.preventDefault();

    switch (event.keyCode) {
        case 37: //left
            //判断是否可以向左移动
            if(canMoveLeft(nums)){
                moveLeft();
                setTimeout(generateOneNumber,500);
                setTimeout(isGameOver,500);
            }
            break;
        case 38://up
            if(canMoveUp(nums)){
                moveUp();
                setTimeout(generateOneNumber,500);
                setTimeout(isGameOver,500);
            }
            break;
        case 39://right
            if(canMoveRight(nums)){
                moveRight();
                setTimeout(generateOneNumber,500);
                setTimeout(isGameOver,500);
            }
            break;
        case 40://down
            if(canMoveDown(nums)){
                moveDown();
                setTimeout(generateOneNumber,500);
                setTimeout(isGameOver,500);
            }
            break;
        default:break;

    }

})


/*
    向左移动
    需要对每个数字进行判断选择合适的落脚点，落脚点有两种情况:
        1、落脚点没有数字，并且移动的路径中没有障碍物
        2、落脚点数字和自己相同，并且移动的路径中没有障碍物
*/
function moveLeft(){
    for (let i = 0;i<4;i++){
        for (let j=1;j<4;j++){
            if(nums[i][j] != 0 ){
                for (let k=0;k<j;k++){
                    if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums)){     //判断第i行的第k-j之间是否有障碍物
                        //移动单元格
                        showMoveAnimation(i,j,i,k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    }else if(nums[i][k] == nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){    //判断落脚点数字是否和自己相同且移动路径无障碍
                        //移动单元格
                        showMoveAnimation(i,j,i,k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        //统计分数
                        score += nums[i][k];
                        //更新分数
                        updateScore(score);

                        //更新叠加判断
                        hasConflicted[i][k] = true; //表示已经叠加
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView,200);
}

//向右移动
function moveRight(){
    for (let i = 0;i<4;i++){
        for (let j=2;j>=0;j--){
            if(nums[i][j] != 0 ){
                for (let k=3;k>j;k--){
                    if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){     //判断第i行的第k-j之间是否有障碍物
                        //移动单元格
                        showMoveAnimation(i,j,i,k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    }else if(nums[i][k] == nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){    //判断落脚点数字是否和自己相同且移动路径无障碍
                        //移动单元格
                        showMoveAnimation(i,j,i,k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        //统计分数
                        score += nums[i][k];
                        //更新分数
                        updateScore(score);

                        //更新叠加判断
                        hasConflicted[i][k] = true; //表示已经叠加
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView,200);
}

//向上移动
function moveUp(){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(nums[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ //第j列的第k-i行之间是否有障碍物
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView,200);
}

//向下移动
function moveDown(){
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(nums[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){ //第j列的第i-k行之间是否有障碍物
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if(nums[k][j]==nums[i][j]  && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        score+=nums[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView,200);
}