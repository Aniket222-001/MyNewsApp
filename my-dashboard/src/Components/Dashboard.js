import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Login from "./Login";
import SearchFilter from "./SearchFilter";
import ArticleList from "./ArticleList";
import PayoutCalculation from "./PayoutCalculation";
import ExportOptions from "./ExportOptions";

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ratePerArticle, setRatePerArticle] = useState(10);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "ok") {
          const validArticles = (data.articles || []).filter(
            (article) => article.title && article.urlToImage && article.url && !article.removed
          );
          setArticles(validArticles);
          setFilteredArticles(validArticles);
        } else {
          console.error("Error fetching news:", data.message);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, authorFilter, typeFilter, startDate, endDate]);

  const filterArticles = () => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (authorFilter) {
      filtered = filtered.filter((article) =>
        article.author?.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((article) =>
        article.type?.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((article) => {
        const publishedDate = new Date(article.publishedAt);
        return publishedDate >= new Date(startDate) && publishedDate <= new Date(endDate);
      });
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="p-4">
      <Login handleGoogleLogin={handleGoogleLogin} user={user} />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <ArticleList filteredArticles={filteredArticles} />
      <PayoutCalculation
        ratePerArticle={ratePerArticle}
        setRatePerArticle={setRatePerArticle}
        filteredArticles={filteredArticles}
      />
      <ExportOptions filteredArticles={filteredArticles} />
    </div>
  );
};


export default Dashboard;
