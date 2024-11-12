// useQueryフックは、GraphQLのデータをUIと共有するために使用する。
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title,
      author
    }
  }
`;

const DisplayBooks = () => {
	const { loading, error, data } = useQuery(GET_BOOKS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return data.books.map(
		({ title, author }: { title: string; author: string }) => (
			<div key={title}>
				<h3>{title}</h3>
				<p>author: {author}</p>
				<br />
			</div>
		),
	);
};

export { DisplayBooks };
