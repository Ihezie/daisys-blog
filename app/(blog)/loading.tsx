const loading = () => {
  return (
    <section className="fixed w-full h-full top-0 right-0 bg-black/75 z-[90]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="lds-dual-ring z-[200]"></div>
      </div>
    </section>
  );
};
export default loading;
