var startTime, endTime, w, h;
// var info,scale,name,links,edgelist,nodes;
var nodeLabels = [];
var linkLabels = [];
var nodePositions = [];
var links ={};
var nodeColors = {};
var nodeGroups = {};
var nodeSizes = [];
var firstshow = false
// 开始函数，没什么用，返回值都没有，只是确定开始时间、宽、高三个变量
start();
function start() {
  startTime = new Date();
  w = window.screen.width * window.devicePixelRatio;
  h = window.screen.height * window.devicePixelRatio;
};

//结束函数，单纯控制台输出离开始时间过了多少秒
function end(str) {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  console.log(str+" "+ seconds + " seconds");
}


var useRand = false;
var randFloat = 0.5;
var raycaster = new THREE.Raycaster(); //创建射线对象，光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
var mouse = new THREE.Vector2(); //创建一个二维向量，代表鼠标对象（所在的点坐标）
var camera, parent, dummy, spriteGroup, scene, renderer, controls, container, particleSystem, uniforms, spriteInter, controlsVR, poimat, editorialmat, poimatSelect, editorialmatSelect;
var nodes = {};
var edgelist = [];
var artPos = {};
var parent;
var gyroSet = false;
var most = 0;
var spriteSize = 50;
var mobile;
var camMove = false, spin = false, pulse = true, nodesLoaded = false, linksLoaded = false, lightBoxOn = true, firstClick = false;
var camDest = new THREE.Vector3( -0.019203416626647297, 19240.94769869502, -0.00128069454865480650);

// 学科表
// var types = ["Arts","Biology","Biomedical research","Chemistry","Clinical medicine","Earth and space","Engineering and technology", "Health", "Humanities", "Mathematics", "Physics","Business and management", "Psychology","Social sciences"];

var groups = {
"":0xffffff,
"1-01 先秦汉唐 传世作品 第1册":0x7FAEAD,
"1-01 先秦汉唐 传世作品 第2册":0x771A84,
"1-03 先秦汉唐 俄藏敦煌藏经洞出土图像":0xCFA178,
"1-04 先秦汉唐 英藏敦煌藏经洞出土图像":0x98549F,
"1-05 先秦汉唐 法图藏敦煌藏经洞出土图像":0x3662DC,
"1-07 先秦汉唐 台北唐画":0x19B122,
"2-01 宋画全集 故宫藏品":0xA4EF4A,
"2-02 宋画全集 上博藏品":0xD41FAE,
"2-03 宋画全集 辽博藏品":0xDC71AC,
"2-04 宋画全集 台北宋画":0xE7B414,
"2-05 宋画全集 国内散目":0x1D5FF4,
"2-06 宋画全集 欧美藏品":0x79CF6C,
"2-07 宋画全集 日本藏品":0x4CEBE9,
"2-08 宋画全集 续编":0xB8FA8E,
"2-09 宋画全集 俄藏西夏黑水城出土图像":0xA45D71,
"3-01 元画全集 故宫藏品":0x92CA36,
"3-02 元画全集 上博藏品":0x773AC5,
"3-03 元画全集 国内散目":0x5D6D79,
"3-04 元画全集 日本藏品":0x52C7B3,
"3-05 元画全集 欧美藏品":0x7FAD71,
"4-01 明画全集 宫廷绘画":0x148AC9,
"4-02 明画全集 浙派":0x76DC8B,
"4-03 明画全集 早期文人画":0x8DBA2E,
"4-04 明画全集 沈周":0x3E3155,
"4-05 明画全集 文徵明":0xF81E6D,
"4-06 明画全集 唐寅":0xC671A3,
"4-07 明画全集 仇英":0xA83447,
"4-08 明画全集 吴门画家":0x7EE66A,
"4-09 明画全集 陈道复":0x28ABAC,
"4-10 明画全集 徐渭":0x8B3C23,
"4-11 明画全集 董其昌":0xD478CB,
"4-12 明画全集 松江画家":0x87C46D,
"4-13 明画全集 蓝瑛与武林派":0x919A8D,
"4-14 明画全集 丁云鹏等":0x457215,
"4-15 明画全集 陈洪绶":0xC6E54E,
"4-16 明画全集 晚明浙江地区画家（嘉兴画派）":0xE9FEB2,
"4-17 明画全集 明末清初/晚明其他画家（嘉兴画派）":0xEB9ABB,
"4-18 明画全集 其他画家(杂卷）有纪年画家":0x22D5B1,
"4-20 明画全集 佚名作品":0x61A858,
"5-01 清画全集 王时敏":0x4397ED,
"5-02 清画全集 王鉴":0x4CC568,
"5-03 清画全集 王翬与虞山派":0xDA7C83,
"5-04 清画全集 王原祁与娄东派":0x3A6A1C,
"5-05 清画全集 吴历":0x56C69E,
"5-06 清画全集 恽寿平与常州画派":0x1F1662,
"5-07 清画全集 弘仁":0xA6DFA8,
"5-08 清画全集 石溪":0x2BEFB5,
"5-09 清画全集 八大山人":0x98213F,
"5-10 清画全集 石涛":0x99B1FC,
"5-11 清画全集 萧云从与姑孰画派":0x4BC5E2,
"5-12 清画全集 新安名家":0xF44C79,
"5-13 清画全集 梅清与宣城画派":0xE7CCA6,
"5-14 清画全集 龚贤等":0x5C3FDB,
"5-15 清画全集 金陵名家":0x4E998E,
"5-16 清画全集 扬州名家":0x58D8C7,
"5-17 清画全集 扬州名家（界画）":0x1D55E7,
"5-18 清画全集 金石画家":0x4AE1CC,
"5-19 清画全集 吴昌硕":0xB2C1E4,
"5-20 清画全集 海上名家":0xDA77F4,
"5-21 清画全集 海上名家 虚谷":0xCC3CFE,
"5-22 清画全集 海上名家 朱偁、蒲华等":0xD3E388,
"5-23 清画全集 宫廷绘画":0xA45323,
"5-24-1 清画全集 指画派":0x6B9311,
"5-24-2 清画全集 京江画派/南苹画派等":0xCBD1D1,
"5-24-3 清画全集 早中后期其他名家":0x93354D,
"B02 戰國-唐 第2卷 世俗類":0x896BD2,
"B02 戰國-唐 第2卷 宗教卷":0x665742,
"清佚名":0x6249DB,
"书法":0xF7185E,
"宋画":0x79C63F,
"元画":0x7EA55F,
};

