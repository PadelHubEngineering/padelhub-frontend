<template>
    
    <p>Campi INTERNI</p>
    <table>
        <thead class="sticky top-0">
            <tr>
                <!-- Metto giù l'header delle tabelle con le varie fascie orarie -->
                <th></th>
                <th v-for="item in this.columnsTitle"> {{ item }} </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in this.campiInterni">
                <th scope="row">{{ item.id  }}</th>   
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <!-- <td>{{ item }}</td> -->
            </tr>
        </tbody>
    </table>
    

</template>

<script lang='ts'>
import ItemSlot from './ItemSlot.vue';
import ItemSlot, { Color } from './ItemSlot.vue';


    export default {
    name: "SlotColumn",
    data() {
        return {
            columnsTitle: ["9.30", "10.30", "11.30", "12.30"],
            campiInterni: [
                {
                    id: "1",
                    color: Color.Green
                },
                {
                    id: "2",
                    color: Color.Red
                },
                {
                    id: "3",
                    color: Color.Yellow
                },
                {
                    id: "4",
                    color: Color.Green
                }
            ],
            campiEsterni: [
                {
                    id: "1",
                    color: Color.Green
                },
                {
                    id: "2",
                    color: Color.Red
                },
                {
                    id: "3",
                    color: Color.Yellow
                },
                {
                    id: "4",
                    color: Color.Green
                }
            ]
        };
    },
    components: { ItemSlot }
}

</script>