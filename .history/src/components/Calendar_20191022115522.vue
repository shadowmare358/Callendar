<template>
  <v-row>
    <v-col
      sm="12"
      lg="3"
      class="mb-4 controls"
    >
      <v-btn
        fab
        outlined
        small
        absolute
        left
        color="primary"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        fab
        outlined
        small
        absolute
        right
        color="primary"
        @click="$refs.calendar.next()"
      >
        <v-icon dark>mdi-chevron-right</v-icon>
      </v-btn>
      <br><br><br>
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>
      <v-checkbox
        v-model="dark"
        label="Dark"
      ></v-checkbox>
      <v-checkbox
        v-model="shortIntervals"
        label="Short intervals"
      ></v-checkbox>
      <v-checkbox
        v-model="shortMonths"
        label="Short months"
      ></v-checkbox>
      <v-checkbox
        v-model="shortWeekdays"
        label="Short weekdays"
      ></v-checkbox>
      <v-select
        v-model="color"
        :items="colorOptions"
        label="Color"
      ></v-select>
      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Start Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        v-if="hasEnd"
        ref="endMenu"
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="end"
            label="End Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="end"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="endMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.endMenu.save(end)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="nowMenu"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="now"
            label="Today"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="now"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="nowMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.nowMenu.save(now)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
        v-model="weekdays"
        :items="weekdaysOptions"
        label="Weekdays"
      ></v-select>
      <v-text-field
        v-if="type === 'custom-weekly'"
        v-model="minWeeks"
        label="Minimum Weeks"
        type="number"
      ></v-text-field>
      <v-select
        v-if="hasIntervals"
        v-model="intervals"
        :items="intervalsOptions"
        label="Intervals"
      ></v-select>
      <v-select
        v-if="type === 'custom-daily'"
        v-model="maxDays"
        :items="maxDaysOptions"
        label="# of Days"
      ></v-select>
      <v-select
        v-if="hasIntervals"
        v-model="styleInterval"
        :items="styleIntervalOptions"
        label="Styling"
      ></v-select>
    </v-col>
    <v-col
      sm="12"
      lg="9"
      class="pl-4"
    >
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"
          :end="end"
          :min-weeks="minWeeks"
          :max-days="maxDays"
          :now="now"
          :dark="dark"
          :weekdays="weekdays"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
          :short-intervals="shortIntervals"
          :short-months="shortMonths"
          :short-weekdays="shortWeekdays"
          :color="color"
        >
          <template v-slot:day="day">
            <v-sheet
              v-if="day.day % 3 === 0"
              :color="color"
              class="white--text pa-1"
            >
              day slot {{ day.date }}
            </v-sheet>
          </template>
          <template v-slot:header="day">
            <div
              v-if="day.weekday % 2"
              class="day-header"
            >
              day-header slot {{ day.date }}
            </div>
          </template>
          <template v-slot:day-body="day">
            <div
              v-if="day.weekday % 3 === 2"
              class="day-body"
            >
              day-body slot {{ day.date }}
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
    export default {
        data: () => ({
            today: new Date().toISOString().substr()
        })
    }
</script>

<style lang="scss" scoped>

</style>