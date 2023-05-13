<template>

<div>
    <p class="flex justify-center">{{ this.inizioSlot }} - {{ this.fineSlot }}</p>

    <ul v-for="item in this.campiInterni" >
        <ItemSlot :color=item.color></ItemSlot>
        <br><br>
    </ul>

</div>

</template>

<script lang='ts'>
import ItemSlot, { Color } from './ItemSlot.vue';


    export default {
    name: "SlotColumn",
    data() {
        return {
            inizioSlot: "11.30",
            fineSlot: "12.30",
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
    component: [
        ItemSlot
    ],
    components: { ItemSlot }
}

</script>
