/**
 * author:xueruomeistar@126.com
 * time:2019-10-15
 * wechat: 651928424
 * content:ImagesLayered
 */
const fs = require('fs');
const images = require('images');
images.setLimit(10240, 10240);

class imageLayer_fun_v1 {
    //生成第二层图片 （步骤 3）
    layerSecondFunc(params) {
        //如果 宽高都超过了原图片的大小，则不用生成第二层图
        //计算分割坐标 （x,y,w,h） start
        if (!(params.width < params._width) && !(params.height < params._height)) {
            //宽和高两者中都没有超过或者两者之一超过了 
            let w_arr = [];
            let h_arr = [];
            if (params.width < params._width) {
                params._width = params.width;
            }
            if (params.height < params._height) {
                params._height = params.height;
            }
            let scale_width = params.width / params._width;
            let scale_height = params.height / params._height;
            let ceil_width = Math.ceil(scale_width);
            let ceil_height = Math.ceil(scale_height);
            if (scale_width) {
                for (let i = 1; i <= ceil_width; i++) {
                    if (i == ceil_width) {
                        w_arr.push(params.width);
                    } else {
                        w_arr.push(params._width * i);
                    }
                }
            }
            if (scale_height) {
                for (let i = 1; i <= ceil_height; i++) {
                    if (i == ceil_height) {//说明最后一块的高度为图片的高度
                        h_arr.push(params.height);
                    } else {
                        h_arr.push(params._height * i);
                    }
                }
            }
            let sum = 0;
            let sign = [];
            for (let w = 0; w < w_arr.length; w++) {
                for (let h = 0; h < h_arr.length; h++) {
                    sum++;
                    sign.push(sum);
                    images(images(params.filePath + params.inputName), w * params._width, h * params._height, w_arr[w], h_arr[h]).resize(params._width, params._height).save(params.imagepath_layer + params.inputName + sum + ".jpg");
                }
            }
            //计算分割坐标 （x,y,w,h） end
        } else {
            //宽高都超过了原图片的大小
            //不需要分层了
        }
    }
    //生成第一层图片（步骤 2）
    layerFirstFunc(params) {
        let layeredName = 1;
        let dirName = params.filePath;
        let fileName = layeredName + params.inputName;
        let output = params.imagepath_layer + fileName + '.jpg';
        //等比缩小
        let resize;
        if (params.width > params.height) {
            resize = params.lay_01_width;
        } else if (params.width <= params.height) {
            resize = params.lay_01_height;
        }
        images(dirName + params.inputName)
            .resize(resize)
            .save(output, {
                quality: 50
            });
    }

    //图片分层（步骤 1）
    /**
     * 
     * @param {*} filePath  : 源文件的磁盘路径
     * @param {*} inputName  源文件名
     * @param {*} imagepath_layer 分层后的磁盘路径
     */
    imageLayeAllFunc(filePath, inputName, imagepath_layer) {
        //1.读配置文件
        var path = __dirname + '/json/layer.json';
        fs.readFile(path, (err, data) => {
            if (err) {
                return err;
            } else {
                let new_data = JSON.parse(data.toString());
                let obj = {
                    filePath: filePath,
                    inputName: inputName,
                    _width: new_data['1'].width,//配置文件中规定图片宽度
                    _height: new_data['1'].height,//配置文件中规定图片高度
                    lay_01_width: new_data['1'].width,//用来生成第一层图
                    lay_01_height: new_data['1'].height,//用来生成第一层图
                    imagepath_layer: imagepath_layer//图片生成的路径
                }
                // 2.获取图片的分辨率
                //1.读图片 方式二 （暂无不足）
                let dimensions = images(filePath + inputName);
                if (dimensions.width() >= new_data['1'].width || dimensions.height() >= new_data['1'].height) {
                    //需要分层
                    // console.log('需要分层');
                    //4.生成第二层
                    obj.width = dimensions.width(); //图片的宽度
                    obj.height = dimensions.height();//图片的高度
                    //3.生成第一层（生成 1280* 960）
                    this.layerFirstFunc(obj);

                    this.layerSecondFunc(obj);

                } else {
                    //不需要分层
                    console.log('不需要分层');
                }
            }
        });
    }

    //图片分层预览
    ImageLayer_action(body, res) {
        let fileName = body.filePath;
        let sign = body.sign;
        var fullPath = path.join(fileName, decodeURI(body.image) + sign + ".jpg");
        fs.readFile(fullPath, function (err, data) {
            if (err) {
                res.send(err.toString());
            } else {
                var mimes = mime.lookup(full_path2);
                res.set('Content-type', mimes);
                res.send(data);
            }
        });
    }
}

/********输出类*********/
class imageLayer_fun {

    constructor() {
        this.v1 = new imageLayer_fun_v1();
    }
}

module.exports = new imageLayer_fun();