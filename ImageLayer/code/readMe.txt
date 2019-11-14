
hello
author:xueruomei  wechat:651928424 

1.该功能分为两层 
	第一层 以任意尺寸来生成第一层图片  ./json/layer.json 为配置分辨率
	第二层 以任意尺寸生成多张图片  ./json/layer.json 为配置分辨率

2.该版本对文件大小有点限制 分辨率不超过 1w 


3.如何运行？
	
	1.安装 node
	2.用命令 node client.js 
	3.在./new_images_layered 下查看生成的图片 


4.目录说明：

	1、./new_images_layered 为生成的文件夹
	2、./Images_layered 为源文件的文件夹
	3、./json/layer.json 为分辨率的配置文件
	4、client.js 为客户端 发请求者
	5、Images_layered.js 为服务功能

5.欢迎fork