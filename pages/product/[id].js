import ProductIndex from "../../component/product/index";
import withAuth from "../../utils/withAuthRefactored";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

function Product({ id }) {
  return (
    <div className="relative h-auto bg-ghostWhite">
      <Head>
        <title>Profitable | {id}</title>
      </Head>

      <ProductIndex id={id} />
    </div>
  );
}

export default withAuth(Product);
