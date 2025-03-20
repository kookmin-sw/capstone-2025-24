// import { Doughnut } from "react-chartjs-2";
import * as S from "./DoughnutCard.style";
import DoughnutChart from "./DoughnutChart";

interface DoughnutCardProps {
    title?: string;
}
const DoughnutCard = ({title}:DoughnutCardProps) => {
    return (
        <S.DoughnutCardLayout>
            <S.TitleP>{title}</S.TitleP>
            <DoughnutChart/>
        </S.DoughnutCardLayout>
    )
}

export default DoughnutCard;