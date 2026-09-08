import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = stats
    ? [
        { title: "Total Users", value: stats.totalUsers },
        { title: "Total Sellers", value: stats.totalSellers },
        { title: "Total Products", value: stats.totalProducts },
        { title: "Total Orders", value: stats.totalOrders },
      ]
    : [];

  return (
    <div>
      <h2 className="text-3xl font-bold text-yellow-500 mb-8">
        Admin Dashboard
      </h2>

      {loading ? (
        <p className="text-yellow-300">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="p-6 rounded-2xl bg-black/50 border border-yellow-600/40 
              hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300"
            >
              <h3 className="text-lg text-gray-300">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2 text-white">
                {stat.value ?? 0}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Dashboard;
