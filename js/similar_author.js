
var parallelChart = echarts.init(document.getElementById('parallel'));

var dataBJ = [
    [1, 55, 9, 56, 0.46, 18, 6, "良"],
    [2, 25, 11, 21, 0.65, 34, 9, "优"],
    [3, 56, 7, 63, 0.3, 14, 5, "良"],
    [4, 33, 7, 29, 0.33, 16, 6, "优"],
    [5, 42, 24, 44, 0.76, 40, 16, "优"],
    [6, 82, 58, 90, 1.77, 68, 33, "良"],
    [7, 74, 49, 77, 1.46, 48, 27, "良"],
    [8, 78, 55, 80, 1.29, 59, 29, "良"],
    [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
    [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
];



var schema = [
    { name: 'date', index: 0, text: '日期' },
    { name: 'AQIindex', index: 1, text: 'AQI' },
    { name: 'PM25', index: 2, text: 'PM2.5' },
    { name: 'PM10', index: 3, text: 'PM10' },
    { name: 'CO', index: 4, text: ' CO' },
    { name: 'NO2', index: 5, text: 'NO2' },
    { name: 'SO2', index: 6, text: 'SO2' },
    { name: '等级', index: 7, text: '等级' }
];

var lineStyle = {
    normal: {
        width: 2.5,
        opacity: 0.95
    }
};

var parallelOption = {
    legend: {
        bottom: 30,
        data: ['北京', '上海', '广州'],
        itemGap: 20,
        // textStyle: {
        //     color: '#fff',
        //     fontSize: 14
        // }
    },
    // tooltip: {
    //     padding: 10,
    //     backgroundColor: '#222',
    //     borderColor: '#777',
    //     borderWidth: 1,
    //     formatter: function (obj) {
    //         var value = obj[0].value;
    //         return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
    //             + obj[0].seriesName + ' ' + value[0] + '日期：'
    //             + value[7]
    //             + '</div>'
    //             + schema[1].text + '：' + value[1] + '<br>'
    //             + schema[2].text + '：' + value[2] + '<br>'
    //             + schema[3].text + '：' + value[3] + '<br>'
    //             + schema[4].text + '：' + value[4] + '<br>'
    //             + schema[5].text + '：' + value[5] + '<br>'
    //             + schema[6].text + '：' + value[6] + '<br>';
    //     }
    // },
    // dataZoom: {
    //     show: true,
    //     orient: 'vertical',
    //     parallelAxisIndex: [0]
    // },
    parallelAxis: [
        { dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start' },
        { dim: 1, name: schema[1].text },
        { dim: 2, name: schema[2].text },
        { dim: 3, name: schema[3].text },
        { dim: 4, name: schema[4].text },
        { dim: 5, name: schema[5].text },
        { dim: 6, name: schema[6].text },
        {
            dim: 7, name: schema[7].text,
            type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
        }
    ],
    // visualMap: {
    //     show: true,
    //     min: 0,
    //     max: 150,
    //     dimension: 2,
    //     inRange: {
    //         color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
    //         // colorAlpha: [0, 1]
    //     }
    // },
    parallel: {
        top:50,
        left: '5%',
        right: '20%',
        bottom: 100,
        parallelAxisDefault: {
            type: 'value',
            nameLocation: 'end',
            nameRotate: 10,
            nameTextStyle: {
                fontSize: 12
            },
            nameTruncate: {
                maxWidth: 130
            },
            nameGap: 20,
            tooltip: {
                show: true
            },
            triggerEvent:true
            // axisLine: {
            //     // show: false,
            //     lineStyle: {
            //         width: 1,
            //         color: 'rgba(255,255,255,0.3)'
            //     }
            // },
            // axisTick: {
            //     show: false
            // },
            // splitLine: {
            //     show: false
            // },
            // z: 100
        }
    },
    series: [
        {
            name: '北京',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataBJ
        },
        // {
        //     name: '上海',
        //     type: 'parallel',
        //     lineStyle: lineStyle,
        //     data: dataSH
        // },
        // {
        //     name: '广州',
        //     type: 'parallel',
        //     lineStyle: lineStyle,
        //     data: dataGZ
        // }
    ]
};



function similarViewInit(name) {
    similarDataGet(name);

}

function similarDataGet(name) {
    $.ajax({
        type: "POST",  //提交方式
        data: {
            "name": name
        },
        url: "php/similar_author.php",//路径,www根目录下
        success: function (result) {//返回数据根据结果进行相应的处理
            var d = eval(result);
            var data = d[0];
            // console.log(data);
            similarContainerInit(data);
            parallelViewInit(data);

        }
    });
}

function parallelViewInit(data) {
    var lengendData = [];
    var nameString = data.similar;
    var nameArr = nameString.split(',');
    for (var i = 0; i < 7; i++) {
        lengendData.push(nameArr[i]);
    }
    parallelOption.legend.data = lengendData;

    var parallelAxis = [];
    var categoryString = data.category;
    var categoryArr = categoryString.split('||');
    for (var i = 0; i < categoryArr.length; i++) {
        parallelAxis.push({
            dim: i,
            name: categoryArr[i],
            max: 1,
            nameTextStyle:{

            }
        });
    }
    parallelOption.parallelAxis = parallelAxis;


    var series = [];
    var arrData = eval(data.data_array);
    // console.log(arrData);
    series.push({
        z:20,
        name: nameArr[0],
        data: [arrData[0]],
        type: 'parallel',
        lineStyle: lineStyle
    });
    for (var i = 1; i < 7; i++) {
        series.push({
            name: nameArr[i],
            data: [arrData[i]],
            type: 'parallel',
            lineStyle: lineStyle
        });
    }


    parallelOption.series = series;

    parallelChart.setOption(parallelOption, true);

}

function similarContainerInit(data) {
    var nameString = data.similar;
    var nameArr = nameString.split(',');
    for (var i = 1; i < 7; i++) {
        $(".similarContainer").find("p").eq(i - 1).html(nameArr[i]);
    }
    similarItemClick();
}

function similarItemClick() {
    $(".similarItem").unbind("click");
    $(".similarItem").click(function () {
        console.log('similar');
        var name = $(this).children("p").html();
        article_list('all',name,'all');
        authorInformationInit(name);
        $("#navi1").trigger("click");
    });
    
}
