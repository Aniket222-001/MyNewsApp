import React from "react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  authorFilter,
  setAuthorFilter,
  typeFilter,
  setTypeFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <input
          type="text"
          placeholder="Filter by author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by type</option>
          <option value="news">News</option>
          <option value="blog">Blogs</option>
        </select>
        <div className="flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
