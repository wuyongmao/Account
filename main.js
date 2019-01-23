import Vue from 'vue'
import App from './App'
// import './iconfont.js'; //图标 
import my_icon from './components/mycom/my_icon.vue'
import my_boxi from './components/mycom/my_boxi.vue'
import my_boxt from './components/mycom/my_boxt.vue'
import my_heart from './components/mycom/my_heart.vue'
import empty from './components/mycom/empty.vue'
import my_filter from './pages/assets/filter.vue'
import statement from './pages/statement/statement.vue'
import my_signboard from './components/mycom/my_signboard.vue'

import helper from './common/helper.js';
import controller from './common/controllers.js';

import util from './common/util.js';


import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('my_icon', my_icon)
Vue.component('empty', empty)
Vue.component('my_boxi', my_boxi)
Vue.component('my_boxt', my_boxt)
Vue.component('my_heart', my_heart)
Vue.component('my_signboard', my_signboard)
Vue.component('my_filter', my_filter)
Vue.component('statement', statement)
Vue.component('my_signboard', my_signboard)



App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
