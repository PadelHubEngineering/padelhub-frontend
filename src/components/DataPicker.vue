<script lang="ts">

import { ref, onMounted, type Ref } from 'vue'
import moment from 'moment'

export default {
  setup(props, context) {
    const months = [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ]

    const dateValue = moment()
    const daysInMonth = ref(dateValue.daysInMonth())

    const startingYear = 2023
    const numberofYears = 4

    const editValue = (unit:any, evt:any) => {
        dateValue.set(unit, evt.target.value)
        daysInMonth.value = dateValue.daysInMonth()
        updateElements()
        context.emit('update', dateValue._d) //Per passare la data aggiornata
    }

    onMounted(() => {
        updateElements()
    })

    const updateElements = () => {
        month.value.value = dateValue.month()
        date.value.value = dateValue.date()
        year.value.value = dateValue.format('YYYY')
    }

    const month: any = ref(null)
    const date: any = ref(null)
    const year: any = ref(null)

    return {
      months,
      numberofYears,
      startingYear,
      daysInMonth,
      editValue, 
      month, 
      date,
      year
    }
  },
}

</script>


<template>
    <div class="date-picker">
        <div class='custom-select'>
        <select @change='editValue("date", $event)' ref='date'>
            <option
                v-for='i in daysInMonth'
                :key='i'
                :value='i'>
            {{ i }}
            </option>
        </select>
        </div>
      <div class="custom-select">
        <select @change='editValue("months", $event)' ref='month'>
          <option v-for="(month, index) in months" :key="month" :value="index">
            {{ month}}
          </option>
        </select>
      </div>
      <div class="custom-select">
        <select @change='editValue("year", $event)' ref='year'>
          <option
            v-for="i in numberofYears"
            :key="i"
            :value="startingYear + (i - 1)"
          >
            {{ startingYear + (i - 1) }}
          </option>
        </select>
      </div>
    </div>

</template>


<style scoped>
/* wrapper-div for including arrow */
.custom-select {
  background-color: #f9fafa;
  float: left;
  margin-right: 10px;
  position: relative;
  border-color: #2f8dce;
  border-width: 2px;
  border-radius: 15px;
  font-family: "KoHo", Times, serif;
}

.custom-select select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none; /* remove default styling */
  background-color: inherit;
  border: none;
  color: #2f8dce;
  display: block;
  font-size: 20px;
  height: 32px;
  padding: 0px 30px 0px 10px;
  margin: 0;
  outline: none;
  border-radius: 15px;
  text-align: center;
}

/* drop arrow */
.custom-select:after {
  content: '\25bc';
  color: #2f8cce85;
  font-size: 12px;
  position: absolute;
  right: 8px;
  top: 10px;
}
</style>