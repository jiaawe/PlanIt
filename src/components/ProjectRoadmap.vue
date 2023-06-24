<template>
  <div>
    <div>
      <h1 class="tagline">Project Roadmap</h1>
      <p class="title">{{ projectTitle }}</p>
      <p class="description">{{ projectDescription }}</p>
      <hr />
    </div>
    <div v-if="isLoading" class="loading-spinner"></div>
    <div v-else-if="tasksEmpty" class="message">
      No task is found under this project
    </div>
    <div v-else class="chart-container">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { db } from "@/firebase/firebase";
import Highcharts from "highcharts";
import xrangeModule from "highcharts/modules/xrange";

// Initialize the xrange module with Highcharts
xrangeModule(Highcharts);

function parseDate(dateObject) {
  const date = new Date(dateObject);
  const formattedDateString = date.toISOString();
  return new Date(Date.parse(formattedDateString));
}

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const projectTitle = ref("");
    const projectDescription = ref("");
    const tasks = ref([]);
    const isLoading = ref(true);

    // Get the project title
    const fetchProjectTitle = async () => {
      const projectSnapshot = await db
        .collection("Project")
        .doc(String(props.id))
        .get();
      const projectData = projectSnapshot.data();
      if (projectData) {
        projectTitle.value = projectData.name;
        projectDescription.value = projectData.description;
      }
    };

    const chartOptions = reactive({
      chart: {
        type: "xrange",
        backgroundColor: "#fff",
      },
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        lineWidth: 1,
        lineColor: "#5c5c5c",
      },
      yAxis: {
        title: {
          text: "",
        },
        categories: [],
        labels: {
          style: {
            fontSize: "16px",
          },
        },
        gridLineColor: "#d9d9d9",
      },
      series: [
        {
          name: "Tasks",
          data: tasks.value,
          pointWidth: 20,
          color: "var(--primary)",
          borderRadius: 5,
          borderColor: "#6c757d",
          borderWidth: 1,
        },
      ],
      tooltip: {
        headerFormat: "",
        pointFormatter: function () {
          return `<b>${
            this.series.yAxis.categories[this.y]
          }</b><br>${Highcharts.dateFormat(
            "%e. %b",
            this.x
          )} - ${Highcharts.dateFormat("%e. %b", this.x2)}`;
        },
        borderColor: "var(--primary)",
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
          },
        },
      },
      credits: {
        enabled: false,
      },
    });

    // Get the project's title, start date, and end date

    const fetchData = async (projectID) => {
      isLoading.value = true;
      const taskCollection = db.collection("Task");
      const querySnapshot = await taskCollection
        .where("projectID", "==", projectID)
        .get();

      const tasksData = [];
      const categories = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        categories.push(task.title);
        tasksData.push({
          x: parseDate(task.openedTimestamp.toDate()).getTime(),
          x2: parseDate(task.deadline.toDate()).getTime(),
          y: categories.length - 1,
        });
      });

      tasks.value = tasksData;
      chartOptions.yAxis.categories = categories;
      chartOptions.series[0].data = tasks.value;
      isLoading.value = false;
    };

    onMounted(() => {
      fetchData(String(props.id));
      fetchProjectTitle();
    });

    const tasksEmpty = computed(() => tasks.value.length === 0);

    return {
      tasks,
      chartOptions,
      fetchData,
      isLoading,
      projectTitle,
      projectDescription,
      tasksEmpty,
    };
  },
};
</script>

<style scoped>
.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid var(--primary);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  position: absolute;
  top: 60%;
  left: 60%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

hr {
  border-top: 5px solid var(--primary);
  width: 300px;
  margin: 12px auto 6px auto;
}

.tagline {
  margin: 24px 0;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -1px;
  text-align: center;
}

.title {
  margin: 24px 0;
  font-size: 72px;
  line-height: 1.1;
  letter-spacing: -1px;
  text-align: center;
}

.description {
  margin: 24px 0;
  font-size: 16px;
  line-height: 1.1;
  letter-spacing: -1px;
  text-align: center;
}

.message {
  margin: 24px 0;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -1px;
  text-align: center;
}

.chart {
  max-width: 90%;
  margin: 0 auto;
}

.chart-container {
  max-width: 95%;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
