export default {
    props: {
        color: {
            type: String,
            default: '#f44336'
        },
        iconColor: {
            type: String,
            default: '#fff'
        },
        bgColor: {
            type: String,
            default: '#9e9e9e'
        },
        padding: {
            type: Number,
            default: 4
        },
        size: {
            type: [Number, String],
            default: 64
        },
        radius: {
            type: Number,
            default: 0
        },
        rounded: Boolean,
        activeClass: {
            type: String,
            default: 'recording'
        },
        pausedClass: {
            type: String,
            default: 'paused'
        }
    },
    computed: {
        classList() {
            const { activeClass, pausedClass } = this
            return {
                [activeClass]: this.isRecording,
                [pausedClass]: this.isPaused
            }
        },
        backgroundStyle() {
            const recording = this.isRecording
            const radius = this.rounded ? '50%' : `${this.radius}px`
            return {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: recording ? this.color : this.bgColor,
                width: `${this.size}px`,
                height: `${this.size}px`,
                borderRadius: radius,
                padding: `${this.padding}px`
            }
        },
        foregroundStyle() {
            return {
                fill: this.iconColor,
                width: this.size,
                height: this.size,
            }
        }
    }
}