// 学科表及其对应颜色
// var groups ={
//   "Arts":0xcccccc,
//   "Biology":0xffcf0a,
//   "Biomedical research":0x00a7f0,
//   "Chemistry":0xe54400,
//   "Clinical medicine":0xb20061,
//   "Earth and space":0xc3ff33,
//   "Engineering and technology":0x4b3ce0,
//   "Health":0x85b44d,
//   "Humanities":0xd19657,
//   "Mathematics":0x938ee0,
//   "Physics":0x00bd7e,
//   "Business and management":0xb7eac3,
//   "Psychology":0x00d3d9,
//   "Social sciences":0xca65ca
// };

// 六篇特别重要的作品
var editSelect = {
  "315207a0":{"title":"Large losses of total ozone in Antarctica reveal seasonal ClOx/NOx interaction", "rt":"ozone"},
  "378355a0":{"title":"A Jupiter-mass companion to a solar-type star", "rt":"jupiter"},
  "359710a0":{"title":"Ordered mesoporous molecular sieves synthesized by a liquid-crystal template mechanism", "rt":"crystal"},
  "171737a0":{"title":"Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid","rt":"dna"},
  "182064a0":{"title":"Sexually Mature Individuals of Xenopus laevis from the Transplantation of Single Somatic Nuclei","rt":"xenopus"},
  "260799a0":{"title":"Single-channel current recorded from membrane of denervated frog muscle fibres","rt":"frog"},
}
var poi = {
 
}

// 相关说明
var instructions = [
  "每一个节点都代表收录在<i>中国历代绘画大系</i>中的作者或作者",
  "两个节点由于时代、分卷分册、材质形制等因素关联",
  "点击可查看节点详细信息及其关联情况",
  "Touch to explore <i>Nature's</i> co-citation network, and uncover science's perception of how the journal's papers relate to each other.",
  "Rotate your device or touch to explore <i>Nature's</i> co-citation network, and uncover science's perception of how the journal's papers relate to each other."
]

