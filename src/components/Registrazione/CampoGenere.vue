<template>
    <div class="radio-component">
      <label class="radio-label" :for="id">{{ label }}</label>
      <div class="radio-wrap">
        <input type="radio" :id="id" :name="name" :value="value" :disabled="disabled" v-model="selected" class="radio-input">
        <span class="radio-checkmark"></span>
      </div>
    </div>
  </template>

  
  <script>
  export default {
    name: 'CampoGenere',
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      selected: {
        type: String
      }
    }
  };
  </script>
  
  <style scoped>
  .radio-component {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .radio-label {
    margin-right: 10px;
  }
  
  .radio-wrap {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
  }
  
  .radio-input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .radio-checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  
  .radio-input:checked + .radio-checkmark {
    background-color: #2a87d4;
  }
  
  .radio-input:disabled + .radio-checkmark {
    opacity: 0.5;
  }
  
  .radio-checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .radio-input:checked + .radio-checkmark:after {
    display: block;
    width: 5px;
    height: 5px;
    background: white;
    border-radius: 50%;
    margin: 5px;
  }
  </style>