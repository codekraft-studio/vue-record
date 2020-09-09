import MediaRecorder from 'audio-recorder-polyfill';

export default {
	methods: {
		/**
		 * Create a new media recorder with the user media stream
		 * and set some event listeners to update component data
		 * and emit events to the parent component
		 */
		async prepareRecorder() {
			if (!this.$_stream) {
				return;
			}

			window.MediaRecorder = MediaRecorder;
			const CustomMediaRecorder = window.MediaRecorder || MediaRecorder;

			this.$_mediaRecorder = new CustomMediaRecorder(this.$_stream, {
				mimeType: 'audio/wav', // browser dependent
			});

			this.debug && console.log('⏺', this.$_mediaRecorder);

			this.$_mediaRecorder.ignoreMutedMedia = true;

			this.$_mediaRecorder.addEventListener('start', () => {
				this.isRecording = true;
				this.isPaused = false;
				this.$emit('start');
			});

			this.$_mediaRecorder.addEventListener('resume', () => {
				this.isRecording = true;
				this.isPaused = false;
				this.$emit('resume');
			});

			this.$_mediaRecorder.addEventListener('pause', () => {
				this.isPaused = true;
				this.$emit('pause');
			});

			// Collect the available data into chunks
			this.$_mediaRecorder.addEventListener(
				'dataavailable',
				e => {
					if (e.data && e.data.size > 0) {
						this.chunks.push(e.data);
					}
				},
				true,
			);

			// On recording stop get the data and emit the result
			// than clear all the recording chunks
			this.$_mediaRecorder.addEventListener(
				'stop',
				() => {
					this.$emit('stop');

					const blobData = new Blob(this.chunks, {
						type: this.$_mediaRecorder.mimeType,
					});
					if (blobData.size > 0) {
						this.$emit('result', blobData);
					}
					this.chunks = [];
					this.isPaused = false;
					this.isRecording = false;

					this.$_mic.dispose();
				},
				true,
			);
		},
	},
};
