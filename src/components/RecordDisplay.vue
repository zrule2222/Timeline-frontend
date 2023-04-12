<template>
<div class="w-[282px] h-[302px] ml-0 hover:cursor-pointer">

    <div class="rounded-md bg-record-display-primary   font-bold w-[282px] min-h-[309px] overflow-clip  max-h-[309px] hover:max-h-fit group " >
        
          <div class="w-[234px] h-[20px] -mt-10 pt-[24px] text-primary-text pl-[28px] text-[14px]">
             //{{year}}
          </div>
          <div class="w-[174px] h-[107px] pl-[28px] pt-[28px] flex flex-col mb-2 ">
            <img v-if="recordImages[0] != null" :src="`${this.$baseUrlImage}/static/images/${recordId}/${recordImages[0]}`" class="min-h-0
            ">
          </div>
          <div class="w-[234px] h-[27px] pl-[28px] pt-auto font-bold text-[16px] mb-3 text-primary-black leading-5">
            {{name}}
          </div>
          <div class="max-w-[234px] h-auto pl-[28px] pt-auto font-semibold text-[14px] text-primary-black leading-5 line-clamp group-hover:no-line-clamp">
            {{shortDecs}}
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'recordDisplay',
    data() {
        return {
            recordImages: []

        }
    },
    // components: {
    //  Datepicker
    //},
    props: {
        year: { type: Number, default: false, required: true },
        name: { type: String, default: false, required: true },
        shortDecs: { type: String, default: false, required: true },
        recordId: { type: Number, default: false, required: true },
    },
    methods: {
     async getImage(){
        const response = await this.$records.getRecordImages(this.recordId)
        
        if(response.names){
            this.recordImages = response.names
        }
        else{
          this.recordImages[0] = null
        }
      }
    },
    created() {
        this.getImage()
    }
}
</script>

<style>
</style>
