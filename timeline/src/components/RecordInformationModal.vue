<template>
    <div>
        <div class="modal" :class="{ 'is-active': isActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <header class="modal-card-head">

                    <p class="modal-card-title">Record information</p>

                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label has-text-centered is-size-2">{{ recordName }}</label>
                    </div>
                    <div class="field">
                        <label class="label has-text-centered">{{ recordDate }}</label>
                    </div>
                    <div class="field">
                        <label class="label has-text-centered">{{ recordDescription }}</label>
                    </div>
                    <div class="field">
                        <label class="label has-text-centered">record type: {{ recordType }}</label>
                    </div>
                    <div class="field">
                        <label class="label has-text-centered">Images</label>
                        <div v-if="recordImages">
                            <div v-for="(image, index) in recordImages">
                                <img :src="`${this.$baseUrlImage}/static/images/${recordIndex}/${image}`" />
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot buttons is-right">
                    <button @click.prevent="close()" class="button is-right is-danger ">Close</button>
                </footer>


            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RecordInformationModal',
    data() {
        return {
            recordName: '',
            recordDate: '',
            recordDescription: '',
            recordType: '',
            recordImages: [],
            isVisible: false,
        }
    },
    // components: {
    //  Datepicker
    //},
    props: {
        recordIndex: { type: Number, default: false, required: true },
        isActive: { type: Boolean, default: false, required: true }
    },
    methods: {
        async getRecordInfo() {
            try{
            const response = await this.$records.getRecord(this.recordIndex)
            this.recordName = response.name
            this.recordDate = response.date
            this.recordDescription = response.description
            this.recordType = response.record_type
            const response2 = await this.$records.getRecordImages(this.recordIndex)
            this.recordImages = response2.names
            }
            catch(error){
                console.log(error)
            }
        },
        close() {
            this.$emit('close');
        }
    },
    created() {
        this.getRecordInfo()
    }
}
</script>