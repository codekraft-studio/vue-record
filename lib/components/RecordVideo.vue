<template lang="html">
  <div
    v-if="isSupported"
    v-on="{
      'mousedown': startRecording,
      'mouseleave': stopRecording,
      'mouseup': startRecording,
      'touchstart': startRecording,
      'touchend': startRecording,
      'touchcancel': startRecording,
    }"
    class="vue-record vue-video-recorder"
    :class="{
      'vue-record': true,
      'vue-record-video': true,
      'active': isRecording,
      'paused': isPaused
    }"
  >
    <div class="icon-container" :style="backgroundStyle">
      <template v-if="isRecording">
        <svg v-bind="foregroundStyle" viewBox="0 0 24 24">
            <path fill="#000000" d="M18,18H6V6H18V18Z" />
        </svg>
      </template>

      <template v-else>
  <svg v-bind="foregroundStyle" viewBox="0 0 24 24">
    <path
      fill="#000000"
      d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"
    />
  </svg>
</template>
    </div>
  </div>
</template>

<script>
import ElementMixin from '../mixins/Element'

const supportedTypes = [
  'video/x-msvideo',
  'video/ogg',
  'video/mpeg',
  'video/webm'
]

export default {
  name: 'VueRecordVideo',
  mixins: [ElementMixin],
  supportedTypes,
  props: {
    mimeType: {
      type: String,
      default: 'video/webm',
      validator: v => supportedTypes.includes(v)
    },
    audio: {
      type: Boolean,
      default: true
    },
    mode: {
      default: 'press'
    }
  },
  computed: {
    constraints () {
      return {
        video: true,
        audio: this.audio
      }
    }
  }
}
</script>