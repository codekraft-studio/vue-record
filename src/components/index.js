import VueRecordAudio from './VueRecordAudio'
import VueRecordVideo from './VueRecordVideo'

export default function install(Vue) {
  Vue.component('vue-record-audio', VueRecordAudio)
  Vue.component('vue-record-video', VueRecordVideo)
}
