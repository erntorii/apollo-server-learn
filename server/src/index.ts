import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// テンプレートリテラルの先頭に #graphql を記載すると、IDEでGraphQL構文のハイライトが表示される。
const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  # type Query でクエリを定義する。
  # ここでは、booksでBook型の配列データを返す。
  type Query {
    books: [Book]
  }
`;

const books = [
	{
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		title: "City of Glass",
		author: "Paul Auster",
	},
];

// Apollo Serverがどのデータセットをクエリで実行するのかを設定する。
// リゾルバは、特定の型に関連するデータの取得方法を定義する。
const resolvers = {
	Query: {
		books: () => books,
	},
};

// Apollo Serverインスタンスの初期化
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// サーバ起動
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
