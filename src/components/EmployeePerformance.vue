<template>
  <NavBar />
  <!-- Employee Profile Details -->
  <main class="main-container">
    <div class="profile-container">
      <div>
        <img class="profile-image" :src="profileImage" />
      </div>

      <div class="info-container">
        <h2 class="name">{{ name }}</h2>
        <h4 class="email">{{ email }}</h4>
      </div>
    </div>

    <div style="clear: both"></div>
    <!-- Card Components to display statistics of the employee -->
    <div class="main-cards">
      <div class="card">
        <div class="card-inner">
          <h3 style="text-transform: uppercase">Total Projects Handled</h3>
          <span class="material-icons-outlined" style="color: #2962ff"
            >category</span
          >
        </div>
        <h1>{{ totalProjectsHandled }}</h1>
      </div>

      <div class="card">
        <div class="card-inner">
          <h3 style="text-transform: uppercase">Total Tasks</h3>
          <span class="material-icons-outlined" style="color: #ff6d00"
            >view_timeline</span
          >
        </div>
        <h1>{{ totalTasksHandled }}</h1>
      </div>

      <div class="card">
        <div class="card-inner">
          <h3 style="text-transform: uppercase">Completed Tasks Percentage</h3>
          <span class="material-icons-outlined" style="color: #2e7d32"
            >done_all</span
          >
        </div>
        <h1>{{ totalPercentageTasksCompleted }}%</h1>
      </div>

      <div class="card">
        <div class="card-inner">
          <h3 style="text-transform: uppercase">Total Working Hours</h3>
          <span class="material-symbols-outlined" style="color: #d50000">
            avg_time
          </span>
        </div>
        <h1>{{ totalWorkingHours }}</h1>
      </div>
    </div>

    <div class="charts">
      <div class="charts-card">
        <h2 class="chart-title">Number of Completed Tasks (This Week)</h2>
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <div class="charts-card">
        <h2 class="chart-title">Number of Remaining Tasks (Per This Week)</h2>
        <apexchart
          type="area"
          height="350"
          :options="chartOptions1"
          :series="series1"
        ></apexchart>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { db } from "@/firebase/firebase";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "EmployeePerformance",
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  components: { NavBar },
  setup(props) {
    const name = ref("");
    const email = ref("");
    const profileImage = ref("");
    const totalProjectsHandled = ref(0);
    const totalTasksHandled = ref(0);
    const totalPercentageTasksCompleted = ref(0);
    const totalWorkingHours = ref(0);
    const weekData = ref([0, 0, 0, 0, 0]);
    const weekData1 = ref([0, 0, 0, 0, 0]);

    // Fetch employee's data
    const fetchUserData = async () => {
      const userSnapshot = await db.collection("Users").doc(props.userId).get();
      const userData = userSnapshot.data();
      if (userData) {
        name.value = userData.name;
        email.value = userData.email;
        profileImage.value = userData.imageURL;
      }
    };

    // Get total project count of employee
    const fetchProjectCount = async () => {
      const projectsSnapshot = await db.collection("Project").get();
      const projects = projectsSnapshot.docs.map((doc) => doc.data());
      const filteredProjects = projects.filter(
        (project) =>
          project.employeeID &&
          project.employeeID.includes(String(props.userId))
      );
      totalProjectsHandled.value = filteredProjects.length;
    };

    // Get total task count of employee
    const fetchTaskCount = async () => {
      const tasksSnapshot = await db.collection("Task").get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data());
      const filteredTasks = tasks.filter(
        (task) => task.employeeID == String(props.userId)
      );
      totalTasksHandled.value = filteredTasks.length;
    };

    // Get total completed task count of employee
    const fetchCompletedTaskCount = async () => {
      const tasksSnapshot = await db.collection("Task").get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data());
      const filteredCompletedTasks = tasks.filter(
        (task) =>
          task.employeeID == String(props.userId) && task.status == "Closed"
      );
      if (filteredCompletedTasks.length == 0) {
        totalPercentageTasksCompleted.value = 0;
      } else {
        totalPercentageTasksCompleted.value = Math.round(
          (filteredCompletedTasks.length / totalTasksHandled.value) * 100
        );
      }
      // Calculate the sum of estimatedHours for all filteredCompletedTasks
      const totalEstimatedHours = filteredCompletedTasks.reduce((sum, task) => {
        return sum + task.estimatedHours;
      }, 0);

      // Store the totalEstimatedHours in totalWorkingHours.value
      totalWorkingHours.value = totalEstimatedHours;
    };

    // Get total completed task count of employee for this week

    const fetchCompletedTasksThisWeek = async () => {
      const newWeekData = [0, 0, 0, 0, 0];
      const startOfWeek = new Date();
      startOfWeek.setDate(
        startOfWeek.getDate() -
          startOfWeek.getDay() +
          (startOfWeek.getDay() == 0 ? -6 : 1)
      );
      startOfWeek.setHours(0, 0, 0, 0);

      const tasksSnapshot = await db.collection("Task").get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data());
      const filteredCompletedTasks = tasks.filter(
        (task) =>
          task.employeeID == String(props.userId) && task.status == "Closed"
      );

      filteredCompletedTasks.forEach((task) => {
        const closedDate = new Date(task.closedTimestamp.toDate());
        if (closedDate >= startOfWeek) {
          const dayOfWeek = closedDate.getDay() - 1;
          if (dayOfWeek >= 0 && dayOfWeek <= 4) {
            newWeekData[dayOfWeek]++;
          }
        }
      });
      weekData.value = [...newWeekData];
    };

    // Get total completed task count of employee as per this week's date

    const fetchRemainingTasksThisWeek = async () => {
      const newWeekData1 = [0, 0, 0, 0, 0];
      const startOfWeek = new Date();
      startOfWeek.setDate(
        startOfWeek.getDate() -
          startOfWeek.getDay() +
          (startOfWeek.getDay() == 0 ? -6 : 1)
      );
      startOfWeek.setHours(0, 0, 0, 0);

      const tasksSnapshot = await db.collection("Task").get();
      const tasks = tasksSnapshot.docs.map((doc) => doc.data());
      const filteredTasks = tasks.filter(
        (task) => task.employeeID == String(props.userId)
      );

      filteredTasks.forEach((task) => {
        let closedDate;
        if (task.status == "Closed") {
          closedDate = new Date(task.closedTimestamp.toDate());
        }

        for (let i = 0; i < 5; i++) {
          const currentDate = new Date(startOfWeek);
          currentDate.setDate(currentDate.getDate() + i);

          if (
            task.status !== "Closed" ||
            (closedDate && closedDate > currentDate)
          ) {
            newWeekData1[i]++;
          }
        }
      });

      weekData1.value = [...newWeekData1];
    };

    // Chart setting for our completed tasks chart
    const chartOptions = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
      },

      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
    };

    const series = computed(() => [
      {
        data: weekData.value,
        name: "Completed",
      },
    ]);

    // Chart setting for our remaining tasks charts

    const chartOptions1 = {
      chart: {
        background: "transparent",
        height: 350,
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: ["#d50000"],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.1,
          shadeIntensity: 1,
          stops: [0, 100],
          type: "vertical",
        },
        type: "gradient",
      },
      grid: {
        borderColor: "#55596e",
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        labels: {
          colors: "black",
        },
        show: true,
        position: "top",
      },
      markers: {
        size: 6,
        strokeColors: "#1b2635",
        strokeWidth: 3,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        axisBorder: {
          color: "#55596e",
          show: true,
        },
        axisTicks: {
          color: "#55596e",
          show: true,
        },
        labels: {
          offsetY: 5,
          style: {
            colors: "black",
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "Num. of Remaining Tasks",
            style: {
              color: "black",
            },
          },
          labels: {
            style: {
              colors: ["black"],
            },
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
      },
    };

    const series1 = computed(() => [
      {
        data: weekData1.value,
        name: "Tasks Handled",
      },
    ]);

    onMounted(async () => {
      await fetchUserData();
      await fetchProjectCount();
      await fetchTaskCount();
      await fetchCompletedTaskCount();
      await fetchCompletedTasksThisWeek();
      await fetchRemainingTasksThisWeek();
    });
    return {
      name,
      email,
      profileImage,
      chartOptions,
      series,
      chartOptions1,
      series1,
      totalProjectsHandled,
      totalTasksHandled,
      totalPercentageTasksCompleted,
      totalWorkingHours,
    };
  },
};
</script>

