import Head from "next/head";
import ShoppingListIndex from "../../component/order/shoppinglist";
import withAuth from "../../utils/withAuthRefactored";

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

function ShoppingList({ id }) {
  return (
    <div className="bg-ghostWhite">
      <Head>
        <title>shoppinglist | {id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingListIndex id={id} />
    </div>
  );
}

export default withAuth(ShoppingList);
