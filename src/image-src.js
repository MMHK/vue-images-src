var _ = require("lodash");

/**
 * v-src 指令 只对img有有效，重新指定src，并执行相关操作
 * option :
 *  @prefix 自动添加的前缀
 *  @fallback 404 之后显示的uri | 错误回调
 *  */
var plugin = function(config) {
    var options = _.assign({
        prefix: "",
        defaulFallBack: "data:image/gif;base64,R0lGODlhPAA8AMQAAPOEhOaentm2tvZ9ffxubu2Rkc/Hx+Cqqta8vPl2dumYmNPBwfCLi92wsOOkpP+Zmf9mZszMzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMDQyRTFBOTU3QkUxMUU3OUE3OUYyOUE4NjdGQUEzMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMDQyRTFBQTU3QkUxMUU3OUE3OUYyOUE4NjdGQUEzMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNDJFMUE3NTdCRTExRTc5QTc5RjI5QTg2N0ZBQTMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwNDJFMUE4NTdCRTExRTc5QTc5RjI5QTg2N0ZBQTMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAADwAPAAABf/gI45kaZ5oqppR675wLM907Yp2ru8zzv9Ami9IJA6LyN0xyRQ+mlBndApbUqHWKzOrRXK7xicYKx5vy2YvOh1mJ7/uHDxem0cQAICCtnAw8gEIPHh6MnMGCRAQADMBio+KDAY5iIqMMXMFj5cwCpCfA5M1mpaGazAHkJwuAo8DAhELpBB7NKmbpnwEqjEAigmiLQyPwTAIu7iYpy4Dis2Lxo8HMAuPDjPPz6s3yxGeEAWO0C8OxDHaMt/hpcoyDb8G4tvDEAMy4gQx7xDA8rkwBpDB8vfCFwQGMm5BoIZMEMEqpwwGaPGwxaOJMVopguVCIkV2EGGIs/dxnIuLMjTqQuAY4WFFbi80Eljg4iXKjI84yqRZcluLIZUgTKsJ0qIijDBUwgra4MXLn2VIvRJAVYBUqoIiJKKV8hHNq1WtOsP6YojBT2jHGfTZ8lGLs2l5wXwbF+2lb/liSKVbVy5UFwcCCB4s2GACwUP3Qcj6AlmBFoEJDzaMuGw3p0VbOEaV08bTCHaeihPq4pizHJ9DZ44QdFGAAshWol4N+jJRky9Mpx3qmbadA3lqxTAAGxIDxjaAF2oXBQFVKnbo/JP+Izp1y9er284ekrsO69zBZxd/nTx189LR01Efh70b92zgp1lBv779FSEAADs=",
        fallback: false
    }, config);

    var formatSource = function(uri) {
        if (_.startsWith(uri.toLowerCase(), 'http://') ||
            _.startsWith(uri.toLowerCase(), 'https://') ||
            _.startsWith(uri.toLowerCase(), '//')) {

            return uri;
        }

        var prefix = _.trimEnd(options.prefix, '/'),
            uri = _.trimStart(uri, '/');
        return prefix + '/' + uri;
    }

    var fallbackError = function () {
        this.removeEventListener("error", fallbackError);
        this.setAttribute('src', options.defaulFallBack);
    }

    var handleError = function () {
        this.removeEventListener("error", handleError);
        this.addEventListener("error", fallbackError.bind(this));

        this.className += " fallback";
        this.setAttribute('src', options.fallback);
    }


    return {
        /**
         * 第一次绑定元素回调
         */
        bind: function() {
            if (this.el.tagName.toLowerCase() != 'img') {
                return;
            }

            this.el.setAttribute("data-src", this.expression);
            this.el.setAttribute("src", formatSource(this.expression));

            if (options.fallback) {
                this.el.addEventListener("error", handleError.bind(this.el))
            } else {
                this.el.addEventListener("error", fallbackError.bind(this.el))
            }
        },
        /**
         * 绑定的数据更新时回调
         */
        update: function(newValue, oldValue) {
            if (this.el.tagName.toLowerCase() != 'img') {
                return;
            }
            if (!newValue) {
                return
            }

            this.el.setAttribute("data-src", newValue);
            this.el.setAttribute("src", formatSource(newValue));
        },
        /**
         * 解绑回调
         */
        unbind: function() {
            if (this.el.tagName.toLowerCase() != 'img') {
                return;
            }
            options.fallback && this.el.removeEventListener("error", handleError.bind(this.el))
        }
    }
}

module.exports = plugins;