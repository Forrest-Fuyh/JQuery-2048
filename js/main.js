//位置数组
let nums = new Array();

$(document).ready(function(){
    Newgame();
});

//创建新游戏
function Newgame(){
    init();
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
};