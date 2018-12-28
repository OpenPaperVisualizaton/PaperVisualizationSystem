

var locationChart = echarts.init(document.getElementById('worldmap'));

// // 指定图表的配置项和数据
// var convertData = function (data) {
//     var res = [];
//     for (var i = 0; i < data.length; i++) {


//         res.push({
//           name:data[i].name,
//           value:[data[i].lng,data[i].lat,1]
//         });
//     }
//     return res;
// };

var locationOption = {
    backgroundColor: '#404a59',
    title: {
        text: '',

        left: 'center',
        top: 'top',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            // var value = (params.value + '').split('.');
            // value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            //         + '.' + value[1];
            return params.name + ' : ' + params.value[2];
        }
    },
    visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
            symbolSize: [6, 60]
        }
    },
    geo: {
        name: 'affiliation location',
        type: 'map',
        map: 'world',
        roam: true,
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            // data: convertData(loaction_data)
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。


function locationInit(key) {
    locationDataGet(key);
}

function locationDataGet(key) {
    $.ajax({
        type: "POST",  //提交方式
        url: "php/aff_location.php",//路径,www根目录下
        data:{
            "key":key
        },
        success: function (result) {//返回数据根据结果进行相应的处理
            var data = eval(result);
            locationDataLoad(data);
            locationChart.setOption(locationOption);
            scatterClick();
        }
    });
}

function locationDataLoad(data) {
    var scatterData = [];
    for (var i = 0; i < data.length; i++) {
        scatterData.push({
            name: data[i].affiliation,
            value: [data[i].lng, data[i].lat, data[i].num]
        });
    }
    locationOption.series[0].data = scatterData;
}

function scatterClick() {
    locationChart.off('click');
    locationChart.on('click', function (param) {
        console.log(param);
        if (param.componentType == 'series') {
            paramList.author[1] = param.data.name;
            author_list(paramList.author[0], paramList.author[1], paramList.author[2][paramList.author[3]]);
            console.log(param.data.name);
            article_list(keyFlag, 'all', param.data.name);

            affiliationInformationInit(param.data.name);
        }
    });
}