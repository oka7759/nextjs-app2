import { NextPage, GetStaticPropsContext, GetStaticPaths } from "next";
import path from "path";
import fs from "fs";

interface Props {
  loadedProduct: loadedProduct;
}
interface loadedProduct {
  id: string;
  title: string;
  description: string;
}

const ProductDetailPage: NextPage<Props> = ({ loadedProduct }) => {
  return (
    <>
      <h1>{loadedProduct.id}</h1>
      <h1>{loadedProduct.description}</h1>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const productId = params?.pid;
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "dummy-backend.json"
  );

  const jsonData = await fs.promises.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  const product: loadedProduct | undefined = data.products.find(
    (product: loadedProduct) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}
//동적 페이지에 사전에 몇개의 페이지를 만들지 정의
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