// 暂时不知道的四个三维坐标
var cutScene = [
  new THREE.Vector3(-19038.21359420585, 2081.154493722211, -1851.8335397501553),
  new THREE.Vector3(15912.7850472985, 2480.2894740609854, -10528.319168206568),
  new THREE.Vector3(5135.612304514768, 540.0921252341931, -3397.856836838229),
  new THREE.Vector3(-5570.032507698301, 796.8448579538157, 2559.5742742121215)
];

// 这四个貌似没什么用
var tabs = Object.keys(editSelect); //获取对应变量的key值
var tabs = tabs.concat(Object.keys(poi)); //concat连接tabs和poi的key数组
var tabCounter = 0;
var focusOnTabNav = false;

// 这部分和右上角有关，暂时不用管
// 捕捉设备运动事件
var gyroPresent = false;
window.addEventListener("devicemotion", function(event){
  if(gyroSet == false){
    if(event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma ){
        gyroPresent = true;
        gyroSet = true;
        $(".gyro").show();
        $('#toggle-gyro').empty();
        $('#toggle-gyro').append("Device motion on");
        $("#toggle-gyro").show();
        $("#toggle-gyro").css({"display":"inline-block"});
      }
    }
});


// 响应式布局
if(window.innerWidth < 801 || window.innerHeight < 601 || gyroPresent) {
  console.log("mobile");
 mobile = "2_m"
} else {
 mobile = "2";
}

