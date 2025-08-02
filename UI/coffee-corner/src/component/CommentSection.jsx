import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/comments");
      setComments(res.data.reverse());
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to submit feedback.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/comments",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      console.log("Sending token:", token);
      fetchComments();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="w-full px-6 md:px-20 py-10 bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          💬 What Our Customers Say
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-10"
        >
          <textarea
            className="w-full border border-orange-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            rows="4"
            placeholder="Write your feedback here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="text-right mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-6 py-2 rounded-xl hover:shadow-md transition"
            >
              Submit Feedback
            </button>
          </div>
        </form>

        {/* Comment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No feedback yet. Be the first!
            </p>
          ) : (
            comments.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <img
                    src={`https://i.pravatar.cc/150?img=${(idx % 70) + 1}`} // dummy avatar
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-800 text-sm">{c.text}</p>
                    <p className="text-sm text-orange-600 mt-2 font-semibold">
                      — {c.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(c.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
