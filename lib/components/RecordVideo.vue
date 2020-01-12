<template lang="html">
  <div
    v-if="isSupported"
    class="vue-record vue-record-video"
    v-bind:class="classList"
    v-on="{
      'mousedown': startRecording,
      'mouseleave': stopRecording,
      'mouseup': stopRecording,
      'touchstart': startRecording,
      'touchend': startRecording,
    }"
  >
    <div class="icon-container" :style="backgroundStyle">
      <template v-if="isRecording">
        <svg v-bind="foregroundStyle" viewBox="0 0 24 24">
          <path d="M18,18H6V6H18V18Z" />
        </svg>
      </template>

      <template v-else>
  <svg v-bind="foregroundStyle" viewBox="0 0 24 24">
    <path
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
      type: String,
      default: 'press',
      validator: v => ['hold', 'press'].includes(v)
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