// lightbox添加函数，在html中被引用
intro();
function intro(){
  showBox();
  $("<ul class='intro-cocit'></ul>").appendTo('#lightBox');
  $("<ul class='intro-cocit'></ul>").appendTo('#lightBox');
  $("<ul class='intro-cocit'></ul>").appendTo('#lightBox');
  $("<li>"+instructions[0]+"</li>").hide().appendTo('#lightBox ul:nth-child(1)').delay(1000).fadeIn();
  $("<li><img src='textures/nodes-01.svg' class='journal'/></li>").hide().appendTo('#lightBox ul:nth-child(1)').delay(1000).fadeIn('slow');
  $("<li>"+instructions[1]+"</li>").hide().appendTo('#lightBox ul:nth-child(2)').delay(2000).fadeIn();
  $("<li><img src='textures/network-01.svg' class='journal'/></li>").hide().appendTo('#lightBox ul:nth-child(2)').delay(2000).fadeIn('slow');
  if(gyroPresent){
     $("<li>"+instructions[4]+"</li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn();
     $("<li><img src='textures/device-orient.svg' class='journal'/></li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn('slow');
   }else{
     if(mobile == "2_m"){
       $("<li>"+instructions[3]+"</li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn();
       $("<li><img src='textures/swipe.svg' class='journal'/></li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn('slow');
     }else{
       $("<li>"+instructions[2]+"</li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn();
       $("<li><img src='textures/mouse-lb.svg' class='journal'/></li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn('slow');
     }
   }
  $("<li style='margin-top:20px;'><a href=\javascript:showBox('controls')\ id='ui' style='font-style: italic;border: 1px #999 solid; padding: 5px; display:inline-block; margin-top: 10px;'>更多操作</a></li>").hide().appendTo('#lightBox ul:nth-child(3)').delay(3000).fadeIn();
}

// 显示下方搜索栏的那个旋转箭头模块并且淡出lightbox，并且清空lightbox模块子元素
window.addEventListener( 'mousedown', onMouseDown, false ); //当元素上按下鼠标按钮时触发。
window.addEventListener( 'touchstart', onMouseDown, false ); //触摸事件发生时触发
function onMouseDown(e){  //e就是event的缩写
  var elementId = (e.target || e.srcElement).id; //确定触发事件的元素即鼠标点击的元素，srcelement是考虑到浏览器是IE浏览器的情况
  if(firstClick == false && elementId!="ui"){  //firstClick初始化为false
    $("#info-parent .collapse").show();
   firstClick = true;
  }
  if(lightBoxOn && elementId!="ui" && elementId!="lightBox"){
    $("#lightBox").fadeOut('slow');
    $("#lightBox").delay(1500).empty();
    lightBoxOn = false;
  }
}

//node csv
$.ajax({
  url:'dat/mynode.csv',
  dataType:"text",
  success:function(data,status){
    var tempvalues= data.split('\n');
      for(i=1;i<tempvalues.length-1;i++){
        var tempSplit = tempvalues[i].split(',');
        var tempid = tempSplit[5]; //取论文ID
        // 取x,y坐标，size大小，年份，分类学科和论文名
        var deets = {
          "x":parseInt(tempSplit[0],10), 
          "y":parseInt(tempSplit[1],10),
          "size":parseFloat(tempSplit[2],10),
          "year":tempSplit[3],
          // "type":types[tempSplit[4]],
          "type":tempSplit[4],
          "title":tempSplit[6]
        };
        nodes[tempid] = deets; //生成论文ID-论文信息的键值对
    	}
      // 如果节点和连边都加载完，对应标记变量都为true
      // 则初始化场景
      if(linksLoaded && firstshow){
        
        $(function () {
          setTimeout(function () {
            $(".door").fadeOut('slow'); //实现淡入效果
          }, 6000);
        })
        init();
      }else{
        nodesLoaded = true;
      }
      // 没啥用的两步
      end("nodes");
      console.log(nodes);
  },
});

//edge csv
$.ajax({
  url:'dat/myedge.csv',
  dataType:"text",
  success:function(data){
    var tempvalues= data.split('\n'); //用split函数夹断会在最后留下一个无用数据
  	 for(i=1;i<tempvalues.length;i++){
  		 var tempSplit = tempvalues[i].split(',');
       if(tempSplit[2] != undefined){  // 这里单纯是为了排除最好一个全空行的数据，上面用了.length-1所以没有这个if语句，这里length没有-1
         var ppts = [];
         var pts = tempSplit[2].split("|");
         if(pts.length > 1){
           for(p=0;p<pts.length;p++){
              var v3 = pts[p].split(";");
              // ppts.push({"x":parseInt(v3[0],10),"y":parseInt(v3[1],10),"z":parseInt(v3[2],10)*2});
              ppts.push({"x":parseInt(v3[0],10),"y":parseInt(v3[1],10),"z":parseInt(v3[2],10)});
           }
         }
    		 var deets2 = {
           "points": ppts,
           "source":tempSplit[0],
    			 "target":tempSplit[1]
    		 };
    		 edgelist.push(deets2);
        }
  	 }
     //console.log(longest);
     end("links");
     //console.log(edgelist);
     if(nodesLoaded && firstshow){
       
      $(function () {
        setTimeout(function () {
          $(".door").fadeOut(); //实现淡入效果
        }, 6000);
      })
     init();
     }else{
       linksLoaded = true;
     }
}});

//initialize scene
function init() {
			container = document.getElementById( 'container' );

      // 构建透视摄像机模拟人眼，四个参数为fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，因为45最接近人正常睁眼角度；aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；near表示摄像机视锥体近端面，这个值默认为0.1，实际项目中都会设置为1；far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。
      camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 1000000 );
      if(gyroPresent){  //和右上角有关，暂时不管
        camera.position.set( 0, 500, -1000 );
      }else{
        camera.position.set( 2700, 2500, -8000 );
      }
      //fakeCamera = camera.clone();

      // 创建3D图形对象
      dummy = new THREE.Object3D();
      parent = new THREE.Object3D();

      // 创建场景并设置背景色
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0x050507 );

			renderer = new THREE.WebGLRenderer(); //创建渲染器
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight ); //调整画布大小
			renderer.autoClearColor = true; //自动清楚颜色缓存
			container.appendChild( renderer.domElement ); //domelement是一个canvas，渲染器在其上绘制输出。
			window.addEventListener( 'resize', onWindowResize, false );
      window.addEventListener( 'orientationchange', onWindowResize, false );
      raycaster.params.Points.threshold = 10; //修改了参数1——>10

      //--------------------------------working orbit controls--------------------------------
      // 轨道控制器，可以使得相机围绕目标进行轨道运动。
      controls = new THREE.OrbitControls( camera, renderer.domElement ); //参数是相机和画布
        controls.enableDamping = true; //将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
        // 请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
        // controls.enableDamping = false;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 1000000;
        controls.maxPolarAngle = Math.PI/2;  //相机垂直旋转角度的上限

        // 鼠标缩放阻尼的自定义设置内容
        controls.constraint.smoothZoom = true;
        controls.constraint.zoomDampingFactor = 0.2;
        controls.constraint.smoothZoomSpeed = 5.0;


      //---------------------------------working device orient----------------------------------
      
      
      // 可用于根据移动设备的方向来确定摄像机的方向。
      controlsVR = new THREE.DeviceOrientationControls(dummy); //控制了相机对象dummy

      // 遍历学科分类，用于填充右上角
      // for(t=0; t<types.length; t++){
      //   var tcolor = new THREE.Color(groups[types[t]]);
      //   tcolor = tcolor.getHexString();
      //   $("#legend ul").append("<li style='color:#"+tcolor+"'>"+types[t]+"</li>");
      //   nodeColors[t] = tcolor;
      // }

      //一种使用Sprite的材质。
      //sprite是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理
      //这里就是那个锁定用的白圈对象
      var spmat = new THREE.SpriteMaterial( {

        color: 0xFFFFFF,
				map: new THREE.TextureLoader().load("textures/particle3.png"),
				blending: THREE.AdditiveBlending, //材质混合设置
        depthTest: false,
				transparent: true, //是否透明
        //等于是一个透明的平面贴了一个镂空的白圈贴纸
			} );

      //用该材质创建sprite对象
			spriteInter = new THREE.Sprite( spmat );
			spriteInter.scale.set(50, 50, 1) //物体的局部缩放，默认1，1，1

			parent.add( spriteInter );
      spriteGroup = new THREE.Group(); //它几乎和Object3D是相同的，其目的是使得组中对象在语法上的结构更加清晰。
      parent.add(spriteGroup);


      // 特殊文章的标记label
      editorialmat = new THREE.SpriteMaterial( {
        transparent: true,
        color: 0xffffff,
        map: new THREE.TextureLoader().load("textures/particle4.png"),
      } );

      // 这个材质和对应的sprite等于没有因为设置了不可见
      editorialmatSelect = new THREE.SpriteMaterial( {

        transparent: true,
        color: 0xffffff,
        map: new THREE.TextureLoader().load("textures/particle8.png"),
      } );
      editSprite = new THREE.Sprite( editorialmatSelect );
			editSprite.scale.set(60, 60, 1);
      editSprite.visible = false; //不可视你设置它干嘛


			newSystem();
			animate();
		}

//draw nodes and edges
function newSystem(){
  // var ptct = 0;
  var lineptct = 0;
  var count = 0;
  var sizes= [],
  positions = [],
  colors= [],
  indices = [],
  positionsLines = [],
  colorsLines = [];

  //draw nodes
  
  for(key in nodes){
      var piece = nodes[key];
      if(piece.year != '汉' && piece.year != '金' && piece.year != '汉至隋' && piece.year != '战国'&& piece.year != '隋'&& piece.year != '宋'&& piece.year != '唐'&& piece.year != '元'&& piece.year != '五代'&& piece.year != '清'&& piece.year != '明'){
        console.log('神奇的点')
        console.log(piece)
        continue;
      }
      // if(piece.year != '汉至隋'){
      //   continue
      // }
      // if(piece.year === '宋'){
      //   continue;
      // }
      // if(piece.year === '五代'){
      //   continue;
      // }
      // if(piece.year === '元'){
      //   continue;
      // }
      // if(piece.year === '明'){
      //   continue;
      // }
      // if(piece.year === '清'){
      //   continue;
      // }
      
      // if(piece.year != ''){
      //   continue;
      // }
      // count++;
      // if(count > 3000){
      //   break
      // }
      var pX = piece.x,
          pY = piece.y,
          // pZ = piece.size*20; //z坐标是size*20，不太懂。。。
          pZ = piece.size

      var particle = new THREE.Vector3(pX, pY, pZ);
      if(Number.isNaN(pX) == true){
        console.log(key);
      }if(Number.isNaN(pY) == true){
        console.log(key);
      }if(Number.isNaN(pZ) == true){
        console.log(key);
      }
      positions.push(pX,pY,pZ);
      var color;

      // sizes.push(piece.size*20*(h/1800));
      sizes.push(400);
      color = new THREE.Color(groups[piece.type]);
      colors.push(color.r,color.g,color.b);

      // // 照顾特殊论文
      // if(key in editSelect){
      //   editSelect[key].pos = particle;
      //   addMarker("edit",particle,key);
      //   //var text = loadFont(editSelect[key].title, pX,pY,pZ, key);
      //   //var text = makeTextSprite(editSelect[key].title);
      // }

      // if(key in poi){
      //   poi[key].pos = particle;
      //   addMarker("edit",particle,key);
      // }

      //-------------drawing lines ----------------------

      nodeLabels.push(key);
			nodePositions.push([pX,pY,pZ]);
      nodeGroups[key] = piece.type;

  }

  // var percent;
  // if(useRand){
  //   percent = 1;
  // }else{
  //   percent = randFloat;
  // }

  //draw edges
  // 原本用percent(0.5)去*edgelist.length，估计是为了查看线太多的效果好不好，这里我去掉0.5先
  for(j=0;j<0.3*edgelist.length;j++){
    if(!useRand || rand < randFloat){ //这个判断条件等于没有
        var points = edgelist[j].points; 
        if(nodes[edgelist[j].source] != undefined && nodes[edgelist[j].target]!= undefined && points.length > 0){
          var stype = nodes[edgelist[j].source].type; //取起点的学科
          var ttype = nodes[edgelist[j].target].type; //取终点的学科
          var c;
          if(stype != ttype){
            c = new THREE.Color(0xffffff); // 如果两者学科不一样，则取白色
          }else{
            c = new THREE.Color(groups[stype]); // 如果一样，取对应学科的颜色
          }
          for(q=0;q<points.length; q++){
            if(q<points.length-2){
              indices.push( lineptct, lineptct + 1 );
            }else{
              indices.push( lineptct);
            }
            lineptct++;
            positionsLines.push(points[q].x,points[q].y,points[q].z);
            colorsLines.push(c.r,c.g,c.b);

          }
        }
    }

  }
  console.log("line points: "+lineptct);
  // nodeSizes = sizes;
  console.log("particles drawn: "+count);

  //add geometry to scene 在场景中添加几何体
  particles = new THREE.BufferGeometry();
  // 添加三个属性，属性值由两个参数决定，第一个是数组，第二个是itemSize — 应与特定顶点关联的数组值的数量
  particles.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  particles.addAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
  particles.addAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );

  var uniforms = {
    color: { value: new THREE.Color( 0xffffff ) },
    texture: { value: new THREE.TextureLoader().load( "textures/particle2.png" ) }
  };
  
  // 自定义着色器材质
  var pmaterial = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexshader' ).textContent, //从html中获取顶点着色器代码，这个着色器允许你修改每一个传入的顶点的位置
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent, //从html中获取片元着色器代码，这个着色器定义的是每个传入的像素的颜色
    //blending: THREE.AdditiveBlending,
		//depthTest: false,
		//transparent: true
  } );

  // 创建用于渲染点的类
  particleSystem = new THREE.Points(particles, pmaterial);

  // 这个地方一定要小心，我自己的设计不一定要旋转
  particleSystem.rotation.x = Math.PI / -2  //局部旋转一定的弧度
  particleSystem.name = "points";
  parent.add(particleSystem);

  
  // 添加线的几何构造
  var lines = new THREE.BufferGeometry();
  lines.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1)); 
  //  [0,1,1,2,2,....n-1,n-1,n]
  // 因为渲染是从0-1，1-2，2-3这样实施的
  lines.addAttribute( 'position', new THREE.Float32BufferAttribute( positionsLines, 3 ) );
  lines.addAttribute( 'color', new THREE.Float32BufferAttribute( colorsLines, 3 ) );
  lines.computeBoundingSphere(); //计算当前几何体的边界球形
  var lineMaterial = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors, transparent: true, opacity: 0.2});
  var lineSegments = new THREE.LineSegments(lines, lineMaterial);
  lineSegments.rotation.x = Math.PI / -2 // 同样此处也和点的几何集合体旋转了一样的弧度
  parent.add( lineSegments );  // 加入parent
  scene.add(parent);  // parent加入整个场景对象
  end("draw");
}