<style scoped>
.material-icons-outlined {
  vertical-align: middle;
  line-height: 1px;
  font-size: 35px;
}

.material-symbols-outlined {
  vertical-align: middle;
  line-height: 1px;
  font-size: 35px;
}
.main-container {
  grid-area: main;
  overflow-y: auto;
  padding: 20px 20px;
  color: black;
}

.main-title {
  display: flex;
  justify-content: space-between;
}

.main-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  border-radius: 5px;
}

.card:first-child {
  border-left: 4px solid #2962ff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card:nth-child(2) {
  border-left: 4px solid #ff6d00;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card:nth-child(3) {
  border-left: 4px solid #2e7d32;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card:nth-child(4) {
  border-left: 4px solid #d50000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card:hover {
  transform: scale(1.05);
  transition: all ease 0.2s;
}

.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-inner > .material-icons-outlined {
  font-size: 45px;
}

.card-inner > .material-symbols-outlined {
  font-size: 45px;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 60px;
}

.charts-card {
  background-color: white;
  margin-bottom: 20px;
  padding: 25px;
  box-sizing: border-box;
  -webkit-column-break-inside: avoid;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.chart-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.profile-image {
  border-radius: 50%;
  height: 96px;
  width: auto;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.name {
  color: black;
  margin-bottom: 5px;
  text-transform: Capitalize;
  font-size: 20px;
}

.email {
  color: grey;
  font-size: 16px;
}
</style>
