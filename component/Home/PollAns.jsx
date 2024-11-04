import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoShareSocial } from "react-icons/io5";
import ShareComponent from "./SharedComonnent";

const PolllAns = () => {
  const [polls, setPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [showPercentage, setShowPercentage] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          `https://api.discoveryindianews.com/api/v1/poll/get`
        );
        setPolls(response.data);

        // Load voted polls from localStorage
        const storedVotedPolls =
          JSON.parse(localStorage.getItem("votedPolls")) || [];
        setVotedPolls(new Set(storedVotedPolls));
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionId) => {
    // Check if the user has already voted on this poll
    if (votedPolls.has(pollId)) {
      alert("You have already voted on this poll.");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/poll/vote/${pollId}`,
        {
          optionId,
        }
      );

      const updatedPolls = polls.map((poll) => {
        if (poll._id === pollId) {
          const totalVotes = poll.options.reduce(
            (acc, curr) => acc + curr.votes,
            0
          );
          const updatedOptions = poll.options.map((option) => {
            if (option._id === optionId) {
              return {
                ...option,
                votes: option.votes + 1,
                percentage: ((option.votes + 1) / (totalVotes + 1)) * 100,
              };
            } else {
              return {
                ...option,
                percentage: (option.votes / (totalVotes + 1)) * 100,
              };
            }
          });
          return {
            ...poll,
            options: updatedOptions,
          };
        }
        return poll;
      });
      setPolls(updatedPolls);

      // Update voted polls in state and localStorage
      const newVotedPolls = new Set(votedPolls);
      newVotedPolls.add(pollId);
      setVotedPolls(newVotedPolls);
      localStorage.setItem("votedPolls", JSON.stringify([...newVotedPolls]));

      setShowPercentage(optionId); // Show percentage temporarily
      setTimeout(() => setShowPercentage(""), 5000); // Hide percentage after 5 seconds
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    // Scroll to the section if there's a hash in the URL
    const scrollToHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 1000); // Delay of 1 second
        }
      }
    };

    scrollToHash();

    // Handle hash change (e.g., when the URL hash changes while the component is mounted)
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="flex justify-center p-4" id="pollsvote">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col my-10">
          <h2 className="text-2xl font-bold text-center uppercase">
            Let&apos;s Vote
          </h2>
        </div>
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-md"
          >
            <ShareComponent question={poll.question} />
            <h3 className="text-xl font-semibold mb-2">{poll.question}</h3>
            <ul>
              {poll.options.map((option) => (
                <li
                  key={option._id}
                  className={`py-2 cursor-pointer mb-5 ${
                    votedPolls.has(poll._id)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-300"
                  }`}
                  onClick={() => handleVote(poll._id, option._id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option.text}</span>
                    <span className="text-gray-600">{option.votes} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-yellow-500 h-4 rounded-full transition-width duration-300 ease-in-out"
                      style={{
                        width: `${option.percentage || 0}%`,
                      }}
                    ></div>
                  </div>
                  {option.percentage !== undefined && (
                    <span
                      className={`text-gray-600 text-sm ${
                        showPercentage === option._id ? "" : "hidden"
                      }`}
                    >
                      ({option.percentage.toFixed(2)}%)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolllAns;
