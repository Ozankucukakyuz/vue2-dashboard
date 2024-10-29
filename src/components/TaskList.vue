<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Filtreleme</v-toolbar-title>
          </v-toolbar>

          <v-row class="pa-3">
            <v-col cols="12" sm="3">
              <v-autocomplete
                v-model="filters.name"
                :items="taskNames"
                label="Görev Adı"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-autocomplete
                v-model="filters.assignedUser"
                :items="userOptions"
                label="Atanan Kullanıcı"
                item-text="fullName"
                item-value="username"
                clearable
              >
                <template v-slot:item="data">
                  <v-avatar small class="mr-2" color="#ffc9c9">
                    {{ data.item.initials }}
                  </v-avatar>
                  <span>{{ data.item.fullName }}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3">
              <v-autocomplete
                v-model="filters.creatorUser"
                :items="userOptions"
                label="Atayan Kullanıcı"
                item-text="fullName"
                item-value="username"
                clearable
              >
                <template v-slot:item="data">
                  <v-avatar small class="mr-2" color="#ffc9c9">
                    {{ data.item.initials }}
                  </v-avatar>
                  <span>{{ data.item.fullName }}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="filters.priority"
                :items="priorityOptions"
                label="Önem Derecesi"
                item-text="display"
                item-value="display"
                clearable
              >
                <template v-slot:selection="data">
                  <v-icon :color="data.item.color" class="mr-2">
                    {{ data.item.icon }}
                  </v-icon>
                  <span>{{ data.item.display }}</span>
                </template>
                <template v-slot:item="data">
                  <v-icon :color="data.item.color" class="mr-2">
                    {{ data.item.icon }}
                  </v-icon>
                  <span>{{ data.item.display }}</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                v-model="filters.status"
                :items="['Atanmış', 'Başarılı', 'Başarısız']"
                label="Görev Durumu"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-menu
                ref="startDateMenu"
                v-model="startDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    label="Baş. Tarihi"
                    v-model="filters.startDate"
                    readonly
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filters.startDate"
                  no-title
                  @input="startDatePicker = false"
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3">
              <v-menu
                ref="endDateMenu"
                v-model="endDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    label="Bitiş Tarihi"
                    v-model="filters.endDate"
                    readonly
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filters.endDate"
                  no-title
                  @input="endDatePicker = false"
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-data-table
            :headers="headers"
            :items="filteredTasks"
            class="elevation-1"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>

                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ item.startDate }}</span>
                    </template>
                    <span>{{ formatTooltip(item.startDate) }}</span>
                  </v-tooltip>
                </td>

                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ item.endDate }}</span>
                    </template>
                    <span>{{ formatTooltip(item.endDate) }}</span>
                  </v-tooltip>
                </td>

                <td>{{ item.delayDate }}</td>

                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">{{ item.completeDate }}</span>
                    </template>
                    <span>{{ formatTooltip(item.completeDate) }}</span>
                  </v-tooltip>
                </td>

                <td>
                  <v-avatar small color="#ffc9c9" class="mr-2">{{ item.assignedUser.initials }}</v-avatar>
                  {{ item.assignedUser.fullName }}
                </td>
                <td>
                  <v-avatar small color="#ffc9c9" class="mr-2">{{ item.creatorUser.initials }}</v-avatar>
                  {{ item.creatorUser.fullName }}
                </td>
                <td>
                  <v-icon :color="item.priority.color" class="mr-2">
                    {{ item.priority.icon }}
                  </v-icon>
                  <span>{{ item.priority.display }}</span>
                </td>
                <td>{{ item.status }}</td>

                <td>
                  <v-icon
                    v-if="canEdit(item)"
                    color="blue"
                    @click="editTask(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    color="green"
                    @click="viewTask(item)"
                  >
                    mdi-eye
                  </v-icon>
                  <v-icon
                    v-if="canDelete(item)"
                    color="red"
                    @click="deleteTask(item)"
                  >
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      startDatePicker: false,
      endDatePicker: false,
      filters: {
        name: "",
        assignedUser: "",
        creatorUser: "",
        priority: "",
        status: "",
        startDate: null,
        endDate: null,
      },
      priorityOptions: [
        { display: "Çok Önemli", value: "Çok Önemli", icon: "mdi-chevron-double-up", color: "red" },
        { display: "Önemli", value: "Önemli", icon: "mdi-chevron-up", color: "red" },
        { display: "Orta", value: "Orta", icon: "mdi-unfold-more-horizontal", color: "orange" },
        { display: "Düşük", value: "Düşük", icon: "mdi-chevron-down", color: "blue" },
        { display: "Çok Düşük", value: "Çok Düşük", icon: "mdi-chevron-double-down", color: "blue" }
      ],
      headers: [
        { text: "Görev Adı", value: "name" },
        { text: "Başlangıç Tarihi", value: "startDate" },
        { text: "Bitiş Tarihi", value: "endDate" },
        { text: "Gecikme", value: "delayDate" },
        { text: "Tamamlanma Tarihi", value: "completeDate" },
        { text: "Atanan Kullanıcı", value: "assignedUser" },
        { text: "Atayan Kullanıcı", value: "creatorUser" },
        { text: "Önem Derecesi", value: "priority" },
        { text: "Görev Durumu", value: "status" },
        { text: "Aksiyon", value: "actions" }
      ]
    };
  },
  computed: {
    ...mapState(["tasks", "currentUser", "users"]),
    ...mapGetters(["activeFilters"]),
    taskNames() {
      return [...new Set(this.tasks.map(task => task.name))];
    },
    userOptions() {
      return this.users.map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        initials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
      }));
    },
    filteredTasks() {
      return this.tasks
        .filter((task) => {
          const startDate = this.filters.startDate
            ? moment(this.filters.startDate).format("YYYY-MM-DD")
            : null;
          const endDate = this.filters.endDate
            ? moment(this.filters.endDate).format("YYYY-MM-DD")
            : null;

          return (
            (!this.filters.name || task.name.includes(this.filters.name)) &&
            (!this.filters.assignedUser || task.assignedUser.username === this.filters.assignedUser) &&
            (!this.filters.creatorUser || task.creatorUser.username === this.filters.creatorUser) &&
            (!this.filters.priority || task.priority.display === this.filters.priority) &&
            (!this.filters.status || task.status === this.filters.status) &&
            (!startDate || moment(task.startDate).isSameOrAfter(startDate)) &&
            (!endDate || moment(task.endDate).isSameOrBefore(endDate))
          );
        })
        .map((task) => ({
          ...task,
          delayDate: this.calculateDelay(task.endDate, task.completeDate),
          completeDate: task.completeDate ? moment(task.completeDate).format("DD/MM/YYYY") : ""
        }));
    },
  },
  watch: {
    activeFilters: {
      handler(newFilters) {
        this.filters.assignedUser = newFilters.assignedUser || "";
        this.filters.creatorUser = newFilters.creatorUser || "";
      },
      immediate: true
    }
  },
  methods: {
    calculateDelay(endDate, completeDate) {
      const end = moment(endDate);
      const today = moment();
      const referenceDate = completeDate ? moment(completeDate) : today;
      const delay = referenceDate.diff(end, "days");
      return delay > 0 ? `${delay} Gün` : "";
    },
    formatTooltip(date) {
      return date ? moment(date).fromNow() : "Geçerli bir tarih yok";
    },
    canEdit(task) {
      return task.creatorUser.username === this.currentUser.username || task.assignedUser.username === this.currentUser.username;
    },
    canDelete(task) {
      return task.creatorUser.username === this.currentUser.username;
    },
    editTask(task) {
      this.$router.push({ name: "TaskForm", params: { mode: "edit", taskId: task.id } });
    },
    viewTask(task) {
      this.$router.push({ name: "TaskForm", params: { mode: "view", taskId: task.id } });
    },
    deleteTask(task) {
      this.$store.dispatch("deleteTask", task.id);
    },
  },
  created() {
    this.filters.assignedUser = this.activeFilters.assignedUser || "";
    this.filters.creatorUser = this.activeFilters.creatorUser || "";
  }
};
</script>


<style scoped>
.v-avatar {
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
