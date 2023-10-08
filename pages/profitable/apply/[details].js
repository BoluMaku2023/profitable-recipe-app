
import ProfitableApplyComponent from '../../../component/profitable/apply'

import withAuth from "../../../utils/withAuthRefactored"

export async function getServerSideProps(context) {
    const {
       details
    } = context.query;
  
    return {
        props: { details }
    }
  }

function ProfitableApply({details}) {
  return <div className="pageHolder">
      <ProfitableApplyComponent apply_details={details} />
  </div>
}

export default withAuth(ProfitableApply);
