"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ prompts, handleTagClick }) => {
  return prompts.map((prompt) => (
    <PromptCard
      key={prompt?._id}
      post={prompt}
      handleTagClick={handleTagClick}
    />
  ));
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("api/prompt");
        // console.log("response", response);
        const prompts = await response.json();
        // console.log("feed prompts", prompts);
        setPost(prompts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrompts();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e?.target?.value);
  };

  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          className="search_input peer"
          placeholder="Search for tag or username..."
          value={searchText}
          onChange={handleSearch}
        />
      </form>

      <PromptCardList prompts={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
