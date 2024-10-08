import Landing from "@/components/Landing";
import CardList from "@/components/RecipeList";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <Landing />
      <div className="p-6">
        <CardList recipes={data.data} /> 
      </div>
    </>
  );
}
