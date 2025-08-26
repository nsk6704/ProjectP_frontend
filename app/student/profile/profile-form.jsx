"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

// Updated ngrok URL
const API_URL = "https://24afbcb9663b.ngrok-free.app";

export function ProfileForm({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Form data matching your API schema
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
    department_id: 1, // Default to first department
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, backlog_status: checked }));
  };

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
        "personal_email",
        "dob",
        "tenth_marks",
        "twelfth_marks",
        "cgpa",
        "department_id",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in all fields: ${missingFields.join(", ")}`
        );
      }

      // Additional validation
      const tenthMarks = parseFloat(formData.tenth_marks);
      const twelfthMarks = parseFloat(formData.twelfth_marks);
      const cgpa = parseFloat(formData.cgpa);

      if (tenthMarks < 0 || tenthMarks > 100) {
        throw new Error("10th marks should be between 0 and 100");
      }
      if (twelfthMarks < 0 || twelfthMarks > 100) {
        throw new Error("12th marks should be between 0 and 100");
      }
      if (cgpa < 0 || cgpa > 10) {
        throw new Error("CGPA should be between 0 and 10");
      }

      // Prepare data exactly as your API expects
      const studentData = {
        name: formData.name.trim(),
        usn: formData.usn.trim().toUpperCase(),
        college_email: formData.college_email.trim().toLowerCase(),
        personal_email: formData.personal_email.trim().toLowerCase(),
        dob: formData.dob,
        tenth_marks: tenthMarks,
        twelfth_marks: twelfthMarks,
        cgpa: cgpa,
        backlog_status: formData.backlog_status,
        department_id: parseInt(formData.department_id),
      };

      console.log("Sending data:", studentData);

      const response = await fetch(`${API_URL}/students/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json",
        },
        body: JSON.stringify(studentData),
      });

      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: await response.text() };
      }

      if (!response.ok) {
        // Handle specific database errors
        if (response.status === 400 && errorData?.detail) {
          if (errorData.detail.includes("duplicate key value")) {
            throw new Error(
              "A student with this USN or email already exists. Please check your information."
            );
          } else if (errorData.detail.includes("violates unique constraint")) {
            throw new Error(
              "This USN or email is already registered. Please use different credentials."
            );
          } else if (errorData.detail.includes("foreign key constraint")) {
            throw new Error(
              "Invalid department ID. Please check the department ID."
            );
          }
        }

        throw new Error(
          errorData?.detail || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      console.log("Success:", errorData);

      setSubmitStatus({
        type: "success",
        message: "Student profile created successfully!",
        details: `Student ID: ${errorData.id} | USN: ${errorData.usn}`,
      });

      // Reset form after successful submission
      setFormData({
        name: user?.fullName || "",
        usn: "",
        college_email: user?.primaryEmailAddress?.emailAddress || "",
        personal_email: "",
        dob: "",
        tenth_marks: "",
        twelfth_marks: "",
        cgpa: "",
        backlog_status: false,
        department_id: 1,
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to create profile",
        details: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Messages */}
      {submitStatus && (
        <Card
          className={`border-4 ${
            submitStatus.type === "success"
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          } rounded-none shadow-[4px_4px_0px_0px_black]`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {submitStatus.type === "success" ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              )}
              <div>
                <p className="font-bold text-black">{submitStatus.message}</p>
                <p className="text-sm text-black mt-1">
                  {submitStatus.details}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_black]">
          <CardHeader className="bg-yellow-100">
            <CardTitle className="font-black uppercase text-xl bg-yellow-300 inline-block px-4 py-2 border-2 border-black rotate-[-1deg]">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  Full Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  USN *
                </Label>
                <Input
                  value={formData.usn}
                  onChange={(e) =>
                    handleInputChange("usn", e.target.value.toUpperCase())
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="1JS21CS001"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  College Email *
                </Label>
                <Input
                  value={formData.college_email}
                  onChange={(e) =>
                    handleInputChange(
                      "college_email",
                      e.target.value.toLowerCase()
                    )
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="student@college.edu"
                  type="email"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  Personal Email *
                </Label>
                <Input
                  value={formData.personal_email}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_email",
                      e.target.value.toLowerCase()
                    )
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="personal@gmail.com"
                  type="email"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  Date of Birth *
                </Label>
                <Input
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="border-4 border-black rounded-none font-bold h-12"
                  type="date"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  Department ID *
                </Label>
                <Input
                  value={formData.department_id}
                  onChange={(e) =>
                    handleInputChange("department_id", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="1"
                  type="number"
                  min="1"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Academic Information */}
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_black]">
          <CardHeader className="bg-blue-100">
            <CardTitle className="font-black uppercase text-xl bg-blue-300 inline-block px-4 py-2 border-2 border-black rotate-[1deg]">
              Academic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  10th Marks (%) *
                </Label>
                <Input
                  value={formData.tenth_marks}
                  onChange={(e) =>
                    handleInputChange("tenth_marks", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="85.5"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  12th Marks (%) *
                </Label>
                <Input
                  value={formData.twelfth_marks}
                  onChange={(e) =>
                    handleInputChange("twelfth_marks", e.target.value)
                  }
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="87.2"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div>
                <Label className="font-black uppercase text-sm mb-2 block">
                  Current CGPA *
                </Label>
                <Input
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange("cgpa", e.target.value)}
                  className="border-4 border-black rounded-none font-bold h-12"
                  placeholder="8.5"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  required
                />
              </div>
            </div>

            {/* Backlog Status - Fixed Checkbox */}
            <div className="bg-gray-50 border-4 border-gray-300 p-4 rounded-none">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="backlog_status"
                  checked={formData.backlog_status}
                  onCheckedChange={handleCheckboxChange}
                  className="border-4 border-black rounded-none w-6 h-6 data-[state=checked]:bg-red-500 data-[state=checked]:border-black"
                />
                <div>
                  <Label
                    htmlFor="backlog_status"
                    className="font-bold text-base cursor-pointer"
                  >
                    I have active backlogs
                  </Label>
                  <p className="text-sm text-gray-600">
                    Check this box if you currently have any pending backlogs
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-bold">Current status: </span>
                <span
                  className={`px-2 py-1 border-2 border-black ${
                    formData.backlog_status
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {formData.backlog_status ? "HAS BACKLOGS" : "NO BACKLOGS"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Debug Information */}
        {/* <Card className="border-2 border-gray-400 rounded-none bg-gray-50"> */}
        {/* <CardHeader>
            <CardTitle className="font-bold text-sm uppercase">
              Debug Info
            </CardTitle>
          </CardHeader> */}
        {/* <CardContent>
            <p className="text-xs text-gray-600 font-mono">
              Backlog Status: {formData.backlog_status ? "true" : "false"}
            </p>
          </CardContent> */}
        {/* </Card> */}
        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-red-400 text-black border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 font-black uppercase text-lg px-12 py-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                SUBMITTING...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                CREATE PROFILE
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
