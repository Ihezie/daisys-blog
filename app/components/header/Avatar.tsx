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
      className={`size-[38px] rounded-full overflow-hidden relative border-2  hover:border-secondary cursor-pointer z-[100] ${showMenu ? "border-secondary" : "border-white"}`}
    >
      <Image
        src={image || "/default-avatar.jpg"}
        alt="User Avatar"
        fill
        sizes="10vw"
      />
    </div>
  );
};
export default Avatar;
