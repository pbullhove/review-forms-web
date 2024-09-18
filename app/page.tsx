"use client";


import { useEffect, useState } from 'react';

interface FormItem {
  type: 'h1' | 'h2' | 'question';
  content?: string;
  id?: string;
  label?: string;
  inputType?: 'text' | 'textarea' | 'checkbox' | 'radio';
}
interface FormPage {
  page: number;
  content: FormItem[];
}

export default function Home() {
  const [formData, setFormData] = useState<FormPage[] | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      });
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const totalPages = formData?.length || 0;
  const currentPage = formData?.[currentPageIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <form>
          {currentPage?.content.map((item: FormItem, index: number) => {
            if (item.type === 'h1') {
              return (
                <h1
                  key={index}
                  className="text-2xl font-semibold mb-6 text-gray-800"
                >
                  {item.content}
                </h1>
              );
            } else if (item.type === 'h2') {
              return (
                <h2
                  key={index}
                  className="text-xl font-semibold mt-8 mb-4 text-gray-700"
                >
                  {item.content}
                </h2>
              );
            } else if (item.type === 'question') {
              return (
                <div className="mb-5" key={index}>
                  <label
                    htmlFor={item.id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {item.content}
                  </label>
                  {item.inputType === 'text' ? (
                    <input
                      type="text"
                      id={item.id}
                      className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : item.inputType === 'textarea' ? (
                    <textarea
                      id={item.id}
                      rows={4}
                      className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  ) : null}
                </div>
              );
            } else {
              return null;
            }
          })}

          <div className="flex justify-between mt-8">
            {currentPageIndex > 0 && (
              <button
                type="button"
                onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
            )}
            {currentPageIndex < totalPages - 1 && (
              <button
                type="button"
                onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
                className="ml-auto flex items-center text-blue-500 hover:text-blue-700"
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