//add sprites and lines over featured nodes 在特色节点上添加精灵和线条
// function addMarker(markerType,markerPos,markId){
//   var marker = new THREE.Sprite(editorialmat);
// 	marker.scale.set(80, 80, 1);
//   marker.position.set(markerPos.x,markerPos.z+256,-markerPos.y);
//   spriteGroup.add(marker);
//   marker.name = markId;
//   //console.log (markerPos, marker.position);
//   var markerLine = new THREE.Geometry();
//   markerLine.vertices.push(
//   	new THREE.Vector3(markerPos.x,markerPos.z,-markerPos.y),
//   	new THREE.Vector3(markerPos.x,markerPos.z+230,-markerPos.y)
//   );
//   var markLineMat = new THREE.LineBasicMaterial({color:editorialmat.color});
//   var ml = new THREE.Line( markerLine, markLineMat );
//   ml.name = markId;
//   spriteGroup.add( ml);
// 	parent.add( spriteGroup );
// }

//add floating 3d text labels
// 添加3d漂浮文字说明标签，貌似放弃制作了
function loadFont(message,pX,pY,pZ,key){
  var loader = new THREE.FontLoader();
		loader.load( 'js/vendor/garamond.json', function ( font ) {
			var xMid, text;
			var color = 0xffffff;
			var matDark = new THREE.LineBasicMaterial( {
				color: color,
				side: THREE.DoubleSide
			} );
			var matLite = new THREE.MeshBasicMaterial( {
				color: color,
				transparent: true,
				opacity: 0.4,
				side: THREE.DoubleSide
			} );
			var shapes = font.generateShapes( message, 50 );
			var geometry = new THREE.ShapeBufferGeometry( shapes );
			geometry.computeBoundingBox();
			xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
			geometry.translate( xMid, 0, 0 );
			// make shape ( N.B. edge view not visible )
			text = new THREE.Mesh( geometry, matLite );
      var labelLength = message.length;
      text.position.set(pY,pZ+300,pX);
      //text.rotation.z = Math.PI/2;
      text.name = key;
      text.Y = pY;
      parent.add( text );
		} );
}

