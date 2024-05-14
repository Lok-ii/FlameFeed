import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthentication, handlePhoto } from "../../Redux/AuthSlice";

const EditProfile = () => {
  const [file, setFile] = useState(null);
  const fullNameRef = useRef("");
  const usernameRef = useRef("");
  const bioRef = useRef("");
  const genderRef = useRef("");
  const { user, photoURL } = useSelector((store) => store.auth);
  const { allPosts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  return (
    <div className="w-full px-4 md:w-[100%] md:px-40 mb-16 flex flex-col items-center py-8 gap-8">
      <p className="self-start">Edit Profile</p>
      <div className="flex flex-col w-full gap-12">
        <div className="flex w-full md:w-[80%] bg-[#262626] p-6 rounded-3xl items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="">
              <label htmlFor="profilePhoto" className=" cursor-pointer">
                <img
                  className="w-12 h-12 rounded-[50%]"
                  src={photoURL}
                  alt="bg-transparent"
                />
              </label>
              <input
                type="file"
                id="profilePhoto"
                accept=".jpg,.jpeg,.png,.webp,.avif"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  const fileTempURL = URL.createObjectURL(e.target.files[0]);
                  dispatch(handlePhoto(fileTempURL));
                  setFile(file);
                }}
              />
            </div>
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-[#F5F5F5]">{user.displayName}</p>
            </div>
          </div>
          <label
            htmlFor="profilePhoto"
            className="bg-blue-500 px-4 py-1 rounded-lg text-sm font-semibold cursor-pointer"
            type="submit"
          >
            Change photo
          </label>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[80%]">
          <p>Full Name</p>
          <input
            className="p-4 bg-transparent border rounded-lg"
            type="text"
            placeholder="Full Name"
            ref={fullNameRef}
            defaultValue={user.displayName}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[80%]">
          <p>Username</p>
          <input
            className="p-4 bg-transparent border rounded-lg"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            defaultValue={user.username}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[80%]">
          <p>Bio</p>
          <input
            className="p-4 bg-transparent border rounded-lg"
            type="text"
            placeholder="Bio"
            ref={bioRef}
            defaultValue={user.bio}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[80%]">
          <p>Gender</p>
          <select
            className="p-4 bg-transparent border rounded-lg"
            name="gender"
            id="gender"
            ref={genderRef}
            defaultValue={user.gender}
          >
            <option className="bg-black" value="male">
              Male
            </option>
            <option className="bg-black" value="female">
              Female
            </option>
            <option className="bg-black" value="prefer">
              Prefer not to say
            </option>
          </select>
        </div>
      </div>
      <div className="w-full md:w-[60%] flex items-center justify-center md:justify-end">
        <button
          className="bg-blue-500 px-24 py-3 rounded-lg text-sm font-semibold"
          onClick={async () => {
            await dispatch(
              userAuthentication({
                type: "PROFILE",
                email: user.email,
                password: "",
                dispatch,
                username: usernameRef.current.value,
                fullName: fullNameRef.current.value,
                bio: bioRef.current.value,
                gender: genderRef.current.value,
                photoURL: photoURL,
                file: file,
                storedUser: user,
                allPosts,
              })
            );
            setFile(null);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
