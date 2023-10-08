import RecipeIndex from "../../component/recipe/index";
import withAuth from "../../utils/withAuthRefactored";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

function Recipe({ id }) {
  return (
    <>
      <Head>
        <title>profitable | recipe</title>
      </Head>
      <div className="bg-ghostWhite">
        <RecipeIndex id={id} />
      </div>
    </>
  );
}

export default withAuth(Recipe);
