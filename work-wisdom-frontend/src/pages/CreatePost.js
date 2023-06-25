import { useEffect, useState } from "react";
import Button from "../components/Button";
import { clearPostCreatedStatus, createPost } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPost(formData));
    toast.success("Created Post Successfully!");
    try {
    } catch (error) {}
  };

  const { isPostCreating, isPostCreatedError, isPostCreatedSuccess } =
    useSelector((state) => state.posts);

  useEffect(() => {
    setFormData({
      title: "",
      content: "",
    });

    dispatch(clearPostCreatedStatus());
  }, [isPostCreatedSuccess]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-10">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Share Your Interview Experience
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Contribute to the Community by Sharing Your Insights and Tips
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                    <input
                      value={formData.title}
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Write a title for your post"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.content}
                    id="content"
                    name="content"
                    rows={6}
                    placeholder="Enter your content here"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <Button
            disabled={isPostCreating}
            type="submit"
            text={`${isPostCreating ? "Creating" : "Save"}`}
          />
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
