import profile from "../../assets/images/profile.avif";

const ProfileIcon = () => {
  return (
    <div className={`w-full h-full rounded-full bg-instaGradient flex items-center justify-center`}>
        <div className="w-[90%] h-[90%] rounded-full">
          <img className="w-full h-full rounded-full" src={profile} alt="" />
        </div>
      </div>
  )
}


export default ProfileIcon
