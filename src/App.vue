<template>
  <div id="app">
    <header class="header">
      <div class="navbar-brand">
        <img alt="Vue logo" src="./assets/logo.png" />
      </div>

      <div class="navbar-brand-name">
        <h1 class="title">Vue Record</h1>
        <h2 class="subtitle">components for MediaRecorder API</h2>
      </div>
    </header>

    <main class="container has-text-centered">
      <section id="example-audio">
        <div class="columns">
          <div class="column">
            <div class="has-text-right">
              <h3 class="title is-3">Recording audio files</h3>
              <p class="subtitle">
                Simply
                <strong>{{recordMode.audio}}</strong> the button to record an audio clip
              </p>
            </div>

            <div class="record-settings">
              <vue-record-audio
                active-class="animated infinite pulse"
                color="#41b883"
                :mode="recordMode.audio"
                @stream="onStream"
                @result="onResult"
                rounded
              />

              <div class="field">
                <label class="label">Mode</label>
                <div class="select">
                  <select v-model="recordMode.audio">
                    <option value="press">Press</option>
                    <option value="hold">Hold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="recorded-audio">
              <div v-for="(record, index) in recordings" :key="index" class="recorded-item">
                <div class="audio-container">
                  <audio :src="record.src" controls />
                </div>
                <div>
                  <button @click="removeRecord(index)" class="button is-dark">delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="example-video">
        <div class="columns">
          <div class="column">
            <div class="has-text-right">
              <h3 class="title is-3">Recording video files</h3>
              <p class="subtitle">
                Simply
                <strong>{{recordMode.video}}</strong> the button to record a video clip
              </p>
            </div>

            <div class="record-settings">
              <vue-record-video
                active-class="animated infinite pulse"
                color="#41b883"
                :mode="recordMode.video"
                @stream="onVideoStream"
                @result="onVideoResult"
              />
              <div class="field">
                <label class="label">Mode</label>
                <div class="select">
                  <select v-model="recordMode.video">
                    <option value="press">Press</option>
                    <option value="hold">Hold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="recorded-video">
              <video ref="Video" width="400" height="250" controls></video>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          The source code is licensed
          <a
            href="https://github.com/codekraft-studio/vue-record/blob/master/LICENSE"
          >MIT</a>.
          Made with ♥ by
          <a href="https://github.com/codekraft-studio">Codekraft Studio</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      recordMode: {
        audio: 'hold',
        video: 'press'
      },
      recordings: []
    }
  },
  methods: {
    removeRecord (index) {
      this.recordings.splice(index, 1)
    },
    onStream (stream) {
      console.log('Got a stream object:', stream);
    },
    onVideoStream (stream) {
      console.log('Got a video stream object:', stream);
    },
    onVideoResult (data) {
      this.$refs.Video.srcObject = null
      this.$refs.Video.src = window.URL.createObjectURL(data)
    },
    onResult (data) {
      this.recordings.push({
        src: window.URL.createObjectURL(data)
      })
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  main {
    height: 100%;
  }

  strong,
  a {
    color: #41b883 !important;
  }

  section {
    margin: 40px 0;
  }
}

.header {
  padding: 20px 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .navbar-brand img {
    height: 64px;
    margin-right: 20px;
    width: 64px;
  }
}

.vue-record {
  margin-right: 16px;
}

.record-settings {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.recorded-audio {
  margin: 0 auto;
  height: 200px;
  overflow: auto;
  border: thin solid #eee;
  background-color: #f7f7f7;
  padding: 10px 5px;
  .recorded-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  .audio-container {
    display: flex;
    height: 54px;
    margin-right: 16px;
  }
}

.recorded-video {
  video {
    width: 100%;
    max-height: 400px;
  }
}

.footer {
  background-color: #eee;
}
</style>
