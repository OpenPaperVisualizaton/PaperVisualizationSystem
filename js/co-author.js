
var coauthorChart = echarts.init(document.getElementById('egoEvolution'));

var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'];
var days = ['Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

data = data.map(function (item) {
    return [item[1], item[0], item[2]];
});


var coauthorOption = {
    tooltip: {
        position: 'top',
        formatter: function (params) {
            return 'Paper num:' + params.value[2]
        }
    },
    animation: false,
    grid: {
        left: '20%',
        right: '3%',
        contaninLable: true
    },
    xAxis: {
        type: 'category',
        data: hours,
        position: 'top',

        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        boundaryGap: false,
        splitLine: {
            show: true,
            LinkStyle: {
                type: 'dashed'
            }
        },
        triggerEvent: true,
        inverse: true
    },

    series: [{
        name: 'Paper Num',
        type: 'scatter',
        // data: data,
        symbolSize: function (val) {
            return Math.pow(val[2], 0.75) * 5;
        },
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

// coauthorChart.setOption(coauthorOption);
// var coauthorChart = echarts.init(document.getElementById('egoEvolution'));
// var coauthorOption = {

//     tooltip : {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'cross',
//             label: {
//                 backgroundColor: '#6a7985'
//             }
//         }
//     },
//     legend: {
//         data:['搜索引擎','邮件营销','联盟广告','视频广告','直接访问',]
//     },
//     toolbox: {
//         feature: {
//             saveAsImage: {}
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis : [
//         {
//             type : 'category',
//             boundaryGap : false,
//             data : ['周一','周二','周三','周四','周五','周六','周日']
//         }
//     ],
//     yAxis : [
//         {
//             type : 'value'
//         }
//     ],
//     series : [
//         {
//             name:'搜索引擎',
//             type:'line',
//             stack: '总量',
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'top'
//                 }
//             },
//             areaStyle: {normal: {}},
//             data:[820, 932, 901, 934, 1290, 1330, 1320]
//         },
//         {
//             name:'邮件营销',
//             type:'line',
//             stack: '总量',
//             areaStyle: {normal: {}},
//             data:[120, 132, 101, 134, 90, 230, 210]
//         },
//         {
//             name:'联盟广告',
//             type:'line',
//             stack: '总量',
//             areaStyle: {normal: {}},
//             data:[220, 182, 191, 234, 290, 330, 310]
//         },
//         {
//             name:'视频广告',
//             type:'line',
//             stack: '总量',
//             areaStyle: {normal: {}},
//             data:[150, 232, 201, 154, 190, 330, 410]
//         },
//         {
//             name:'直接访问',
//             type:'line',
//             stack: '总量',
//             areaStyle: {normal: {}},
//             data:[320, 332, 301, 334, 390, 330, 320]
//         },

//     ]
// };
// coauthorChart.setOption(coauthorOption);


//egoNetwork
var egoNetworkChat = echarts.init(document.getElementById('egoNetwork'));
var egoWidth = $('#egoNetwork').width();
var egoHeight = $('#egoNetwork').height();
var egoX = egoWidth / 2;
var egoY = egoHeight / 2;
var egoRadius = (egoWidth > egoHeight ? egoHeight : egoWidth) * 0.45;


var egoNetworkOption = {

    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 10,

            data: [{
                name: '节点1',
                x: 100,
                y: 300
            }, {
                name: '节点2',
                x: 800,
                y: 300
            }, {
                name: '节点3',
                x: 550,
                y: 100
            }, {
                name: '节点4',
                x: 550,
                y: 500
            }],
            label: {
                show: true,
                position: 'top'
            },
            links: [{
                source: 0,
                target: 1,
            }, {
                source: '节点2',
                target: '节点1',
            }, {
                source: '节点1',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点4'
            }, {
                source: '节点1',
                target: '节点4'
            }],
            lineStyle: {
                normal: {
                    color: '#c23531',
                    opacity: 0.9,
                    width: 5,
                },
            }
        }
    ]
};



function coauthorViewInit(name) {
    coauthorDataGet(name);
}



function coauthorDataGet(name) {
    $.ajax({
        type: "POST",  //提交方式
        data: {
            "name": name
        },
        url: "php/ego_network.php",//路径,www根目录下
        success: function (result) {//返回数据根据结果进行相应的处理
            var data = eval(result);
            // egoEvolutionDataLoad(data); 
            egoNetworkDataLoad(data[1]);
            coauthorDataLoad(data);
            coauthorChart.setOption(coauthorOption, true);
            egoNetworkChat.setOption(egoNetworkOption, true);
            egoViewClick();
        }
    });
}

// function egoEvolutionDataLoad(data){
//     console.log(data);
//     var legendData=[];
//     var lengthLength = data[2].length;
//     for(var i=0;i<lengthLength;i++){
//         legendData.push(data[0][i].author_name);
//     }
//     coauthorOption.legend.data = legendData;

//     var xAxisData=[];
//     for(var i=0;i<data[1].length;i++){
//         xAxisData.push(data[1][i].year);
//     }
//     coauthorOption.xAxis[0].data = xAxisData;

//     var seriesOption=[];
//     for(var i=0;i<data[2].length;i++){
//         var seriesItem={
//             name:'',
//             type:'line',
//             stack: '总量',
//             areaStyle: {normal: {}},
//             data:[]
//         };
//         var itemData=[];
//         for(var j=0;j<xAxisData.length;j++){
//             itemData.push(0);
//         }
//         var itemPaper=data[2][i];
//         console.log(itemPaper);
//         for(var k=0;k<itemPaper.length;k++){
//             var index=xAxisData.indexOf(itemPaper[k].year);
//             itemData[index]=itemPaper[k].num;
//         }
//         seriesItem.data=itemData;
//         seriesItem.name=data[2][i][0].author_name;
//         seriesOption.push(seriesItem);
//     }
//     coauthorOption.series=seriesOption;
// }

function egoNetworkDataLoad(data) {
    var nodeData = [];
    var linkData = [];

    var linkNum = (data.length - 1) > 20 ? 20 : (data.length - 1);
    for (var i = 0; i <= linkNum; i++) {
        var node = {};
        node.name = data[i].author_name;
        node.value = data[i].num;
        // if (i > 0 && i < 6) {
        //     var itemStyle = {};
        //     itemStyle.color = '#ca8622';
        //     node.itemStyle = itemStyle;
        // }

        if (i == 0) {
            node.x = egoX;
            node.y = egoY;
            // var label = {};
            // label.show = false;
            // node.label = label;
        }
        else {
            var angle = Math.PI * 2 / linkNum;
            node.x = egoX + egoRadius * Math.cos((i - 1) * angle);
            node.y = egoY - egoRadius * Math.sin((i - 1) * angle);
        }
        nodeData.push(node);
    }

    for (var i = 1; i <= linkNum; i++) {
        var link = {};
        link.source = data[0].author_name;
        link.target = data[i].author_name;
        // if(i<6){
        //     var lineStyle={};
        //     lineStyle.color='#ca8622';
        //     link.lineStyle=lineStyle;
        // }
        linkData.push(link);

    }
    egoNetworkOption.series[0].data = nodeData;
    egoNetworkOption.series[0].links = linkData;
}


function coauthorDataLoad(data) {
    //   console.log(data);
    var xData = [], yData = [];
    for (var i = 0; i < data[2].length; i++) {
        xData.push(data[2][i].year);
    }
    // for(var i=0;i<data[1].length;i++){
    for (var i = 0; i < 6; i++) {
        yData.push(data[1][i].author_name);
    }
    //   console.log(xData,yData);
    coauthorOption.xAxis.data = xData;
    coauthorOption.yAxis.data = yData;
    //导入点数据
    authorEgoNodeData = data[0];
    var vector = [];
    for (var i = 0; i < data[2].length; i++) {
        for (var j = 0; j < data[1].length; j++) {
            var item = [i, j, 0];
            vector.push(item);
        }
    }
    for (var i = 0; i < data[0].length; i++) {
        var xIndex = xData.indexOf(data[0][i].year);
        var yIndex = yData.indexOf(data[0][i].author_name);
        var dataIndex = xIndex * data[1].length + yIndex;
        if (xIndex != -1 && yIndex != -1)
            vector[dataIndex] = [xIndex, yIndex, data[0][i].num];
    }
     console.log(vector);
    coauthorOption.series[0].data = vector;
}

function egoViewClick() {
    coauthorChart.off('click');
    coauthorChart.on('click', function (params) {
        if (params.componentType == "yAxis") {
            var fName = coauthorOption.yAxis.data[0];
            var sName = params.value;
            console.log(fName, sName);
            twoAuthorArticle(fName, sName, 0);
        }
        else if (params.componentType == "series") {

            var year = coauthorOption.xAxis.data[params.data[0]];
            var fName = coauthorOption.yAxis.data[0];
            var sName = coauthorOption.yAxis.data[params.data[1]];
            console.log(fName, sName);
            twoAuthorArticle(fName, sName, year);
        }
    });

    egoNetworkChat.off('click');
    egoNetworkChat.on('click', function (params) {
        console.log(params);
        if (params.dataType == 'node') {
            if (params.data.name != authorStack[authorStack.length - 1])
                article_list('all', params.data.name, 'all');
            authorInformationInit(params.data.name);
        }
        // else if(params.dataType=='edge'){
        //     if(params.color=='#c23531'){
        //         addEdge(params);
        //     }
        //     else if(params.color=='#ca8622'){
        //         remove(params);
        //     }
        // }
    });
}

function addEdge(params) {
    var color = '#ca8622';
    egoChangeColor(params, color);
    var yData = coauthorOption.yAxis.data;
    yData.push(params.data.target);
    rebuiltCoauthorView(yData);
}

function remove(params) {
    var color = '#c23531';
    egoChangeColor(params, color);
}

function egoChangeColor(params, color) {
    var lineStyle = {};
    lineStyle.color = color;
    egoNetworkOption.series[0].links[params.dataIndex].lineStyle = lineStyle;
    var target = params.data.target;
    var nodeIndex = params.dataIndex + 1;
    var itemStyle = {};
    itemStyle.color = color;
    egoNetworkOption.series[0].data[nodeIndex].itemStyle = itemStyle;
    egoNetworkChat.setOption(egoNetworkOption, true);
}

function rebuiltCoauthorView(data) {
    console.log(data);
}
//#ca8622 yellow
//#c23531 red


function twoAuthorArticle(fName, sName, year) {
    $.ajax({
        type: "POST",  //提交方式
        url: "./php/twoAuthor.php",//路径,www根目录下
        data: {
            "fName": fName,
            "sName": sName,
            "year": year
        },//数据，这里使用的是Json格式进行传输
        success: function (result) {//返回数据根据结果进行相应的处理

            var data = eval(result);
            $('#article_list').html('');
            $('#article_list').append('<ul class="list-group"></ul>');
            for (var i in data) {
                $('#article_list ul').append('<li class="list-group-item"><p>' + data[i].paper_title + '</p>' + '<p>' + data[i].author_name + '</p>' + '<p><span>' + data[i].year + '&nbsp&nbsp&nbsp&nbsp</span><span><a href="' + data[i].link + '" target="view_window">link</a></span><span>&nbsp&nbsp&nbsp&nbspcitation:' + data[i].citation + '</span></p>' + '</li>');
            }

        }
    });
}