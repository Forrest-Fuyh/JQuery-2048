//随机生成单元格动画
function showNumberWithAnimation(i,j,n){
    console.log(i,j,n);
    let numberCell = $('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(n));
    numberCell.css('color',getNumberColor(n));
    numberCell.text(n);

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i),
        left:getPosLeft(j)
    },500)
}