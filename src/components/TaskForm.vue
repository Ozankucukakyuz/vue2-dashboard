<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="toggleForm">Yeni Görev Ekle</v-btn>
        <v-expand-transition>
          <v-form v-if="showForm" ref="taskForm">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Görev Adı" v-model="task.name" :readonly="isViewMode" />
              </v-col>
              <v-col cols="12" sm="6">
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
                      label="Başlangıç Tarihi"
                      v-model="task.startDate"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="task.startDate"
                    no-title
                    @input="startDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field label="Görev Açıklaması" v-model="task.description" :readonly="isViewMode" />
              </v-col>
              <v-col cols="12" sm="6">
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
                      v-model="task.endDate"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="task.endDate"
                    no-title
                    @input="endDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="task.assignedUser"
                  :items="userOptions"
                  label="Atanan Kullanıcı"
                  item-text="fullName"
                  item-value="username"
                  clearable
                  outlined
                  :readonly="isViewMode"
                >
                  <template v-slot:selection="data">
                    <v-avatar small class="mr-2" color="#ffc9c9">{{ data.item.initials }}</v-avatar>
                    <span>{{ data.item.fullName }}</span>
                  </template>
                  <template v-slot:item="data">
                    <v-avatar small class="mr-2" color="#ffc9c9">{{ data.item.initials }}</v-avatar>
                    <span>{{ data.item.fullName }}</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="task.priority"
                  :items="priorityOptions"
                  label="Önem Derecesi"
                  item-text="display"
                  item-value="value"
                  outlined
                  clearable
                  :readonly="isViewMode"
                >
                  <template v-slot:selection="data">
                    <v-icon :color="data.item.color" class="mr-2">{{ data.item.icon }}</v-icon>
                    <span>{{ data.item.display }}</span>
                  </template>
                  <template v-slot:item="data">
                    <v-icon :color="data.item.color" class="mr-2">{{ data.item.icon }}</v-icon>
                    <span>{{ data.item.display }}</span>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="task.status"
                  :items="statusOptions"
                  label="Görev Durumu"
                  outlined
                  clearable
                  :readonly="isViewMode"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-btn class="save-button" @click="saveTask" block v-if="isCreateOrUpdateMode">
                  Kaydet
                </v-btn>
                <v-btn color="red" class="mt-2" @click="deleteTask" block v-if="isDeleteAllowed">
                  Sil
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    mode: {
      type: String,
      default: "create", // 'create', 'update' veya 'view'
    },
    taskData: {
      type: Object,
      default: () => ({
        name: "",
        description: "",
        startDate: null,
        endDate: null,
        assignedUser: null,
        priority: null,
        status: null,
      }),
    },
  },
  data() {
    return {
      showForm: false,
      task: { ...this.taskData },
      startDatePicker: false,
      endDatePicker: false,
      priorityOptions: [
        { display: "Çok Önemli", value: "Çok Önemli", icon: "mdi-chevron-double-up", color: "red" },
        { display: "Önemli", value: "Önemli", icon: "mdi-chevron-up", color: "red" },
        { display: "Normal", value: "Normal", icon: "mdi-unfold-more-horizontal", color: "orange" },
        { display: "Düşük", value: "Düşük", icon: "mdi-chevron-down", color: "blue" },
        { display: "Çok Düşük", value: "Çok Düşük", icon: "mdi-chevron-double-down", color: "blue" }
      ],
      statusOptions: ["Atanmış", "Başarılı", "Başarısız"],
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
      currentUser: (state) => state.currentUser
    }),
    userOptions() {
      return this.users.map((user) => ({
        username: user.username,
        fullName: `${user.firstName} ${user.lastName}`,
        initials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
      }));
    },
    isCreateOrUpdateMode() {
      return this.mode === "create" || this.mode === "update";
    },
    isViewMode() {
      return this.mode === "view";
    },
    isDeleteAllowed() {
      return this.mode === "update" && this.taskData.creatorUser === this.currentUser.username;
    },
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    saveTask() {
      if (this.$refs.taskForm.validate()) {
        const assignedUser = this.userOptions.find(user => user.username === this.task.assignedUser);
        const priorityOption = this.priorityOptions.find(option => option.value === this.task.priority);

        this.$store.dispatch("addTask", {
          ...this.task,
          id: Date.now(),
          assignedUser: assignedUser ? {
            username: assignedUser.username,
            fullName: assignedUser.fullName,
            initials: assignedUser.initials
          } : null,
          priority: priorityOption ? {
            display: priorityOption.display,
            icon: priorityOption.icon,
            color: priorityOption.color
          } : null,
          creatorUser: {
            username: this.currentUser.username,
            fullName: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
            initials: `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`
          }
        });

        this.resetForm();
      }
    },
    deleteTask() {
      if (this.isDeleteAllowed) {
        this.$store.dispatch("deleteTask", this.taskData.id);
        this.resetForm();
      }
    },
    resetForm() {
      this.task = {
        name: "",
        description: "",
        startDate: null,
        endDate: null,
        assignedUser: null,
        priority: null,
        status: null,
      };
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.save-button {
  background-color: #6741d9 !important;
  color: white !important;
}
</style>
