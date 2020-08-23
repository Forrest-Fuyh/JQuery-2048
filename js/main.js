//位置数组
let nums = new Array();

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
        for(let j = 0; j < 4; j++){
            nums[i][j] = 0;
        }
    }

    //动态创建上层单元格
    updateView();

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