function toggleGyro(){
  if(gyroPresent){
    gyroPresent = false;
    $('#toggle-gyro').empty();
    $('#toggle-gyro').append("Device motion off");
  }else{
    gyroPresent = true;
    $('#toggle-gyro').empty();
    $('#toggle-gyro').append("Device motion on");
  }
}

//animate
function animate() {
	requestAnimationFrame( animate );  //该语句实现了本函数在整个页面运行期间的递归调用，最为重要
  controls.update();
  //右上角部分
  // if(gyroPresent){
  //   controlsVR.update();
  //   //get offset of dummy
  //   var rotationOffset = dummy.quaternion.clone().inverse();
  //   //change to be relative to dummy
  //   //var rotation = dummy.quaternion.clone().multiply( rotationOffset );
  //   //convert to euler
  //   var re = new THREE.Euler().setFromQuaternion( rotationOffset, 'XZY');
  //   re = new THREE.Euler(re.x*-1,re.y,re.z);
  //   //var cp = dummy.rotation;
  //   //var final = new THREE.Euler(cp.x+re.x, cp.y+re.y, cp.z-re.z);
  //   parent.setRotationFromEuler(re);
  // }
	render();
  //if spin is true, spin scene
  //自动旋转，不能开，开了选点会发生偏移
  if(spin){
    scene.rotation.y += 0.0001;
  }

  // 用于刷新白色锁定圈尺寸
  if(pulse == true){
    if(spriteInter.scale.x < (spriteSize + 50)){
      var si = spriteInter.scale.x += 0.25;
      spriteInter.scale.set(si,si,1)
    }else{pulse = false;}
  }
  else{
    if(spriteInter.scale.x > (spriteSize)){
      var si = spriteInter.scale.x -= 0.25;
      spriteInter.scale.set(si,si,1)
    }else{pulse = true;}
  }

  //if cam Move is true, move to cam dest
  //如果相机移动为真，则移动到相机目的地
  if(camMove){
    if(camera.position.distanceTo(camDest) > 10){
      camera.position = camera.position.lerp(camDest,0.05);
    }else{
      camMove = false;
    }
  }

  // //orient labels to camera along y axis.
  // for(i=3;i<scene.children.length;i++){
  //   var rot = new THREE.Vector3();
  //   rot.subVectors(scene.children[i].position, camera.position).normalize();
  //   //scene.children[i].quaternion.setFromUnitVectors(new THREE.Vector3(0.5,0.5,0),rot);
  //   scene.children[i].rotation.y = -Math.PI * rot.x;
  //   scene.children[i].rotation.z = Math.PI/2;
  // }
}

