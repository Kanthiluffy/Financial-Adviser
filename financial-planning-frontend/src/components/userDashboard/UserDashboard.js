import IncomeFlowchart from './IncomeFlowchart';
import ContainerSection from './ContainerSection';
import PrimaryHome from './PrimaryHome';
import ScoreCard from './ScoreCard';
import Summary from './Summary';
import Articles from './Articles';
const UserDashboard = () => {
    return(
        <div>
            <IncomeFlowchart/>
            <ContainerSection />
            <PrimaryHome />
            <ScoreCard />
            <Summary />
            <Articles/>
        </div>
        
    )
}

export default UserDashboard;