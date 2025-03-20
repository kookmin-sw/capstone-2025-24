import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const DoughnutData: ChartData<'doughnut'> = {
  labels: ['화재', '폭행', '쓰러짐', '흉기난동', '군중밀집'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [21, 9, 7, 4, 1],
      backgroundColor: ['#F08676', '#A7C972', '#79A4E8', '#7ED1C1', '#EBC266'],
      hoverOffset: 5,
    },
  ],
};


const DoughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 2000, // 애니메이션 지속 시간
      easing: 'easeInOutQuad', // 애니메이션 이징 함수
    },
    plugins: {
      legend: {
        display: false, // 차트 상단의 라벨 표시
      },
    },
  };


const DoughnutChart = () => {
  return <div>
    <Doughnut data={DoughnutData} options={DoughnutOptions}/>
  </div>
};

export default DoughnutChart;
