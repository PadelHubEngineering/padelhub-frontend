<template>
    <div class="hello">    
      <picture-input 
        ref="pictureInput"
        width="600" 
        height="600" 
        margin="16" 
        accept="image/jpeg,image/png" 
        size="10" 
        button-class="btn"
        :custom-strings="{
          upload: '<h1>Immetti la tua Foto</h1>',
          drag: 'file jpeg o png'
        }"
        @change="onChange">
      </picture-input>
    </div>
  </template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
</script>