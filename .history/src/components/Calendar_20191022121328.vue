<template>
  <v-row>
      <div v-for="item in items" :key="item.id">
          {{ item }}
      </div>
  </v-row>
</template>

<script>
import { db } from '@/main'
    export default {
        data: () => ({
            today: new Date().toISOString().substr(0,10),
            focus: new Date().toISOString().substr(0,10),
            type: "month",
            typeToLabel: {
                month: "Month",
                week: "Week",
                day: "Day",
                "4day": "4 Days"
            },
            name: null,
            details: null,
            start: null,
            end: null,
            color: '#1976D2',
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            dialog: false
        }),
        mounted(){
            this.getEvents();
        },
        methods:{
          async getEvents(){
            let snapshot = await db.collection('calEvent').get();
            let events = [];
            snapshot.forEach(doc => {
                let appData = doc.data();
                appData.id = doc.id;
                events.push(appData);
            });
            this.events = events;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>