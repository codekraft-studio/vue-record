import RecorderMixin from './RecorderMixin'
import SafariRecorderMixin from './SafariRecorderMixin'

const mixins = [RecorderMixin];
function isSafari() {
  return (navigator.vendor.match(/apple/i) || "").length > 0
}
if (isSafari()) {
  console.warn('Using Safari polyfill');
  mixins.push(SafariRecorderMixin)
} 

/**
 * The element mixin defines the mode behaviour and creates two
 * functions to start and stop the recording execution
 */
export default {
  mixins: mixins,
  props: {
    mode: {
      type: String,
      default: 'hold',
      validator: v => ['hold', 'press'].includes(v)
    }
  },
  methods: {
    stopRecording () {
      if (this.mode === 'press') {
        return
      }
      return this.stop()
    },
    startRecording () {
      if (this.isRecording && this.mode === 'press') {
        return this.stop()
      }
      return this.start()
    }
  }
}
