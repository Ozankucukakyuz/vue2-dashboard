import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'Dashboard',
    filters: {
      assignedUser: null,
      creatorUser: null
    },
    users: [
      { id: 1, username: 'OzanKucukakyuz', firstName: 'Ozan', lastName: 'Küçükakyüz' },
      { id: 2, username: 'AlperCogurcu', firstName: 'Alper', lastName: 'Çöğürcü' },
      { id: 3, username: 'FatmaKar', firstName: 'Fatma', lastName: 'Kar' },
      { id: 4, username: 'VolkanKara', firstName: 'Volkan', lastName: 'Kara' },
      { id: 5, username: 'AyseDemir', firstName: 'Ayşe', lastName: 'Demir' },
      { id: 6, username: 'AybikeBardakci', firstName: 'Aybike', lastName: 'Bardakçı' },
      { id: 7, username: 'MuzafferAydın', firstName: 'Muzaffer', lastName: 'Aydın' },
      { id: 8, username: 'MustafaKose', firstName: 'Mustafa', lastName: 'Kose' },
    ],
    currentUser: { id: 1, username: 'OzanKucukakyuz', firstName: 'Ozan', lastName: 'Küçükakyüz' },
    tasks: [
      {
        id: 1,
        name: "Görev 1",
        description: "Görev 1 açıklaması",
        startDate: "2024-10-05",
        endDate: "2024-10-10",
        assignedUser: {
          username: 'OzanKucukakyuz',
          fullName: 'Ozan Küçükakyüz',
          initials: 'OK'
        },
        creatorUser: {
          username: 'AlperCogurcu',
          fullName: 'Alper Çöğürcü',
          initials: 'AÇ'
        },
        priority: {
          display: "Önemli",
          icon: "mdi-chevron-up",
          color: "red"
        },
        status: "Atanmış",
      },
      {
        id: 2,
        name: "Görev 2",
        description: "Görev 2 açıklaması",
        startDate: "2024-10-15",
        endDate: "2024-10-20",
        assignedUser: {
          username: 'AlperCogurcu',
          fullName: 'Alper Çöğürcü',
          initials: 'AÇ'
        },
        creatorUser: {
          username: 'FatmaKar',
          fullName: 'Fatma Kar',
          initials: 'FK'
        },
        priority: {
          display: "Çok Önemli",
          icon: "mdi-chevron-double-up",
          color: "red"
        },
        status: "Başarılı",
      },
      {
        id: 3,
        name: "Görev 3",
        description: "Görev 3 açıklaması",
        startDate: "2024-10-01",
        endDate: "2024-10-05",
        assignedUser: {
          username: 'AlperCogurcu',
          fullName: 'Alper Çöğürcü',
          initials: 'AÇ'
        },
        creatorUser: {
          username: 'VolkanKara',
          fullName: 'Volkan Kara',
          initials: 'VK'
        },
        priority: {
          display: "Orta",
          icon: "mdi-unfold-more-horizontal",
          color: "orange"
        },
        status: "Başarısız",
      },
      {
        id: 4,
        name: "Görev 4",
        description: "Görev 4 açıklaması",
        startDate: "2024-10-30",
        endDate: "2024-11-03",
        assignedUser: {
          username: 'OzanKucukakyuz',
          fullName: 'Ozan Küçükakyüz',
          initials: 'OK'
        },
        creatorUser: {
          username: 'AyseDemir',
          fullName: 'Ayşe Demir',
          initials: 'AD'
        },
        priority: {
          display: "Düşük",
          icon: "mdi-chevron-down",
          color: "blue"
        },
        status: "Başarılı",
      },
      {
        id: 5,
        name: "Görev 5",
        description: "Görev 5 açıklaması",
        startDate: "2024-10-22",
        endDate: "2024-10-23",
        assignedUser: {
          username: 'MuzafferAydın',
          fullName: 'Muzaffer Aydın',
          initials: 'MA'
        },
        creatorUser: {
          username: 'AybikeBardakci',
          fullName: 'Aybike Bardakçı',
          initials: 'AB'
        },
        priority: {
          display: "Çok Düşük",
          icon: "mdi-chevron-double-down",
          color: "blue"
        },
        status: "Başarılı",
      }
    ],
  },
  mutations: {
    SET_TITLE(state, title) {
      state.title = title;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_FILTERS(state, filters) {
      state.filters = filters;
    },
    ADD_TASK(state, task) {
      const assignedUser = state.users.find(u => u.username === task.assignedUser.username || u.username === task.assignedUser) || {};
      const creatorUser = state.users.find(u => u.username === task.creatorUser.username || u.username === task.creatorUser) || {};
      
      const formattedTask = {
        ...task,
        assignedUser: {
          username: assignedUser.username,
          fullName: `${assignedUser.firstName} ${assignedUser.lastName}`,
          initials: `${assignedUser.firstName.charAt(0)}${assignedUser.lastName.charAt(0)}`
        },
        creatorUser: {
          username: creatorUser.username,
          fullName: `${creatorUser.firstName} ${creatorUser.lastName}`,
          initials: `${creatorUser.firstName.charAt(0)}${creatorUser.lastName.charAt(0)}`
        },
        priority: {
          display: task.priority.display || task.priority,
          icon: task.priority.icon || state.priorityOptions.find(p => p.display === task.priority)?.icon,
          color: task.priority.color || state.priorityOptions.find(p => p.display === task.priority)?.color
        }
      };

      state.tasks.push(formattedTask);
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    setTitle({ commit }, title) {
      commit('SET_TITLE', title);
    },
    setCurrentUser({ commit }, user) {
      commit('SET_CURRENT_USER', user);
    },
    setFilters({ commit }, filters) {
      commit('SET_FILTERS', filters);
    },
    addTask({ commit }, task) {
      commit('ADD_TASK', task);
    },
    deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId);
    },
  },
  getters: {
    pageTitle: (state) => state.title,
    activeFilters: (state) => state.filters,
    usersWithTaskStats: (state) => {
      return state.users.map((user) => {
        const assignedTasks = state.tasks.filter(task => task.assignedUser.username === user.username);
        const successfulTasks = assignedTasks.filter(task => task.status === 'Başarılı').length;
        const failedTasks = assignedTasks.filter(task => task.status === 'Başarısız').length;
        const delayedTasks = assignedTasks.filter(task => {
          return task.endDate && moment(task.endDate).isBefore(moment(task.completedDate || new Date()));
        }).length;

        return {
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
          assignedTasks: assignedTasks.length,
          successfulTasks,
          failedTasks,
          delayedTasks
        };
      });
    }
  }
});
