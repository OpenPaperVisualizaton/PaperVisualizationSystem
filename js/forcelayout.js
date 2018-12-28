
 var forceLayoutOption = {
        title: {
            text: 'Les Miserables',

        },

        

        series : [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'force',
                // focusNodeAdjacency: true,
                // data: graph.nodes,
                // links: graph.links,

                roam: true,
                label: {
                    normal: {
                        position: 'top'
                    }
                },
                force: {
                    repulsion: 50
                }
            }
        ]
    };

var forceLayoutChart = echarts.init(document.getElementById('force_layout'));

forceLayoutChart.setOption(forceLayoutOption);

function forceLayoutInit(){
    var key=arguments[0] ? arguments[0] : 'all';
    forceNodesGet(key);
}

function forceNodesGet(key) {
    $.ajax({
        type : "POST",  //提交方式
        url : "php/force_layout_node.php",//路径,www根目录下
        data : {
            "key" : key
        },//数据，这里使用的是Json格式进行传输
        success : function(result) {//返回数据根据结果进行相应的处理
            console.log(result);
            if(result=='null') 
                console.log('none node');
            else {
                var data=eval(result);
                forceNodesLoad(data);
                forceLinksGet(key);
            }
        }
    });
}



function forceLinksGet(key){
    $.ajax({
        type : "POST",  //提交方式
        url : "php/force_layout_link.php",//路径,www根目录下
        data : {
            "key" : key
        },//数据，这里使用的是Json格式进行传输
        success : function(result) {//返回数据根据结果进行相应的处理
            
            if(result=='null') 
                console.log('none link');
            else {
                var data=eval(result);
                forceLinksLoad(data);
            }
        }
    });   
}


function forceNodesLoad(data) {
    var nodeData=[];
    for(var i=0;i<1000;i++){
        var node={};
        node.name=data[i].author_name;
        node.value=parseInt(data[i].num);
        node.symbolSize=node.value;
        if(i<10){
            var label = {};
            label.show = true;
            label.position = 'top';
            node.label = label;
        }

        nodeData.push(node);
    }
    forceLayoutOption.series[0].data=nodeData;
    
}

function forceLinksLoad(data){
    var linkData=[];
 //   console.log(data);
    for(var i=0;i<data.length;i++){
        var authors=data[i].author_name.split(';');
        for(var j=0;j<authors.length-1;j++){
            for(var k=j+1;k<authors.length;k++){
                var link={};
                link.source=authors[j];
                link.target=authors[k];
                linkData.push(link);
            }
        }
    }
 //   console.log(linkData);
    forceLayoutOption.series[0].links=linkData;

    forceLayoutChart.setOption(forceLayoutOption);
}