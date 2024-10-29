<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-card class="task-card" outlined>
          <v-card-title class="card-title">Tamamlanmamış <br> Görevler</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ incompleteTasks }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="task-card" outlined>
          <v-card-title class="card-title">Başarılı Görevler</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ successfulTasks }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="task-card" outlined>
          <v-card-title class="card-title">Başarısız Görevler</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ failedTasks }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="task-card" outlined>
          <v-card-title class="card-title">Süresi Geçen <br> Başarılı Görevler</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ overdueSuccessfulTasks }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="task-card" outlined>
          <v-card-title class="card-title">Süresi Geçen <br> Başarısız Görevler</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ overdueFailedTasks }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState(["tasks", "currentUser"]),

    incompleteTasks() {
      return this.tasks.filter(
        task => task.assignedUser.username === this.currentUser.username && task.status === "Atanmış"
      ).length;
    },
    
    successfulTasks() {
      return this.tasks.filter(
        task => task.assignedUser.username === this.currentUser.username && task.status === "Başarılı"
      ).length;
    },

    failedTasks() {
      return this.tasks.filter(
        task => task.assignedUser.username === this.currentUser.username && task.status === "Başarısız"
      ).length;
    },

    overdueSuccessfulTasks() {
      return this.tasks.filter(task => 
        task.assignedUser.username === this.currentUser.username &&
        task.status === "Başarılı" &&
        task.endDate &&
        moment(task.endDate).isBefore(moment(task.completedDate || new Date()))
      ).length;
    },

    overdueFailedTasks() {
      return this.tasks.filter(task => 
        task.assignedUser.username === this.currentUser.username &&
        task.status === "Başarısız" &&
        task.endDate &&
        moment(task.endDate).isBefore(moment(task.completedDate || new Date()))
      ).length;
    }
  }
};
</script>

<style scoped>
.task-card {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border-radius: 50px;
}

.card-title {
  margin-top: 0;
  padding-top: 0;
}

.card-subtitle {
  font-size: 25px;
}

.v-row {
  gap: 16px;
}

.v-col {
  padding: 0 !important;
}
</style>
