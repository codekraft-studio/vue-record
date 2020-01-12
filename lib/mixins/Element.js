import RecorderMixin from './Recorder'
import StyleMixin from './Style'

/**
 * The element mixin defines the mode behaviour and creates two
 * functions to start and stop the recording execution
 */
export default {
  mixins: [RecorderMixin, StyleMixin],
  props: {
    mode: {
      type: String,
      default: 'hold',
      validator: v => ['hold', 'press'].includes(v)
    }
  },
  methods: {
    stopRecording(e) {
      e.preventDefault()

      if (this.mode === 'press') {
        return
      }
      return this.stop()
    },
    startRecording(e) {
      e.preventDefault()

      if (this.isRecording && this.mode === 'press') {
        return this.stop()
      }
      return this.start()
    }
  }
}
