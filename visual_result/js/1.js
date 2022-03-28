var a = UrlParam.paramValues("a"); 
// alert(a);
if(a[0].length > 4){
    $('#data').append("<img src='textures/artwork.png' alt='图像未收录'/>");
    $('#data').append("<h1>作品编号："+a+"</h1>");
    $('#data').append("<h1>作者：XX</h1>");
    $('#data').append("<h1>朝代：XX</h1>");
    $('#data').append("<h1>分卷分册情况：XX</h1>");
    $('#data').append("<h1>背景故事：XXXX</h1>");
}
else{
    $('#data').append("<img src='textures/author.png ' alt='图像未收录'/>");
    $('#data').append("<h1>画家编号："+a+"</h1>");
    $('#data').append("<h1>画家：XX</h1>");
    $('#data').append("<h1>朝代：XX</h1>");
    $('#data').append("<h1>画家故事：XXXX</h1>");
}

