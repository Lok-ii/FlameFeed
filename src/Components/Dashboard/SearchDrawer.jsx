import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { searchUsers } from "../../Redux/searchSlice";

const SearchDrawer = () => {
  const { searchResults } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="text-white w-[100%] border-b-[1px] border-gray-800 p-6 flex flex-col gap-8">
        <h1 className="text-lg font-semibold">Search</h1>
        <div className="w-[100%] flex items-center justify-center">
          <div className="relative w-[100%] min-w-[200px] h-12">
            <div className="absolute grid w-5 h-5 place-items-center text-gray-400 top-2/4 right-3 -translate-y-2/4">
              <IoIosCloseCircle />
            </div>
            <input
              className="peer w-full h-full bg-zinc-800 text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
            placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-gray-200 focus:border-gray-900"
              placeholder=" "
              onChange={(e) => {
                setTimeout(() => {
                  dispatch(
                    searchUsers({
                      type: "SEARCHING",
                      searchInput: e.target.value,
                    })
                  );
                }, 3000)
              }}
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Search
            </label>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2>Recents</h2>
        <div className="recents flex flex-col gap-4 pt-4">
          {searchResults.length !== 0 &&
            searchResults.map((user) => {
              return (
                <div key={user.id} className="userProfile flex items-center gap-4">
                  <Link to={`/dashboard/profile/${user.username}`}>
                    <img
                      src={user.photoURL}
                      className="w-[2rem] h-[2rem] rounded-[50%]"
                      alt=""
                    />
                  </Link>
                  <div className="userName">
                    <Link to={`/dashboard/profile/${user.username}`}>
                      <h2 className="font-semibold text-sm">{user.username}</h2>
                    </Link>
                    <p className="text-xs">{user.displayName}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
