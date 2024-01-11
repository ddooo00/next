// "use client"; //client compo로 하면 js가 disabled되면 useEffect같은 부분은 작동이 안됨 => server compo로 변경해야함! + 보안적으로
// import { useEffect, useState } from "react";
import { Control } from "./Control";
import "./globals.css";
import Link from "next/link";
//meta는 server compo에서만 사용 가능
export const metadata = {
  title: "Web tutorials",
  description: "Generated by ddo00",
};

export default async function RootLayout({ children }) {
  //useState는 기본적으로 client component에서만 사용 가능
  //next는 기본적으로 server compo라고 간주함. => clien로 변경하기
  // const [topics, setTopics] = useState([]);
  // useEffect(() => {
  // fetch("http://localhost:9999/topics")
  //   .then((resp) => resp.json())
  //   .then((result) => {
  //     setTopics(result);
  //   });

  // const resp = await fetch("http:localhost:9999/topics", {
  //   cache: "no-store",
  //   //cache를 쓰지 않겠다.
  // });

  //환경변수에서  주소 가져옴(서버컴포넌트에서만 기본적으로는 사용 가능)
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
    cache: "no-store",
  });
  //next에서는fetch를 사용하면 한번 가져온 정보를 저장함
  const topics = await resp.json();
  //정적인 내용만 next로 전송되니까 용량이 적음(js를 적용하지 않아서) , 이미 받은걸 렌더링하기 때문에 js disabled 되어도 잘 동작함
  // }, []);
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
