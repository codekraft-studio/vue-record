export default {
  data() {
    return {
      isSupported: false,
      isRecording: false,
      isPaused: false,
      chunks: []
    }
  },
  methods: {
    async start() {
      if (this.isRecording) {
        return
      }

      try {
        const stream = await this.getStream()
        this.$_mediaRecorder = this.prepareRecorder(stream)
        this.$_mediaRecorder.start()
      } catch (e) {
        this.$emit('error', e)
        // eslint-disable-next-line
        console.error(e);
      }
    },
    stop() {
      if (!this.isRecording) return
      this.$_mediaRecorder.stop()
      this.$_stream.getTracks().forEach(t => t.stop())
    },
    pause() {
      if (!this.isRecording) return
      this.$_mediaRecorder.pause()
    },
    resume() {
      if (!this.isPaused) return
      this.$_mediaRecorder.resume()
    },

    /**
     * Get the input stream based on constraints and emit the stream event
     * to the parent component so he can use it for processing or show a preview
     */
    async getStream() {
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints)
      this.$_stream = stream
      this.$emit('stream', stream)
      return stream
    },

    /**
     * Create a new media recorder with the user media stream
     * and set some event listeners to update component data
     * and emit events to the parent component
     */
    prepareRecorder(stream) {
      const recorderer = new MediaRecorder(stream, {
        mimeType: this.mimeType
      })

      recorderer.ignoreMutedMedia = true

      recorderer.addEventListener('start', () => {
        this.isRecording = true
        this.isPaused = false
        this.$emit('start')
      })

      recorderer.addEventListener('resume', () => {
        this.isRecording = true
        this.isPaused = false
        this.$emit('resume')
      })

      recorderer.addEventListener('pause', () => {
        this.isPaused = true
        this.$emit('pause')
      })

      // Collect the available data into chunks
      recorderer.addEventListener('dataavailable', (e) => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data)
        }
      }, true)

      // On recording stop get the data and emit the result
      // than clear all the recording chunks
      recorderer.addEventListener('stop', () => {
        this.$emit('stop')

        const blobData = new Blob(this.chunks)
        if (blobData.size > 0) {
          this.$emit('result', blobData)
        }
        this.chunks = []
        this.isPaused = false
        this.isRecording = false
      }, true)

      return recorderer
    }
  },
  mounted() {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      // eslint-disable-next-line
      console.warn('Media Devices are not supported from your browser.')
      return
    }

    this.isSupported = true
  }
}
