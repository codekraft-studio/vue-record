<template lang="html">
  <div
    v-if="isSupported"
    class="vue-record vue-record-audio"
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
      <slot>
        <svg v-bind="foregroundStyle" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script>
const supportedTypes = [
  'audio/aac',
  'audio/ogg',
  'audio/wav',
  'audio/webm'
]

import ElementMixin from '../mixins/Element'

export default {
  name: 'VueRecordAudio',
  mixins: [ElementMixin],
  supportedTypes,
  props: {
    mimeType: {
      type: String,
      default: 'audio/webm',
      validator: v => supportedTypes.includes(v)
    }
  },
  data () {
    return {
      constraints: {
        audio: true,
        video: false
      }
    }
  }
}
</script>