export default async function userProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl">Profile </h1>
      <hr />
      <p className="text-1xl py-3">
        Profile Page
        <span className="ml-1 bg-sky-900 p-2 border rounded border-none">{id}</span>
      </p>
    </div>
  );
}
