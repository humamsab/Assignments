import { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import { toast } from "react-hot-toast";


enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  GoogleDocs = "gdocs",
  PDF = "pdf",
  Link = "link"
}

export function CreateContentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    try {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        link,
        title,
        type
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      toast.success(" Content added!");
      onClose();
    } catch (e: any) {
      toast.error(" Failed to add content");
    }
  }

  if (!open) return null;

  return (
    <div>
      
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

     
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
        <div className="flex flex-col justify-center">
          <span className="bg-white opacity-100 p-4 rounded fixed">
            
            
            <div className="flex justify-end">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>

            
            <div>
              <Input ref={titleRef} placeholder={"Title"} />
              <Input ref={linkRef} placeholder={"Link"} />
            </div>

            
            <div>
              <h1 className="font-semibold mt-2 mb-1">Type</h1>
              <div className="flex gap-2 flex-wrap justify-center pb-2">
                {Object.values(ContentType).map((ct) => (
                  <Button
                    key={ct}
                    text={ct.charAt(0).toUpperCase() + ct.slice(1)} // make label pretty
                    variant={type === ct ? "primary" : "secondary"}
                    onClick={() => setType(ct as ContentType)}
                  />
                ))}
              </div>
            </div>

           
            <div className="flex justify-center">
              <Button onClick={addContent} variant="primary" text="Submit" />
            </div>
          </span>
        </div>     
      </div>
    </div>
  );
}