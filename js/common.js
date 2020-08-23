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