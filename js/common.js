//获取距离上边的位置
function getPosTop(i){
    return 20 + 120 * i;
}

//获取距离左边的位置
function getPosLeft(j){
    return 20 + 120 * j;
}

//获取数字背景颜色
function getNumberBackgroundColor(num){
    switch(num){
        case 2:return "#eee4da";
        case 4:return "#ede0c8";
        case 8:return "#f2b179";
        case 16:return "#f59563";
        case 32:return "#f67c5f";
        case 64:return "#f65e3b";
        case 128:return "#edcf72";
        case 256:return "#edcc61";
        case 512:return "#9c0";
        case 1024:return "#33b5e5";
        case 2048:return "#09c";
        case 4096:return "#a6c";
        case 8192:return "#93c";
    }
}

//获取数字颜色
function getNumberColor(num){
    if(num<=4){
        return '#776e65';
    }else{
        return '#fff';
    }
}

//判断没有空间
function noSpace(nums){
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if(nums[i][j] == 0)
                return false;
        }
    }
    return true;
}

//判断是否可以向左移动
function canMoveLeft(nums){
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if(nums[i][j] != 0){
                if(nums[i][j-1] == 0 || nums[i][j] == nums[i][j-1] ){
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以向右移动
function canMoveRight(nums){
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if(nums[i][j] != 0){
                if(nums[i][j+1] == 0 || nums[i][j] == nums[i][j+1] ){
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以向上移动
function canMoveUp(nums){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

//判断是否可以向下移动
function canMoveDown(nums){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(nums[i][j]!=0){
                if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}



//判断k-j之间没有障碍物
function noBlockHorizontal(row,col1,col2,nums){
    for (let i=col1+1;i<col2;i++){
        if(nums[row][i]!=0){
            return false
        }
    }
    return true
}

//判断垂直方向上是否没有障碍物
function noBlockVertical(col,row1,row2,nums){
    for(let i=row1+1;i<row2;i++){
        if(nums[i][col]!=0){
            return false;
        }
    }
    return true;
}

//更新显示分数
function updateScore(score){
    $('#score-number').text(score);
}

//判断是否不能移动
function noMove(nums){
    if(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums)){
        return false;
    }
    return true;
}

//判断游戏是否结束，两个条件：1.没有空单元格  2.不能移动
function isGameOver(){
    if(noSpace(nums) && noMove(nums)){
        alert('Game Over!');
    }
}