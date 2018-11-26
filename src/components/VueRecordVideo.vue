<template lang="html">
  <div v-if="isSupported" class="vue-video-recorder" :class="{
    'active': isRecording,
    'paused': isPaused
  }">
    <div class="recorder-icon"
      @mousedown="startRecording"
      @mouseleave="stopRecording"
      @mouseup="stopRecording"
      @touchstart="startRecording"
      @touchend="stopRecording"
      @touchcancel="stopRecording">
      <span>&#9658;</span>
    </div>
    <div v-if="hasControls" class="recorder-controls">
      <button @click="pause">PAUSE</button>
      <button @click="resume">RESUME</button>
      <button @click="stop">STOP</button>
    </div>
  </div>
</template>

<script>
import ElementMixin from './ElementMixin'

const supportedTypes = [
  'video/x-msvideo',
  'video/ogg',
  'video/mpeg',
  'video/webm'
]

export default {
  name: 'VueRecordVideo',
  mixins: [ElementMixin],
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
    controls: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    constraints () {
      return {
        video: true,
        audio: this.audio
      }
    },
    hasControls () {
      return this.controls && this.mode === 'press' && this.isRecording
    }
  }
}
</script>

<style lang="scss">
.vue-video-recorder {
  color: white;
  padding: 16px;
  border-radius: 18px;
  position: relative;
  background-color: #4DB6AC;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
