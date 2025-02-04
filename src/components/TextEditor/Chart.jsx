import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const Chart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Word Count",
        data: [50, 120, 300, 500],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.2,
      },
    ],
  };

  return <Line data={data} />;
};

export default Chart;
