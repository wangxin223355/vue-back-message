import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 将Message挂载到Vue全局 每个组件都可以访问
Vue.prototype.$message = Message
