import VueRecordAudio from './components/RecordAudio'
import VueRecordVideo from './components/RecordVideo'

export {
  VueRecordAudio,
  VueRecordVideo
}

export default function install(Vue, options = {}) {
  Vue.prototype.$VueRecord = options;
  Vue.component('VueRecordAudio', VueRecordAudio)
  Vue.component('VueRecordVideo', VueRecordVideo)
}
