import Vue from 'vue'
import VueAmplitude from 'vue-amplitude'

const envAmplitude = (window.location.host == 'www.interseguro.pe') ? '655d0bb10609b35862d6c132759ab296' : '186abbcd3874155cb9ef8962496cc78c'

Vue.use(VueAmplitude, {apiKey: envAmplitude})
