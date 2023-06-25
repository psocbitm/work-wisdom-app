import { useSelector } from "react-redux";

export default function ExperiencesPage() {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-10">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From inside the Interview Room: Real Stories, Real Strategies
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Get Inspired and Elevate Your Interview Game with Authentic
          Experiences and Proven Tips
        </p>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-100 flex flex-col gap-y-5"
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          >
            <dt className="text-sm font-medium leading-6 text-gray-900">
              <div>{post.title}</div>
              <div className="text-slate-500 mt-2">By: {post.author.name}</div>
              <div className="text-slate-500 text-xs text-light mt-2">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {post.content}
            </dd>
          </div>
        ))}
      </ul>
    </div>
  );
}
