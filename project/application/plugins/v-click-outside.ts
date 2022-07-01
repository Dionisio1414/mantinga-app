import Vue from 'vue';

Vue.directive("click-outside", {
    bind: (el, binding, vnode) => {
        // @ts-ignore
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                // @ts-ignore
                vnode.context[binding.expression](event);
            }
        };
        // @ts-ignore
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind: (el) => {
        // @ts-ignore
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
});
