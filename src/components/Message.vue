<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">

        <div class="modal-content">
            <section class="modal-card-body">
                <label class="label">{{ messageToDisplay }}</label>

            </section>
            <footer class="modal-card-foot">
                <button @click.prevent="close()" class="button is-danger">Close</button>
            </footer>


        </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ActionMessage',
    data() {
        return {
            messageToDisplay: ''
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        type: { type: String },
        sucess: { type: String },
        message: { type: String },

    },
    methods: {
        close() {
            this.$emit('close-action');
        },
        setMessage() {
            if (!this.message) {
                this.messageToDisplay = `The ${this.type} action was a ${this.sucess}`
            }
            else {
                this.messageToDisplay = this.message
            }
        }
    },
    created() {
        this.setMessage()
    }
}
</script>