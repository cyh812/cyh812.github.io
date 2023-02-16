

// function makeJsonFile(filename){
//   scale = 1.0;
//   name1 = filename;
//   edgelist = [];
//   //scene.children[2].children.forEach(checkSceneChildren);
//   info={
//     "A":1.0,
//     "links":{"weighted":0,"segs":20,"labels":linkLabels,"T0":0.5,"thickness":0.3,"max_workers":50,"Temp0":0.0,"ce":10.0, "amplitude":0.3,"k":0.1},
//     "n_radius":1.0,
//     "pow": 2,
//     "k": 0.1,
//     "nodes":{"radius":1.0,"amplitude":0.3, "weighted": 0, },
//     "long_rep": 0.03432222592469177,
//   };
//   nodes = {"groups":nodeGroups, "colors":nodeColors, "positions":nodePositions,"labels":nodeLabels, "sizes": nodeSizes};
//   downloadFile();
// }

// function checkSceneChildren(item){
//   // console.log(item);
//   if(item.geometry.type == "SphereGeometry"){
//     var pos =[];
//     pos.push(item.position.x);
//     pos.push(item.position.y);
//     pos.push(item.position.z);
//     nodeLabels.push(item.__data.id);
//     nodePositions.push(pos);
//   }else if(item.geometry.type == "CylinderGeometry"){
//     var radius = item.geometry.parameters.radiusTop;
//     var points = [];
//     var nix1 = nodeLabels.indexOf(item.__data.source.id);
//     var nix2 = nodeLabels.indexOf(item.__data.target.id);
//     points.push(nodePositions[nix1]);
//     points.push(nodePositions[nix2]);
//     var endpt = [nodeLabels.indexOf(item.__data.source.id), nodeLabels.indexOf(item.__data.target.id)];
//     links[item.__data.source.id+","+item.__data.target.id] = {"end_points":endpt,"points":points, "radius": radius, "weight": 0.1};
//   }
//   else if(item.geometry.type == "BufferGeometry"){

//   }
// }

// function downloadFile(){
//   var jsondata = {"info":info,"name":name1,"links":links,"edgelist":edgelist,"nodes":nodes};
//   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsondata));
//   var dlAnchorElem = document.getElementById('downloadAnchorElem');
//   dlAnchorElem.setAttribute("href",dataStr);
//   dlAnchorElem.setAttribute("download", name1+".json");
//   dlAnchorElem.click();
// }
