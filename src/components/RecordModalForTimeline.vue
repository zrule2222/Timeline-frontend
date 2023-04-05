<template>
    <div>
         <button class="top-0 right-0 z-[11] absolute pt-20 xl:pr-20 md:pr-5 text-white " @click="close()"><img src="../assets/x.svg" ></button>
<md-dialog :md-active.sync="active" @md-closed="close()">
    
    <md-dialog-content class="scrollbar"  >
    <div class="ml-2 -mr-3">
    <div class="text-primary-text font-bold text-[32px] font-oswald">{{recordDate}}</div>
    <img src="../assets/modal_line.png" class="mb-4 w-full">
    
        
        <div class="flex flex-row mb-4">
        <div class="flex flex-col justify-center">
        <div class="font-bold text-[40px] text-primary-black font-oswald leading-[48.5px]">
            {{recordName}}
        </div>
        <div class="font-semibold text-[14px] text-primary-black leading-[20px] ">
            //lorem ipsum
        </div>
    </div>
    
        <div class="rounded-md bg-record-display-primary flex justify-end items-center font-bold w-[349px] h-[228px] inset-y-0 right-0 ml-auto">
        <img :src="`${this.$baseUrlImage}/static/images/${recordId}/${recordImages[0]}`" class="w-[247px] max-h-[151px] mx-auto ">
    </div>
</div>
<div class="text-primary-black font-sans text-[14px] eading-[20px] break-normal mb-4">
    {{recordDescription}}
</div>
<div class="font-bold text-[24px] font-oswald mb-2">
    Features
</div>
<div class="text-primary-black font-sans text-[14px] eading-[20px] break-normal font-semibold">
<p v-for="(property, index) in properties" :key="index">&#x2022; {{property}}</p>
</div>
<!-- <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" > -->

</div>
</md-dialog-content>

</md-dialog>
</div>
  </template>
  
  <script>


    export default {
      name: 'RecordModalForTimeline',
      data(){
        return{
        recordDate: 0,
        recordName: '',
        recordImages: [],
        recordDescription: '',
        active: this.isActive,
        properties: [],
        }
      },
      props: {
        recordId: { type: Number, default: false, required: true },
        isActive: { type: Boolean, default: false, required: true }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        async setModalData(){
            const response = await this.$records.getRecord(this.recordId)
            this.recordDate = new Date(response.date).getUTCFullYear()
            this.recordName = response.name
            const response2 = await this.$records.getRecordImages(this.recordId)
           this.recordImages = response2.names
            this.recordDescription = response.description
            const recordProperties = await this.$records.getProperties(this.recordId)
            for (let index = 0; index < recordProperties.length; index++) {
                this.properties.push(recordProperties[index].property)
                
            }
        }
    },
    created(){
        this.setModalData()
    }

    }
  </script>
  <style>

</style>