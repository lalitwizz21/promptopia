import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  // console.log("data", data);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {data?.length
        ? data.map((prompt) => (
            <PromptCard
              key={prompt?._id}
              post={prompt}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleTagClick
            />
          ))
        : null}
    </section>
  );
};

export default Profile;
