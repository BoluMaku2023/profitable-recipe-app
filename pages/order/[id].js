import Head from "next/head";
import OrderIndex from "../../component/order/index";
import withAuth from "../../utils/withAuthRefactored";

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

function Order({ id }) {
  return (
    <>
      <Head>
        <title>Profitable | {id}</title>
      </Head>
      <div className="bg-ghostWhite">
        <OrderIndex id={id} />
      </div>
    </>
  );
}

export default withAuth(Order);
