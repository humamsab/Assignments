import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import Card from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import { toast } from "react-hot-toast";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  // Keep your existing refresh behavior (runs on mount and when modal toggles)
  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  // Fetch logged-in user's name once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) setUsername(data.username);
      } catch (e: any) {
        if (e.response?.status === 401) {
          toast.error("Session expired. Please sign in again.");
        } else {
          console.error(e);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredContents = filter ? contents.filter(c => c.type === filter) : contents;

  return (
    <div>
      <Sidebar setFilter={setFilter} />
      {/* on mobile no sidebar → ml-0, desktop → ml-72 */}
      <div className="p-4 md:ml-72 min-h-screen bg-gray-100">
        {/* Welcome bar */}
        <div className="text-2xl font-bold text-gray-800 mb-4">
           Welcome, {username || "User"}
        </div>

        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Sharable link copied!");
              } catch (e: any) {
                toast.error("Failed to create share link");
              }
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        {/* ⚡ Responsive card grid */}
        <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredContents.map(c => (
            <Card key={c._id} type={c.type} link={c.link} title={c.title} />
          ))}
        </div>
      </div>
    </div>
  );
}