import RecorderMixin from './RecorderMixin'

/**
 * The element mixin defines the mode behaviour and creates two
 * functions to start and stop the recording execution
 */
export default {
  mixins: [RecorderMixin],
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
