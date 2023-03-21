<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <section class="modal-card-body">
                <label class="label">Do you really want to delete this record?</label>

            </section>
            <footer class="modal-card-foot">
                <button @click="deleteRecord" class="button is-success">Delete</button>
                <button @click.prevent="close()" class="button is-danger">Close</button>
            </footer>


        </div>
    </div>
</template>

<script>

export default {
    name: 'deleteModal',
    data() {
        return {
            messageToDisplay: ''
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        //type: { type: String, required: true },
        //sucess: { type: String, required: true }

    },
    methods: {
        close() {
            this.$emit('close-action');
        },
        deleteRecord() {
            this.$emit('delete-record');
        },
        setMessage() {
            this.messageToDisplay = `The ${this.type} action was a ${this.sucess}`
        }
    },
    created() {
        this.setMessage()
    }
}
</script>