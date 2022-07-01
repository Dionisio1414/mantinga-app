import Vue from 'vue';
import VueSanitize from 'vue-sanitize';

const defaultOptions = {
    allowedAttributes: {
        '*': ['style']
    }
}

Vue.use(VueSanitize, defaultOptions);
