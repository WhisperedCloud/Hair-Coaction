import React, { useState } from "react";
import axios from "axios";

const UserFormPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      setMessage("✅ Submission successful!");
      setMessageColor("green");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("❌ Submission failed. Please check server.");
      setMessageColor("red");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Submit</button>
        </form>

        {message && (
          <p style={{ ...styles.message, color: messageColor }}>{message}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f9f9ff",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: 500,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4a63ee",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
  },
} as const;

export default UserFormPage;
