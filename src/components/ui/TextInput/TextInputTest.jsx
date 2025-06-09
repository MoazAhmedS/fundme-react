import TextInput from "./TextInput";
import { useState } from "react";

const TextInputTest = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email.length < 5 ? "Email is too short" : ""}
        />
      </div>
    </div>
  );
};

export default TextInputTest;
