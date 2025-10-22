import { useRef } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    async function signup() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            
            toast.success(" Signed up successfully!");
            navigate("/signin");
        } catch (e: any) {
            toast.error(e.response?.data?.message || " Signup failed");
        }
    }

    return (
      <div className="h-screen w-screen bg-sky-300 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
          <Input ref={usernameRef} placeholder="Username" />
          <Input ref={passwordRef} placeholder="Password" type="password" />
          <div className="flex justify-center pt-4">
            <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
          </div>
        </div>
      </div>
    );
}