import { NextPage } from "next";
import path from "path";
import fs from "fs";

interface Props {
  products: [products];
}
interface products {
  id: string;
  title: string;
}

const HomePage: NextPage<Props> = ({ products }) => {
  return (
    <ul>
      {products.map((item) => {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};


export async function getStaticProps() {
  // 프로젝트 빌드시 실행되어 html을 만듬 이후 작동 안함
// revalidate 로 html 사전 렌더 주기 설정할수 있음

  //목데이터 주소 가져오기
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "dummy-backend.json"
  );
  //목데이터 읽어온후 json 으로 변경
  const jsonData = await fs.promises.readFile(filePath);

  const data = JSON.parse(jsonData.toString());

  // 데이터 없을때 리다이렉ㅌ므
  if(!data) {
    return {
      redirect : {
        destination : '/no-data'
      }
    }
  }

  if(data.products.length === 0){
    return {notFound: true}
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10
  };
}

export default HomePage;
