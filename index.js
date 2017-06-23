var plugin = require("./src/image-src");

module.exports = {
    install: function(Vue, option) {
        Vue.directive('src', plugin(option));
    }
}