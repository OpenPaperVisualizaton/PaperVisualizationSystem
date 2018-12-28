
var forceLayoutOption = {
    // title: {
    //     text: 'Community Detection',

    // },

    color: ['#666', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    backgroundColor: '#eee',
    series: [
        {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            // data: graph.nodes,
            // links: graph.links,
            categories: [
                {}
            ],
            roam: true,
            label: {
                emphasis: {
                    show: true
                }
            },
            force: {
                repulsion: 50
            }
        }
    ]
};

var forceLayoutChart = echarts.init(document.getElementById('community_layout'));

forceLayoutChart.setOption(forceLayoutOption);



function forceLayoutInit() {
    communityDataGet();

}

function communityDataGet() {
    $.ajax({
        type: "POST",  //提交方式
        url: "php/communitydata.php",//路径,www根目录下
        success: function (result) {//返回数据根据结果进行相应的处理
            var data = eval(result);
            // console.log(data.length);
            var nodeData = data[0];
            var linkData = data[1];
            var categoryData = data[2];
            // console.log(nodeData.length,linkData.length,categoryData.length);
            nodeDataLoad(nodeData);
            categoryLoad(categoryData);
            forceLayoutChart.setOption(forceLayoutOption);
            linkDataLoad(linkData);
            forceLayoutChart.setOption(forceLayoutOption);
            nodeClick();

        }
    });
}

function nodeDataLoad(data) {
    var optionData = [];
    for (var i = 0; i < 1000; i++) {
        var node = {};
        node.name = data[i].author_name;
        node.value = parseInt(data[i].num);
        node.symbolSize = node.value;
        node.category = data[i].community.toString();
        if (i < 10) {
            var label = {};
            label.show = true;
            label.position = 'top';
            node.label = label;
        }
        optionData.push(node);
    }
    forceLayoutOption.series[0].data = optionData;
}

function linkDataLoad(data) {
    var optionLinks = [];
    for (var i = 0; i < data.length; i++) {
        var link = {};
        link.source = data[i].head;
        link.target = data[i].target;
        link.value = data[i].num;
        var lineStyle = {}
        lineStyle.color = '#ccc';
        link.lineStyle = lineStyle;
        optionLinks.push(link);
    }
    forceLayoutOption.series[0].links = optionLinks;
}

function categoryLoad(data) {
    var optionCategory = [];
    for (var i = 0; i < 20; i++) {
        var c = {};
        c.name = data[i].community;
        optionCategory.push(c);
    }
    forceLayoutOption.series[0].categories = optionCategory;
}

function nodeClick() {
    forceLayoutChart.on('click', function (param) {
        if (param.dataType == 'node') {
            article_list('all', param.data.name, 'all');
            authorInformationInit(param.data.name);
        }

    });
}