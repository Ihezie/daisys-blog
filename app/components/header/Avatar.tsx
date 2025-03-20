import Image from "next/image";

const Avatar = ({
  image,
  showMenu,
}: {
  image: string | null | undefined;
  showMenu: boolean;
}) => {
  return (
    <div
      className={`size-[38px] rounded-full overflow-hidden relative border-2 border-white hover:border-secondary cursor-pointer z-[100] ${showMenu ? "border-secondary" : ""}`}
    >
      <Image
        src={image || "/default-profile.jpg"}
        alt="User Avatar"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};
export default Avatar;
