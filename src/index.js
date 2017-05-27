/**
 * Install plugin.
 */

import Url from './url/index';
import Http from './http/index';
import Promise from './promise';
import Resource from './resource';
import Util, {
    options
} from './util';

export function createApi({
    ctx,
    obj,
    opts
}) {
    return {
        $url: {
            get() {
                // return options(Vue.url, obj, opts.$options.url);
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get() {
                // return options(Vue.http, obj, opts.$options.http);
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get() {
                return (executor) => new Vue.Promise(executor, this);
            }
        }
    }
}

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = Promise;

    Object.defineProperties(Vue.prototype, createApi({
        obj: this,
        opts: this
    }))


    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
    }
}

export default plugin;