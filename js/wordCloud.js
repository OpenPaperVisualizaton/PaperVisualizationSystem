
var wordCloudChart = echarts.init(document.getElementById('wordCloud'));

var wordCloudOption = {
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [12, 30],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        drawOutOfBound:false,
        textStyle: {
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [
            {
                name: 'Sam S Club',
                value: 10000,
            },
            {
                name: 'Macys',
                value: 6181
            },
            {
                name: 'Amy Schumer',
                value: 4386
            },
            {
                name: 'Jurassic World',
                value: 4055
            },
            {
                name: 'Charter Communications',
                value: 2467
            },
            {
                name: 'Chick Fil A',
                value: 2244
            },
            {
                name: 'Planet Fitness',
                value: 1898
            },
            {
                name: 'Pitch Perfect',
                value: 1484
            },
            {
                name: 'Express',
                value: 1112
            },
            {
                name: 'Home',
                value: 965
            },
            {
                name: 'Johnny Depp',
                value: 847
            },
            {
                name: 'Lena Dunham',
                value: 582
            },
            {
                name: 'Lewis Hamilton',
                value: 555
            },
            {
                name: 'KXAN',
                value: 550
            },
            {
                name: 'Mary Ellen Mark',
                value: 462
            },
            {
                name: 'Farrah Abraham',
                value: 366
            },
            {
                name: 'Rita Ora',
                value: 360
            },
            {
                name: 'Serena Williams',
                value: 282
            },
            {
                name: 'NCAA baseball tournament',
                value: 273
            },
            {
                name: 'Point Break',
                value: 265
            }
        ]
    } ]
};


function wordCloudInit(name){
    wordCloudDataGet(name);
}

function wordCloudDataGet(name){
    $.ajax({
        type : "POST",  //提交方式
        url : "php/wordCloud.php",//路径,www根目录下
        data : {
            "name":name
        },//数据，这里使用的是Json格式进行传输
        success : function(result) {//返回数据根据结果进行相应的处理
            var data=eval(result);
            wordCloudDataLoad(data);
            wordCloudChart.setOption(wordCloudOption);
            wordClick();
        }
    });    
}

function wordCloudDataLoad(data){
    var wordData=[];
    for(var i =0 ;i<data.length;i++){
        var word={};
        word.name = data[i].author_keywords;
        word.value = data[i].num;
        wordData.push(word);
    }
    wordCloudOption.series[0].data= wordData;
}

function wordClick(){
    wordCloudChart.off('click');
    wordCloudChart.on('click',function(params){
        keyFlag=params.data.name;
        if(informationFlag[0]=='all'){
            paramList.author[0] =params.data.name;
            paramList.author[1] = 'all';
            author_list(params.data.name, paramList.author[1], paramList.author[2][paramList.author[3]]);
            article_list(params.data.name, 'all', 'all');
            locationInit(params.data.name);   
            affiliation_list(paramList.affiliation[0][0],params.data.name);       
        }
        if(informationFlag[0]=='affiliation'){
            author_list(params.data.name, informationFlag[1], paramList.author[2][paramList.author[3]]);
        }
        else{
            var author_name= $('#authorName').text();
            console.log(params.data.name);
            article_list(params.data.name,author_name,'all');
        }
    });
}