import React, { useState } from "react";
import { InputField } from "../Components/InputField/InputField";
// import { InputField } from "../components/InputField";

interface Props {
  theme: "light" | "dark";
}

export default function InputPage({ theme }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.includes("@")) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(`Form submitted ✅\nUsername: ${username}\nEmail: ${email}`);
    }
  };

  return (
    <form className={`inputpage-container ${theme}`} onSubmit={handleSubmit}>
      <h2 className="page-title">✨ Beautiful Input Fields</h2>

      <InputField
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e: any) => setUsername(e.target.value)}
        helperText="This will be public"
        errorMessage={errors.username}
        clearable
        theme={theme}
      />

      <InputField
        label="Email"
        placeholder="Enter email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        errorMessage={errors.email}
        variant="filled"
        theme={theme}
      />

      <InputField
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        type="password"
        helperText="At least 6 characters"
        errorMessage={errors.password}
        theme={theme}
      />

      <InputField
        label="Disabled Input"
        placeholder="Can't type here"
        disabled
        theme={theme}
      />

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}
