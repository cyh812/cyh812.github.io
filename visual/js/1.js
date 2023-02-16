
$.ajax({
    url:'dat/cociteEdges.csv',
    dataType:"text",
    success:function(data){
        console.log('0');
      var tempvalues= data.split('\n');
      console.log(tempvalues[239622]);
         for(i=1;i<tempvalues.length;i++){
             var tempSplit = tempvalues[i].split(',');
         if(tempSplit[2] == null){
           console.log(tempSplit[0]);
           console.log(i)
           break;
         }
    }

    console.log('1');
    }
}
)

