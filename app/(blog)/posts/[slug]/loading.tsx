const loading = () => {
  return (
    <main className="pt-6">
      <div className="rounded-full h-6 w-20 bg-secondary-900 animate-pulse mb-5"></div>
      <div className="flex justify-center items-center gap-5">
        <div className="rounded-full h-7 w-20 bg-secondary-900 animate-pulse"></div>
        <div className="rounded-full h-7 w-20 bg-secondary-900 animate-pulse"></div>
      </div>
      <div className="text-center h-10 w-full mt-8 rounded-full bg-secondary-900 animate-pulse"></div>
      <div className="text-center h-10 w-full mt-2 rounded-full bg-secondary-900 animate-pulse"></div>
      <div className="mt-8 rounded-2xl h-[550px] object-cover bg-secondary-900 animate-pulse"></div>
      <section className="xl:grid xl:grid-cols-[35%_61%] xl:mt-16 xl:gap-[4%]">
        <section className="mt-6 xl:mt-0">
          <div className="xl:sticky xl:top-28">
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  className="rounded-full h-8 w-full bg-secondary-900 animate-pulse mb-3"
                  key={index}
                ></div>
              );
            })}
          </div>
        </section>
        <div className="mt-16 xl:mt-0">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="rounded-full h-6 w-full bg-secondary-900 animate-pulse mb-2"
            ></div>
          ))}
        </div>
      </section>
    </main>
  );
};
export default loading;
