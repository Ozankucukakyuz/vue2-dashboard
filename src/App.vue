<template>
  <v-app>
    <AppSidebar
      @view-dashboard="setCurrentView('Dashboard', 'Dashboard')"
      @view-tasks="setCurrentView('TaskList', 'Görevler')"
      @view-users="setCurrentView('UserList', 'Kullanıcılar')"
      @view-calendar="setCurrentView('Calendar', 'Takvim')"
      @view-add-task="setCurrentView('TaskForm', 'Yeni Görev Ekle')"
    />
    <v-main>
      <AppNavbar />
      <component :is="currentView" @populate-task-form="populateTaskForm"></component>
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue';
import AppNavbar from './components/AppNavbar.vue';
import Dashboard from './components/Dashboard.vue';
import TaskList from './components/TaskList.vue';
import UserList from './components/UserList.vue';
import Calendar from './components/Calendar.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  components: {
    AppSidebar,
    AppNavbar,
    Dashboard,
    TaskList,
    UserList,
    Calendar,
    TaskForm,
  },
  data() {
    return {
      currentView: 'Dashboard',
    };
  },
  methods: {
    populateTaskForm(event) {
      console.log("Etkinliğe göre formu doldur: ", event);
    },
    setCurrentView(view, title) {
      this.currentView = view;
      this.$store.dispatch('setTitle', title);
    }
  }
};
</script>
