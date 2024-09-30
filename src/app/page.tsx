import PokemonList from "@/components/pokemon/List";
import Pagination from "@/components/common/Pagination";

// The main Home component, retrieves the page number from the search parameters.
function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const pageNumberParam = searchParams.page;
  const pageNumber = pageNumberParam ? Number(pageNumberParam) : 1;
  const limit = 21;
  const totalPages = Math.ceil(151 / limit); // 151 pokémon

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-20 gap-8 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <PokemonList pageNumber={pageNumber} />
        <Pagination currentPage={pageNumber} totalPages={totalPages} />
      </main>
    </div>
  );
}

export default Home;
