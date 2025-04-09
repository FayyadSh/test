// ------------ Icons ----------------
import { Search } from "lucide-react";
// ------------ Types ----------------
import { TSearchInput } from "@/types";
// ------------ Next.js Form Component ----------------
import Form from 'next/form';

const SearchInput = ({ otherClasses, iconClasses }: TSearchInput) => {
  return (
    // Next.js Form component to enhance form handling and navigation.
    <Form action='/search' className="relative w-full z-10">
      {/* Input field for entering the search query. */}
      <input
        type="text"
        className={`bg-background-secondary-color dark:bg-background-dark-secondary-color py-3 px-4 rounded-lg w-full text-md dark:text-light-color tracking-widest focus:outline-none focus:border-none ${otherClasses}`}
        placeholder="Search For Course"
        name='query'
      />
      {/* Button to trigger the search. */}
      <button type="submit" className={`absolute !right-4 top-2 text-light-color cursor-pointer ${iconClasses}`}>
        {/* Search icon. */}
        <Search />
      </button>
    </Form>
  );
};

export default SearchInput;