//render
function render() {
  renderer.render( scene, camera );
}

//search for paper by string in title
// function search(string){
//   console.log(string);
//   $('#info').empty();
//   var list = "<ul>"
//   for(n in nodes){
//     if(nodes[n].title.includes(string)){
//       list+="<li tabindex='0' onclick=\zoomTo('"+n.toString()+"')\>"+nodes[n].title+"</li>"
//     }
//   }
//   list+="</ul>"
//   $('#info').append(list);
// }

//move camera to paper by node id 移动相机聚焦到指定节点
function zoomTo(n){
  var zp = new THREE.Vector3(nodes[n].x,nodes[n].size/2, -nodes[n].y);

  // 如果是特殊文章/普通文章，将坐标赋值给锁定圈
  if(editSelect[n]!= undefined || poi[n]!=undefined){
    var ob = scene.getObjectByName(n);
    spriteInter.position.copy(ob.position);
  }else{
    spriteInter.position.set(zp.x,zp.y,zp.z);
  }
  var zpn = zp.clone();
  zpn.normalize(); // 转化成单位向量
  camDest = new THREE.Vector3(zp.x + zpn.x*3500, zp.y + 400, zp.z + zpn.z*3500);  //根据目标节点的位置调整相机的位置
  camMove = true; //设置相机可移动
}

