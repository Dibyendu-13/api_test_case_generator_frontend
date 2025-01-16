import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box, Paper, Divider } from "@mui/material";
import Lottie from "react-lottie"; // Import Lottie
import loadingAnimation from './lottieAnimation.json'; // Path to your Lottie animation file

const App = () => {
  const [testCases, setTestCases] = useState("");
  const [loading, setLoading] = useState(false);

  // Define sample responses
  const successResponse = {
    status: 200,
    data: [
      {
        id: 1,
        title: "Sample Post",
        body: "This is a sample post.",
      },
    ],
  };

  const errorResponse = {
    status: 404,
    error: "Not Found",
  };

  // Fetch test cases using API
  const fetchTestCases = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/generate-test-cases");
      setTestCases(response.data.testCases);
    } catch (error) {
      console.error("Error fetching test cases:", error);
      setTestCases("Failed to fetch test cases.");
    } finally {
      setLoading(false);
    }
  };

  // Lottie options
  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadingAnimation, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 3 }}>
      {/* Header Section */}
      <Box sx={{ marginBottom: 3, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          API Test Case Generator
        </Typography>
        <Typography variant="body1" paragraph>
          This tool generates API test cases for a given endpoint using an open-source LLM.
        </Typography>
      </Box>

      {/* API Details Box */}
      <Box component={Paper} elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          API Details
        </Typography>
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", whiteSpace: "pre-wrap" }}>
          <code>
            Method: GET {"\n"}
            URL: https://jsonplaceholder.typicode.com/posts {"\n"}
            Headers: Authorization: Bearer &lt;token&gt; {"\n"}
            Query Parameters: None {"\n"}
          </code>
        </pre>
      </Box>

      {/* Sample Responses Section */}
      <Box component={Paper} elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Sample Responses</Typography>
        <Divider sx={{ marginY: 2 }} />
        {/* Success Response */}
        <Typography variant="body2" color="textSecondary">
          <strong>Success Response:</strong>
        </Typography>
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", whiteSpace: "pre-wrap" }}>
          <code>{JSON.stringify(successResponse, null, 2)}</code>
        </pre>

        {/* Error Response */}
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          <strong>Error Response:</strong>
        </Typography>
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", whiteSpace: "pre-wrap" }}>
          <code>{JSON.stringify(errorResponse, null, 2)}</code>
        </pre>
      </Box>

      {/* Generate Test Cases Section */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchTestCases}
          disabled={loading}
          size="large"
          sx={{ width: "30%" }}
        >
          {loading ? "Generating Response..." : "Generate Test Cases"}
        </Button>
      </Box>

      {/* Lottie Animation for loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
          <Lottie options={lottieOptions} height={100} width={100} />
        </Box>
      )}

      {/* Response Display Below Content */}
      {testCases && (
        <Box
          sx={{
            padding: 2,
            background: "#f4f4f4",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            maxHeight: "400px", // Set a fixed height
            overflowY: "auto",  // Make it scrollable if content overflows
          }}
        >
          <Typography variant="h6">Generated Test Cases</Typography>
          <pre>
            <code>{testCases}</code>
          </pre>
        </Box>
      )}
    </Container>
  );
};

export default App;