import React from "react";
import profileImg from "../../assets/images/profile.avif"

const EditProfile = () => {
  return <div className="w-[70%] px-40 flex flex-col items-center py-8">
    <p className="self-start">Edit Profile</p>
    <div className="flex flex-col w-full gap-12">
      <div className="flex w-[80%] bg-[#262626] p-6 rounded-3xl items-center justify-between">
        <div className="flex items-center gap-6">
          <img className="w-12 rounded-[50%]" src={profileImg} alt="bg-transparent" />
          <div>
            <p className="font-semibold">lokesh_kataria</p>
            <p className="text-sm text-[#F5F5F5]">Lokesh</p>
          </div>
        </div>
        <button className="bg-blue-500 px-4 py-1 rounded-lg text-sm font-semibold" type="submit">Change photo</button>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <p>Full Name</p>
        <input className="p-4 bg-transparent border rounded-lg" type="text" placeholder="Full Name"/>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <p>Username</p>
        <input className="p-4 bg-transparent border rounded-lg" type="text" placeholder="Username"/>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <p>Bio</p>
        <input className="p-4 bg-transparent border rounded-lg" type="text" placeholder="Bio"/>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <p>Gender</p>
        <select className="p-4 bg-transparent border rounded-lg" name="gender" id="gender">
          <option className="bg-black" value="male">Male</option>
          <option className="bg-black" value="female">Female</option>
          <option className="bg-black" value="prefer">Prefer not to say</option>
        </select>
      </div>
    </div>
  </div>;
};

export default EditProfile; 
