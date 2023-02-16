function showBox(which){
  if($('#info').is(':visible')){ // 如果下方搜索栏处于展开状态，需要执行该函数
    collapse('info','info-parent .collapse',true);
  }
  $("#lightBox").empty(); //清空lightbox的所有内容，但是不删除lightbox元素本身
  if(which != undefined){ //将which对应的div内容(已经在index.html文件里写好了)
    $("#lightBox")[0].innerHTML = $("#"+which)[0].innerHTML;
  } //此处是为了把jQuery对象转成DOM对象才用[0]方法
  //也可以把$()[0].innerHTML换成$().html(XX内容)

  // 如果中部的lightbox模块没有显示
  if($('#lightBox').is(':visible') == false){ 
    $("#info-parent .collapse").click(); //模拟实现单击下方搜索框
    $("#lightBox").fadeIn('slow'); //实现淡入效果
    lightBoxOn = true;
  }
}

function toggleMenu(){  
  if($('#menu').is(':visible')){  //判断菜单是否为可视(显示状态)
    $('#hamburger').css('transform', "rotate(0)"); //如果已显示，将图标角度置为0即回归原位
  }else{ //反之则旋转90°表示成菜单展开的样子
    $('#hamburger').css('transform', "rotate(90deg)");
  }
  // 每次点击菜单栏的状态都要在显示/隐藏状态下切换一次
  $('#menu').toggle().animate(); //animate函数可有可无
}

// 搜索栏相关函数 collapse('info','info-parent .collapse',true)
function collapse(col, self, top){
  if($('#'+col).is(':visible')){
    if(top){
      $('#'+col).slideUp();
    }else{
      $('#'+col).slideDown();
    }
    $('#'+self).css('transform', "rotate(180deg)");
  }else{
    if(top){
      $('#'+col).slideDown();
    }else{
      $('#'+col).slideUp();
    }
    $('#'+self).css('transform', "rotate(0)");
  }
}

// 如果在搜索栏搜索，会实现一下内容
// 1.开始填充info模块
// 2.最上方返回搜索结果not found或是找到几篇
// 3.以ul + n*li的形式 
function search(string){
  console.log(string);
  var found = false;
  string = string.toLowerCase();
  if($('#info').is(':visible') == false){
    $('#info').show();
  }
  $('#info').empty();
  var list = "<ul>"
  var resultCount = 0;
  for(n in nodes){  // n代表论文索引
    if(nodes[n].title.toLowerCase().includes(string)){
      resultCount++;
      var c = new THREE.Color(groups[nodes[n].type]); //取出颜色
      c = c.getHexString(); //转化成16进制
      list+="<li><a href=\javascript:zoomTo('"+n.toString()+"')\ data-track'click' data-track-action='view search result' data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/zoom.svg'/ alt='view result'></a><a href=\javascript:updateInfo('"+n+"','"+c+"')\ data-track'click' data-track-action='expand search result'  data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/paper.svg' alt='expand result'/></a><a href=\javascript:zoomTo('"+n.toString()+"')\ data-track'click' data-track-action='view search result'  data-track-category='info' data-track-label='button'><p>"+nodes[n].title+"</p></a></li>"
      found = true;
    }
  }
  if(found){
    $('#info').prepend("<p>"+resultCount+" results found</p>");
    list+="</ul>"
    $('#info').append(list);
  }
  else{
    list+="<p>No results found</p>"
  }
}

// function searchRt(string){
//   console.log(string);
//   var found = false;
//   string = string.toLowerCase();
//   if($('#info').is(':visible') == false){
//     $('#info').show();
//   }
//   $('#info').empty();
//   var list = "<ul>"
//   var resultCount = 0;
//   for(n in nodes){
//     if(nodes[n].title.toLowerCase().includes(string)){
//       resultCount++;
//       var c = new THREE.Color(groups[nodes[n].type]);
//       c = c.getHexString();
//       list+="<li><a href=\javascript:zoomTo('"+n.toString()+"')\ data-track'click' data-track-action='view search result' data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/zoom.svg'/ alt='view result'></a><a href=\javascript:updateInfoRt('"+n+"','"+c+"')\ data-track'click' data-track-action='expand search result'  data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/paper.svg' alt='expand result'/></a><a href=\javascript:zoomTo('"+n.toString()+"')\ data-track'click' data-track-action='view search result'  data-track-category='info' data-track-label='button'><p>"+nodes[n].title+"</p></a></li>"
//       found = true;
//     }
//   }
//   if(found){
//     $('#info').prepend("<p>"+resultCount+" results found</p>");
//     list+="</ul>"
//     $('#info').append(list);
//   }
//   else{
//     list+="<p>No results found</p>"
//   }
// }

function nextDiamond(){
  var node = nodes[tabs[tabCounter]];
  var c = new THREE.Color(groups[node.type]);
  updateInfo(tabs[tabCounter],c, node);
  zoomTo(tabs[tabCounter]);
  if(tabCounter < tabs.length-1){
    tabCounter++;
  }else{
    tabCounter = 0;
  }
}

