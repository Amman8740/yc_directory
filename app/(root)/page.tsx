import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id)

  // const posts = await client.fetch(STARTUP_QUERY);
  const {data: posts} = await sanityFetch({query: STARTUP_QUERY, params})
  // console.log(JSON.stringify(posts,null,2))

  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 66,
  //   author: { _id: 1, name: 'Amman' },
  //   _id: 2,
  //   description: "This is a description",
  //   image:"https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "progrramming",
  //   title: "This is the title"
  // }]
  return (
    <>
    <section className="pink_container">
    <h1 className="heading">Pith Your Startup, <br /> Connect With Entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl">
      Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
    </p>
    <SearchForm query={query}/>
    </section>
    <section className="section_container">
    <p className="text-30-semibold">
      {query ? `Search Results for "${query}"` : 'All Startups'}
    </p>
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post: StartupTypeCard)=>(
          <StartupCard key={post?._id} post={post}/>
        ))
      ):(
        <p className="no-results">No Startups Found</p>
      )}
    </ul>
    </section>
    <SanityLive/>
    </>
  );
}
