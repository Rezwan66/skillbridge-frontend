export default async function SingleTutorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h2>SingleTutorPage page</h2>
    </div>
  );
}
