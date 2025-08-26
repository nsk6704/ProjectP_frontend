"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
  Terminal,
  Send,
} from "lucide-react";

// Use the ngrok URL you provided
const API_URL = "https://97fd01647f0b.ngrok-free.app";

export function ProfileForm({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("unknown"); // unknown, online, offline
  const [submitStatus, setSubmitStatus] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isTesting, setIsTesting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    usn: "",
    college_email: user?.primaryEmailAddress?.emailAddress || "",
    personal_email: "",
    dob: "",
    tenth_marks: "",
    twelfth_marks: "",
    cgpa: "",
    backlog_status: false,
    department_id: "",
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Test ngrok connection
  const testNgrokConnection = async () => {
    setIsTesting(true);
    setSubmitStatus({
      type: "info",
      message: "Testing connection to ngrok...",
      details: `Trying to connect to ${API_URL}`,
    });

    try {
      // First, try a simple HEAD request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) {
        setConnectionStatus("online");
        setSubmitStatus({
          type: "success",
          message: "Successfully connected to ngrok!",
          details: `Status: ${response.status} ${response.statusText}`,
        });

        // Now try to load departments as a further test
        await loadDepartments();
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error("Ngrok connection test failed:", error);
      setConnectionStatus("offline");
      setSubmitStatus({
        type: "error",
        message: "Failed to connect to ngrok server",
        details: error.message.includes("aborted")
          ? "Connection timed out. Is your ngrok tunnel running?"
          : error.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Load departments
  const loadDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/departments/`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Departments loaded:", data);
      setDepartments(Array.isArray(data) ? data : []);
      setConnectionStatus("online");

      if (Array.isArray(data) && data.length > 0) {
        setSubmitStatus((prev) => ({
          ...prev,
          details: `${prev?.details || ""}\nLoaded ${
            data.length
          } departments successfully!`,
        }));
      }
    } catch (error) {
      console.error("Failed to load departments:", error);
      setConnectionStatus("offline");

      // Fallback departments
      setDepartments([
        { department_id: 1, name: "Computer Science" },
        { department_id: 2, name: "Information Technology" },
        { department_id: 3, name: "Electronics & Communication" },
        { department_id: 4, name: "Mechanical" },
      ]);
    }
  };

  // Submit form
  // Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSubmitStatus(null);

  try {
    // Validate required fields
    const requiredFields = [
      "name",
      "usn",
      "college_email", 
      "dob",
      "tenth_marks",
      "twelfth_marks",
      "department_id",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Please fill in required fields: ${missingFields.join(", ")}`
      );
    }

    // Prepare data
    const studentData = {
      name: formData.name.trim(),
      usn: formData.usn.trim().toUpperCase(),
      college_email: formData.college_email.trim().toLowerCase(),
      personal_email: formData.personal_email
        ? formData.personal_email.trim().toLowerCase()
        : null,
      dob: formData.dob,
      tenth_marks: parseFloat(formData.tenth_marks),
      twelfth_marks: parseFloat(formData.twelfth_marks),
      cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
      backlog_status: Boolean(formData.backlog_status),
      department_id: parseInt(formData.department_id),
    };

    console.log("🔄 Attempting to send student data to API:", studentData);
    console.log("🔄 API URL:", `${API_URL}/students/`);

    // Use XMLHttpRequest instead of fetch for more detailed error logging
    const xhr = new XMLHttpRequest();
    
    // Create a promise to handle the XHR
    const postData = new Promise((resolve, reject) => {
      xhr.open("POST", `${API_URL}/students/`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("ngrok-skip-browser-warning", "true");
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("✅ API Response:", xhr.responseText);
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.error("❌ API Error Status:", xhr.status);
          console.error("❌ API Error Response:", xhr.responseText);
          reject(new Error(`API Error: ${xhr.status} ${xhr.statusText}`));
        }
      };
      
      xhr.onerror = function() {
        console.error("❌ Network Error!");
        reject(new Error("Network error - Could not connect to API"));
      };
      
      xhr.send(JSON.stringify(studentData));
    });
    
    // Wait for the XHR to complete
    const result = await postData;

    setSubmitStatus({
      type: "success",
      message: "Student profile created successfully!",
      details: `Student ID: ${result.id || result.student_id || "Unknown"}`,
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      usn: "",
      college_email: "",
      personal_email: "",
      dob: "",
      tenth_marks: "",
      twelfth_marks: "",
      cgpa: "",
      backlog_status: false,
      department_id: "",
    });
  } catch (error) {
    console.error("❌ Form submission error:", error);
    
    setSubmitStatus({
      type: "error",
      message: "Failed to submit form to API",
      details: `Error: ${error.message}\nAPI URL: ${API_URL}/students/\nTry using a CORS proxy or updating your ngrok URL.`,
    });
    
    // Store locally as a fallback
    try {
      localStorage.setItem('pendingStudentData', JSON.stringify(formData));
      console.log("💾 Data saved locally as fallback");
    } catch (storageError) {
      console.error("Failed to save to localStorage:", storageError);
    }
  } finally {
    setIsLoading(false);
  }
};
  // Check connection on initial load
  useEffect(() => {
    testNgrokConnection();
  }, []);

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card
        className={`border-4 ${
          connectionStatus === "online"
            ? "border-green-500 bg-green-100"
            : connectionStatus === "offline"
            ? "border-red-500 bg-red-100"
            : "border-yellow-500 bg-yellow-100"
        } rounded-none`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {connectionStatus === "online" ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : connectionStatus === "offline" ? (
                <WifiOff className="h-5 w-5 text-red-600" />
              ) : (
                <RefreshCw
                  className={`h-5 w-5 text-yellow-600 ${
                    isTesting ? "animate-spin" : ""
                  }`}
                />
              )}
              <div>
                <span className="font-bold block">
                  {connectionStatus === "online"
                    ? "Connected to ngrok API"
                    : connectionStatus === "offline"
                    ? "Not connected to ngrok API"
                    : "Checking connection..."}
                </span>
                <span className="text-sm text-gray-600">
                  API URL: {API_URL}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={testNgrokConnection}
                disabled={isTesting}
                className="bg-purple-400 text-black border-2 border-black font-bold"
                size="sm"
              >
                <Terminal className="h-3 w-3 mr-1" />
                TEST CONNECTION
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {submitStatus && (
        <Card
          className={`border-4 ${
            submitStatus.type === "success"
              ? "border-green-500 bg-green-100"
              : submitStatus.type === "error"
              ? "border-red-500 bg-red-100"
              : "border-blue-500 bg-blue-100"
          } rounded-none`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {submitStatus.type === "success" ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : submitStatus.type === "error" ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
              )}
              <div className="flex-1">
                <h3
                  className={`font-black ${
                    submitStatus.type === "success"
                      ? "text-green-800"
                      : submitStatus.type === "error"
                      ? "text-red-800"
                      : "text-blue-800"
                  }`}
                >
                  {submitStatus.type === "success"
                    ? "SUCCESS"
                    : submitStatus.type === "error"
                    ? "ERROR"
                    : "INFO"}
                </h3>
                <p className="font-bold">{submitStatus.message}</p>
                {submitStatus.details && (
                  <p className="text-sm whitespace-pre-line mt-1">
                    {submitStatus.details}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_black]">
          <CardHeader>
            <CardTitle className="font-black uppercase text-xl bg-yellow-300 inline-block px-4 py-2 border-2 border-black">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-black uppercase text-sm">
                  Full Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  USN/Roll Number *
                </Label>
                <Input
                  value={formData.usn}
                  onChange={(e) => handleInputChange("usn", e.target.value)}
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="e.g., 1JS21CS001"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  College Email *
                </Label>
                <Input
                  value={formData.college_email}
                  onChange={(e) =>
                    handleInputChange("college_email", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="your.email@college.edu"
                  type="email"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  Personal Email
                </Label>
                <Input
                  value={formData.personal_email}
                  onChange={(e) =>
                    handleInputChange("personal_email", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="personal@gmail.com"
                  type="email"
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  Date of Birth *
                </Label>
                <Input
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="border-4 border-black rounded-none font-bold mt-2"
                  type="date"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  Department *
                </Label>
                <select
                  value={formData.department_id}
                  onChange={(e) =>
                    handleInputChange("department_id", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold mt-2 w-full p-2 bg-white"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_black]">
          <CardHeader>
            <CardTitle className="font-black uppercase text-xl bg-blue-300 inline-block px-4 py-2 border-2 border-black">
              Academic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="font-black uppercase text-sm">
                  10th Marks (%) *
                </Label>
                <Input
                  value={formData.tenth_marks}
                  onChange={(e) =>
                    handleInputChange("tenth_marks", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="85.5"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  12th Marks (%) *
                </Label>
                <Input
                  value={formData.twelfth_marks}
                  onChange={(e) =>
                    handleInputChange("twelfth_marks", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="87.2"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm">
                  Current CGPA
                </Label>
                <Input
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange("cgpa", e.target.value)}
                  className="border-4 border-black rounded-none font-bold mt-2"
                  placeholder="8.5"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="backlog"
                checked={formData.backlog_status}
                onCheckedChange={(checked) =>
                  handleInputChange("backlog_status", checked)
                }
                className="border-2 border-black"
              />
              <Label htmlFor="backlog" className="font-bold">
                I have active backlogs
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            // disabled={isLoading || connectionStatus !== "online"}
            className="bg-red-400 text-black border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 font-black uppercase text-lg px-12 py-4 transition-all disabled:opacity-50"
          >
            
            
            
              <>
                <Send className="mr-2 h-4 w-4" />
                CREATE PROFILE
              </>
            
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function StudentProfile() {
  return (
    <div className="container mx-auto py-8">
      <ProfileForm user={{ fullName: "Student Name" }} />
    </div>
  );
}
