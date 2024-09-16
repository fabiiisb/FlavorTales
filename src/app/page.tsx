import Landing from "@/components/Landing";
import CardList from "@/components/RecipeList";

export default function Home() {
  return (
    <>
      <Landing />
      <div className="p-3">
        <CardList />
      </div>
    </>
  );
}