function updateInfo(index, color, node){
  if(node == undefined){
    node = nodes[index]; //trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
  }
  $('#info').empty();

  // 这种情况代表那几篇特别的文章，需要加上特别的前缀
  if(editSelect[index]!=undefined){
    if(editSelect[index].rt!=undefined){
      var rt = editSelect[index].rt;
      $('#info').append("<a href='reftree2.html?="+rt+"' data-track='click' data-track-action='reftree "+index+"'  data-track-category='info' data-track-label='button' class='rt'><img src='textures/eye.svg' alt='visualize icon' class='icon' style='position: relative; top: 8px;'/><p>Visualize featured paper</p></a>");
    }
  }

  // 添加标题，分类，年代和链接
  $('#info').append("<h1>"+node.title+"</h1><h2><span style='color:#"+color+"'>"+node.type+"</span> "+node.year+"</h2><a href='https://www.nature.com/articles/"+index+"' target='_blank' data-track='click' data-track-action='Go to paper "+index+"'  data-track-category='info' data-track-label='button'><img src='textures/new-tab.svg' alt='open paper' class='icon'/></a>").fadeIn('slow');

  // 过滤函数，返回起点为目标节点的连边的集合
  var edges = edgelist.filter(obj => {
    return obj.source === index;
    return obj.target === index;
  })
  if(edges.length > 0){
    var list = "<p>Cocited with </p><ul>"

    for(l=0;l<edges.length;l++){
      var ttl;
      var zid;
      if(edges[l].source == index){
        ttl = nodes[edges[l].target].title;
        zid = edges[l].target;
      }else{
        ttl = nodes[edges[l].source].title;
        zid = edges[l].source;
      }
      list+="<li><a href=\javascript:zoomTo('"+zid.toString()+"')\ data-track'click' data-track-action='view search result'  data-track-category='info' data-track-label='button' ><img class='icon-small' src='textures/zoom.svg'/ alt='view result'></a><a href=\javascript:updateInfo('"+zid+"','"+color+"')\ data-track'click' data-track-action='expand search result'  data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/paper.svg' alt='expand result'/></a><a data-track='click' data-track-action='zoom to node "+zid+"'  data-track-category='info' data-track-label='button' href=\javascript:zoomTo('"+zid+"')\><p>"+ttl+"</p></a></li>"
    }
    list+="</ul>"
    $('#info').append(list);
    if(editSelect[index]!= undefined || poi[index]!=undefined){
      $('#info').append('<p class="nextDiamond" onclick="nextDiamond()" tabindex="0">Next Diamond</p>');
    }
  }
}

// 先略过
function updateInfoRt(index, color, node){
  if(node == undefined){
    node = nodes[index];
  }
  $('#info').empty();
  $('#info').append("<h1>"+node.title+"</h1><h2><i>"+node.journal+"</i>, <span style='color:#"+color+"'>"+node.type+"</span> "+node.year+"</h2>").fadeIn('slow');
  var edges = edgelist[node.id];
  if(edges.length > 0){
    var list = "<p>Citations & References </p><ul>"
    for(l=0;l<edges.length;l++){
      let ea = nodes.find(o => o.id == edges[l].id);
      var ttl = ea.title;
      var zid = edges[l].id;
      list+="<li><a href=\javascript:zoomTo('"+zid.toString()+"')\ data-track'click' data-track-action='view search result'  data-track-category='info' data-track-label='button' ><img class='icon-small' src='textures/zoom.svg'/ alt='view result'></a><a href=\javascript:updateInfoRt('"+zid+"','"+color+"')\ data-track'click' data-track-action='expand search result'  data-track-category='info' data-track-label='button'><img class='icon-small' src='textures/paper.svg' alt='expand result'/></a><a data-track='click' data-track-action='zoom to node "+zid+"'  data-track-category='info' data-track-label='button' href=\javascript:zoomTo('"+zid+"')\><p>"+ttl+"</p></a></li>"
    }
    list+="</ul>"
    $('#info').append(list);
  }
}

//每次单击搜索框先清空
document.getElementById('search').addEventListener("focus", function(event){
  $('#search').val('');
});

//call click when "enter" on tabbed clickable element
//当 "回车 "出现在标签式可点击元素上时调用点击，感觉没什么大用
window.addEventListener("keyup", function(event) {
  var elementId = (event.target || event.srcElement).id;
  if(lightBoxOn && elementId!="ui" && elementId!="lightBox"){
    lightBoxOn = false;
    $('#lightBox').fadeOut();
  }
  // Number 13 is the "Enter" key on the keyboard
  // if (event.keyCode === 13) {
  //   //document.activeElement.click();
  //   if(document.activeElement.id == "search"){
  //     search($("#search").val());
  //   }
  // }
  //escape closes lightbox
  if (event.keyCode === 27) {
    onMouseDown();
  }
  //on tab when container is focused
  // if(event.keyCode === 9){
  //   if(!focusOnTabNav){
  //     $("#tab-nav").focus(function(){
  //       focusOnTabNav = true;
  //     })
  //   }else{
  //     console.log("tab on container");
  //     focusOnTabNav = false;
  //     $("#info").focus();
  //     nextDiamond();
  //   }
  // }
});
