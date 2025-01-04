import React, { useState } from "react";

const TagsInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tags.length < 10) {
      e.preventDefault();
      const newTags = inputValue
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      setTags((prevTags) => [
        ...prevTags,
        ...newTags.filter((tag) => !prevTags.includes(tag)),
      ]);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "") {
      setTags((prevTags) => prevTags.slice(0, prevTags.length - 1));
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Input Field */}
      <div className="relative border border-input rounded-md p-2 flex items-center flex-wrap gap-2 ">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center px-3 py-1 bg-secondary rounded-full text-sm"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(index)}
              className="ml-2 text-xs bg-transparent hover:text-muted-foreground focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            tags.length < 10
              ? "Add tags (comma or Enter)..."
              : "Maximum tags reached"
          }
          disabled={tags.length >= 10}
          className="flex-grow border-none bg-transparent focus:outline-none text-foreground"
        />
      </div>
      {/* Helper Text */}
      <p className="mt-2 text-sm text-muted-foreground">
        Press <kbd className="bg-muted px-1 rounded">Enter</kbd> or{" "}
        <kbd className="bg-muted px-1 rounded">,</kbd> to add tags and{" "}
        <kbd className="bg-muted px-1 rounded">Backspace</kbd> to remove tags.
      </p>
    </div>
  );
};

export default TagsInput;
