let Image_layer = require('./Images_layered.js');
let filePath = __dirname + "/Images_layered/";//+'F:/code_clone/code_file/Images_layered/'
let inputName = '006.jpg'; //文件名
let imagepath_layer = __dirname + "/new_images_layered/";

//调用
Image_layer.v1.imageLayeAllFunc(filePath, inputName,imagepath_layer);