//called when clicking on container div
//在点击容器中的div时被调用
function onClick(){
  raycaster.setFromCamera( mouse, camera ); //使用一个新的原点和方向来更新射线。

  //检测所有在射线与物体之间，包括或不包括后代的相交部分。返回结果时，相交部分将按距离进行排序，最近的位于第一个）
  //该方法返回一个包含有交叉部分的数组:
  //这里筛选的对象是particlesystem（包含所有节点信息的对象）和spritegroup，一次筛两个所以这里用了数组
  //第二个spritegroup可以考虑删除
  intersects = raycaster.intersectObjects([scene.getObjectByName("points"),spriteGroup], true);
  //poiSprite.visible = false;
  //editSprite.visible = false;

  if(intersects.length > 0){
    // console.log("raycast: "+intersects[0]);
    var node;
    var ix;
    //spriteInter.visible = true;
    //camDest = editSelect[intersects[ 0 ].object.name.trim()].pos;
    //camMove = true;
      if(intersects[0].object.type == "Points"){
        // console.log(particleSystem);
        ix = nodeLabels[intersects[0].index]; //得到节点ID，这里确实能从particlesystem筛选出来那个用于下标的index
        node = nodes[ix]; //根据ID取得对应节点信息
      } 
      // 如果对象是锁定圈
      if(intersects[0].object.type == "Sprite"){
        console.log("sprite:"+intersects[0].index+"xxx"+intersects[0].object.name);
        ix = intersects[0].object.name;
        node = nodes[ix];
        // if(poi[ix]!=undefined){
        //   poiSprite.position.copy(intersects[0].object.position);
        //   poiSprite.visible = true;
        // }else{
        //   editSprite.visible = true;
        //   editSprite.position.copy(intersects[0].object.position);
        // }
      }

      // 修改锁定圈的位置和大小
      spriteInter.position.copy(intersects[0].point);
      spriteSize = node.size*h/1800;
      spriteInter.scale.set(spriteSize+25,spriteSize+25,1);

      // 如果node不为空，也就是鼠标没点击空处
      if(node !=undefined){
        var c = new THREE.Color(groups[node.type]); //取对应颜色作为参数
        c = c.getHexString();
        console.log(ix)
        updateInfo(ix, c, node);  // 刷新检索栏，移动相机
      }
  }else {
    //spriteInter.visible = false;
  }
}

//get mouse x and y
function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
  //在归一化设备坐标中计算鼠标位置
  //(-1到+1)
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  console.log('111')
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight; //修改摄像机视锥体的长宽比
	camera.updateProjectionMatrix(); //更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
	renderer.setSize(window.innerWidth, window.innerHeight ); //修改画布大小
}

window.addEventListener( 'mousemove', onMouseMove, false );  // 实时更新鼠标位置
document.getElementById("container").addEventListener( 'click', onClick, false ); // 监听点击事件

$(".door").fadeOut(10000); //实现淡入效果
        
$(function () {
    setTimeout(function () {
      init();
    }, 7000);
})