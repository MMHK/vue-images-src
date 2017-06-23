# vue-image-src

`v-src` 指令，使`img`标签在加载`src`属性的时候，自动合并相对路径，并定义fallback uri用于指定无法加载图片时显示的图片。


## 使用

- 直接`script`引用，请直接引用 `dist` 目录下的文件。

- `CommonJS` 方式
    - js引入
        ```JS
        var vue = require("vue");
        var VueImageSrc = require("vue-image-src");
        vue.use(VueImageSrc, {
            prefix: "your/prefix/path",
            fallback: "your/fallback/url"
        });
        ```
    - 模版中引用，
    ```HTML
    <img v-src="the/path/of/your/image" />
    ```

- `RequireJS`方式
    - config:
    ```JS
    requirejs.config({
        "vue-image-src": "[你本地的vue-image-src引用路径]"
    })
    ``` 
    - js引入
    ```JS
    require(["vue", "vue-image-src"], function(Vue, VueImageSrc){
        vue.use(VueImageSrc, {
            prefix: "your/prefix/path",
            fallback: "your/fallback/url"
        });
    })
    ```
    - 模版中引用，
    ```HTML
    <img v-src="the/path/of/your/image" />
    ```


## 参数

- `prefix`, 需要添加的url前缀。
- `fallback`， 当加载图片失效时，返回的url。