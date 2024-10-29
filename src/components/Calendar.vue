<template>
  <v-container>
    <v-calendar
      ref="calendar"
      v-model="focus"
      :events="events"
      @click:event="onEventClick"
      color="primary"
      :event-color="getEventColor"
      :event-overlap-threshold="0"
    >
      <template v-slot:event="{ event }">
        <div class="custom-event">
          <span class="event-name">{{ event.name }}</span>
        </div>
      </template>
    </v-calendar>

    <v-menu
      v-model="eventMenu"
      :close-on-content-click="false"
      :activator="eventActivator"
      offset-y
    >
      <v-card>
        <v-card-title>{{ selectedEvent.name }}</v-card-title>
        <v-card-text>
          <p><strong>Başlangıç:</strong> {{ formatDate(selectedEvent.start) }}</p>
          <p><strong>Bitiş:</strong> {{ formatDate(selectedEvent.end) }}</p>
          <p><strong>Açıklama:</strong> {{ selectedEvent.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="editEvent(selectedEvent)">Düzenle</v-btn>
          <v-btn color="red" text @click="deleteEvent(selectedEvent.id)">Sil</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      focus: new Date().toISOString().substr(0, 10),
      eventMenu: false,
      selectedEvent: {
        name: '',
        start: '',
        end: '',
        description: '',
      },
      eventActivator: null,
    };
  },
  computed: {
    ...mapState(["tasks"]),
    events() {
      return this.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        start: task.startDate,
        end: task.endDate,
        description: task.description,
        priority: task.priority,
        status: task.status,
      }));
    },
    priorityOptions() {
      return [
        { display: "Çok Önemli", value: "Çok Önemli", icon: "mdi-chevron-double-up", color: "red" },
        { display: "Önemli", value: "Önemli", icon: "mdi-chevron-up", color: "orange" },
        { display: "Orta", value: "Orta", icon: "mdi-unfold-more-horizontal", color: "yellow" },
        { display: "Düşük", value: "Düşük", icon: "mdi-chevron-down", color: "blue" },
        { display: "Çok Düşük", value: "Çok Düşük", icon: "mdi-chevron-double-down", color: "green" }
      ];
    }
  },
  methods: {
    ...mapActions(["deleteTask"]),
    getEventColor(event) {
      const priorityOption = this.priorityOptions.find(option => option.display === event.priority.display);
      return priorityOption ? priorityOption.color : "grey"; // Varsayılan renk
    },
    onEventClick({ event, nativeEvent }) {
      this.selectedEvent = { ...event };
      this.eventActivator = nativeEvent.target;
      this.eventMenu = true;
    },
    editEvent(event) {
      this.eventMenu = false;
      this.$emit("open-task-form", event);
    },
    deleteEvent(eventId) {
      this.eventMenu = false;
      this.deleteTask(eventId);
    },
    formatDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : '';
    },
  },
};
</script>

<style scoped>
.custom-event {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.event-name {
  text-align: center;
}
</style>
