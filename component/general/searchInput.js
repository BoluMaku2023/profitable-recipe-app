import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const SearchInput = ({ searchClicked, onSearchChanged, search_value }) => {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        searchClicked(event);
      }
    };
  });

  return (
    <div className="relative flex h-14 w-full max-w-700 rounded-lg border border-purpleLigther/10 shadow-md outline-none">
      <input
        value={search_value}
        type="text"
        name="searchTerm"
        onChange={onSearchChanged}
        placeholder="Enter a search term"
        className="h-full w-full rounded-lg border-none px-6 text-sm outline-none placeholder:text-purpleLigther/40"
      />
      <button
        className="absolute right-0 top-0 flex h-full w-11 items-center justify-center bg-none text-purpleLigther outline-none "
        onClick={(e) => searchClicked(e)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
