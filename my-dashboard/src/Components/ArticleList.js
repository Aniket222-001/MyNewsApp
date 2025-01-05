import React from "react";

const ArticleList = ({ filteredArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {filteredArticles.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
        >
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title || "Article Image"}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {article.title || "No Title"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Author:</span> {article.author || "Unknown"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Published:</span>{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
