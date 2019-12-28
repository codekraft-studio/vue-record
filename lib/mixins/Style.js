export default {
    props: {
        color: {
            type: String,
            default: '#000'
        },
        bgColor: {
            type: String,
            default: '#eee'
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
    },
    computed: {
        backgroundStyle() {
            return {
                backgroundColor: this.bgColor,
                width: `${this.size}px`,
                height: `${this.size}px`,
                borderRadius: `${this.radius}px`,
                padding: `${this.padding}px`
            }
        },
        foregroundStyle() {
            return {
                fill: this.color,
                width: this.size,
                height: this.size,
            }
        }
    }
}