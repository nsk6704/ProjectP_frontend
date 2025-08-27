"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Building2,
  Users,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Mail,
  Calendar,
  GraduationCap,
  Search,
  Eye,
  AlertCircle,
  Loader2,
  ArrowLeft,
  MapPin,
  Briefcase,
  Star,
  CheckX,
  X,
} from "lucide-react";

const API_URL = "https://24afbcb9663b.ngrok-free.app";

export default function SPCDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showStudents, setShowStudents] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [studentDetailsLoading, setStudentDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch students count
        const studentsResponse = await fetch(`${API_URL}/students/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData);
        }

        // Fetch companies count
        const companiesResponse = await fetch(`${API_URL}/companies/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (companiesResponse.ok) {
          const companiesData = await companiesResponse.json();
          setCompanies(companiesData);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // Silently fail for initial data fetch
      }
    };

    fetchInitialData();
  }, []);

  // Calculate placement statistics
  const placedStudents = students.filter(
    (student) => student.placement_status === true
  ).length;
  const placementRate =
    students.length > 0
      ? Math.round((placedStudents / students.length) * 100)
      : 0;

  // Fetch all students
  const fetchAllStudents = async () => {
    setStudentsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/students/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setStudents(data);
      setShowStudents(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error.message);
    } finally {
      setStudentsLoading(false);
    }
  };

  // Fetch all companies
  const fetchAllCompanies = async () => {
    setCompaniesLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/companies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCompanies(data);
      setShowCompanies(true);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError(error.message);
    } finally {
      setCompaniesLoading(false);
    }
  };

  // Fetch specific student by ID
  const fetchStudentById = async (studentId) => {
    setStudentDetailsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Student not found");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const student = await response.json();
      setSelectedStudent(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      setError(error.message);
    } finally {
      setStudentDetailsLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.usn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.college_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter(
    (company) =>
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.job_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If showing companies list
  if (showCompanies) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b-4 border-black dark:border-gray-400 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    setShowCompanies(false);
                    setSelectedCompany(null);
                    setError(null);
                    setSearchTerm("");
                  }}
                  className="bg-black text-white p-2 border-2 border-black hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                  <Building2 className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-black tracking-wider">
                  COMPANY MANAGEMENT
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="border-4 border-black dark:border-gray-400 bg-white dark:bg-gray-800 p-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="bg-purple-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[-1deg] mb-4">
              <h2 className="text-3xl font-black text-black">
                MANAGE COMPANIES
              </h2>
            </div>
            <p className="text-lg font-bold text-muted-foreground">
              View and manage visiting companies
            </p>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search companies by name, type, location, or job description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-4 border-black font-bold"
              />
            </div>

            {/* Error Display */}
            {error && (
              <Card className="border-4 border-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-bold text-red-800">
                        Error loading companies
                      </p>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {companiesLoading && (
              <Card className="border-4 border-black">
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="font-bold">Loading companies...</p>
                </CardContent>
              </Card>
            )}

            {/* Companies Grid */}
            {!companiesLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <Card
                    key={company.company_id}
                    className="border-4 border-black dark:border-gray-400 shadow-[6px_6px_0px_0px_black] dark:shadow-[6px_6px_0px_0px_#6b7280] hover:shadow-[3px_3px_0px_0px_black] dark:hover:shadow-[3px_3px_0px_0px_#6b7280] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 rounded-none"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-black text-white p-2 border-2 border-black">
                            <Building2 className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="font-black text-black uppercase text-sm">
                              {company.name}
                            </CardTitle>
                            <p className="text-xs font-bold text-gray-600">
                              {company.type}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            company.backlog_allowed
                              ? "bg-green-300 text-green-800"
                              : "bg-red-300 text-red-800"
                          } border-2 border-black font-black text-xs`}
                        >
                          {company.backlog_allowed ? "ALLOWS" : "NO"} BACKLOG
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <p className="text-xs font-bold">{company.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <p className="text-xs font-bold">
                          Min CGPA: {company.cgpa_required}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <p className="text-xs font-bold truncate">
                          {company.job_description}
                        </p>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompany(company);
                        }}
                        className="w-full bg-purple-500 text-white border-2 border-black font-black uppercase text-xs hover:bg-purple-600"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        VIEW DETAILS
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!companiesLoading && !error && filteredCompanies.length === 0 && (
              <Card className="border-4 border-black">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-bold text-gray-600">
                    {searchTerm
                      ? "No companies found matching your search"
                      : "No companies found"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Selected Company Details */}
            {selectedCompany && (
              <Card className="border-4 border-purple-500 bg-purple-50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-black uppercase">
                      Company Details
                    </CardTitle>
                    <Button
                      onClick={() => setSelectedCompany(null)}
                      className="bg-red-500 text-white border-2 border-black font-black text-xs"
                    >
                      CLOSE
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-black text-sm">COMPANY NAME:</p>
                      <p className="font-bold">{selectedCompany.name}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">COMPANY ID:</p>
                      <p className="font-bold">{selectedCompany.company_id}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">INDUSTRY TYPE:</p>
                      <p className="font-bold">{selectedCompany.type}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">LOCATION:</p>
                      <p className="font-bold">{selectedCompany.location}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">MIN CGPA REQUIRED:</p>
                      <p className="font-bold text-lg text-blue-600">
                        {selectedCompany.cgpa_required}
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">BACKLOG POLICY:</p>
                      <div className="flex items-center gap-2">
                        {selectedCompany.backlog_allowed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                        <Badge
                          className={`${
                            selectedCompany.backlog_allowed
                              ? "bg-green-300"
                              : "bg-red-300"
                          } border-2 border-black font-black`}
                        >
                          {selectedCompany.backlog_allowed
                            ? "BACKLOG ALLOWED"
                            : "NO BACKLOG ALLOWED"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-black text-sm mb-2">
                      ELIGIBLE BRANCHES:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.eligible_branches
                        .split(",")
                        .map((branch, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-300 border-2 border-black font-black"
                          >
                            DEPT {branch.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-black text-sm mb-2">JOB DESCRIPTION:</p>
                    <div className="bg-white border-4 border-black p-4">
                      <p className="font-bold">
                        {selectedCompany.job_description}
                      </p>
                    </div>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button className="bg-green-500 text-white border-2 border-black font-black text-xs flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      SCHEDULE VISIT
                    </Button>
                    <Button className="bg-blue-500 text-white border-2 border-black font-black text-xs flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      VIEW ELIGIBLE STUDENTS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    );
  }

  // If showing students list
  if (showStudents) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b-4 border-black dark:border-gray-400 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    setShowStudents(false);
                    setSelectedStudent(null);
                    setError(null);
                    setSearchTerm("");
                  }}
                  className="bg-black text-white p-2 border-2 border-black hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                  <Building2 className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-black tracking-wider">
                  STUDENT MANAGEMENT
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="border-4 border-black dark:border-gray-400 bg-white dark:bg-gray-800 p-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="bg-orange-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[-1deg] mb-4">
              <h2 className="text-3xl font-black text-black">
                MANAGE STUDENTS
              </h2>
            </div>
            <p className="text-lg font-bold text-muted-foreground">
              View and manage your department students
            </p>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students by name, USN, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-4 border-black font-bold"
              />
            </div>

            {/* Error Display */}
            {error && (
              <Card className="border-4 border-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-bold text-red-800">
                        Error loading students
                      </p>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {studentsLoading && (
              <Card className="border-4 border-black">
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="font-bold">Loading students...</p>
                </CardContent>
              </Card>
            )}

            {/* Students Grid */}
            {!studentsLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="border-4 border-black dark:border-gray-400 shadow-[6px_6px_0px_0px_black] dark:shadow-[6px_6px_0px_0px_#6b7280] hover:shadow-[3px_3px_0px_0px_black] dark:hover:shadow-[3px_3px_0px_0px_#6b7280] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 rounded-none"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-black text-white p-2 border-2 border-black">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="font-black text-black uppercase text-sm">
                              {student.name}
                            </CardTitle>
                            <p className="text-xs font-bold text-gray-600">
                              {student.usn}
                            </p>
                          </div>
                        </div>
                        {student.backlog_status && (
                          <Badge className="bg-red-300 text-red-800 border-2 border-black font-black text-xs">
                            BACKLOG
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <p className="text-xs font-bold truncate">
                          {student.college_email}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <p className="text-xs font-bold">
                          CGPA: {student.cgpa}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <p className="text-xs font-bold">
                          {new Date(student.dob).toLocaleDateString()}
                        </p>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchStudentById(student.id);
                        }}
                        disabled={studentDetailsLoading}
                        className="w-full bg-blue-500 text-white border-2 border-black font-black uppercase text-xs hover:bg-blue-600 disabled:opacity-50"
                      >
                        {studentDetailsLoading ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Eye className="h-3 w-3 mr-1" />
                        )}
                        VIEW DETAILS
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!studentsLoading && !error && filteredStudents.length === 0 && (
              <Card className="border-4 border-black">
                <CardContent className="p-8 text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-bold text-gray-600">
                    {searchTerm
                      ? "No students found matching your search"
                      : "No students found"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Selected Student Details */}
            {selectedStudent && (
              <Card className="border-4 border-blue-500 bg-blue-50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-black uppercase">
                      Student Details
                    </CardTitle>
                    <Button
                      onClick={() => setSelectedStudent(null)}
                      className="bg-red-500 text-white border-2 border-black font-black text-xs"
                    >
                      CLOSE
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-black text-sm">NAME:</p>
                      <p className="font-bold">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">USN:</p>
                      <p className="font-bold">{selectedStudent.usn}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">COLLEGE EMAIL:</p>
                      <p className="font-bold">
                        {selectedStudent.college_email}
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">PERSONAL EMAIL:</p>
                      <p className="font-bold">
                        {selectedStudent.personal_email}
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">DATE OF BIRTH:</p>
                      <p className="font-bold">
                        {new Date(selectedStudent.dob).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">CGPA:</p>
                      <p className="font-bold">{selectedStudent.cgpa}</p>
                    </div>
                    <div>
                      <p className="font-black text-sm">10TH MARKS:</p>
                      <p className="font-bold">
                        {selectedStudent.tenth_marks}%
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">12TH MARKS:</p>
                      <p className="font-bold">
                        {selectedStudent.twelfth_marks}%
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-sm">BACKLOG STATUS:</p>
                      <Badge
                        className={`${
                          selectedStudent.backlog_status
                            ? "bg-red-300"
                            : "bg-green-300"
                        } border-2 border-black font-black`}
                      >
                        {selectedStudent.backlog_status
                          ? "HAS BACKLOGS"
                          : "NO BACKLOGS"}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-black text-sm">DEPARTMENT ID:</p>
                      <p className="font-bold">
                        {selectedStudent.department_id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Default dashboard view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-gray-400 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-black dark:bg-gray-700 text-white p-2 border-2 border-black dark:border-gray-400">
                <Building2 className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-black tracking-wider">SPC PORTAL</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="border-4 border-black dark:border-gray-400 bg-white dark:bg-gray-800 p-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] inline-block px-6 py-3 rotate-[1deg] mb-4">
            <h2 className="text-3xl font-black text-black">SPC DASHBOARD</h2>
          </div>
          <p className="text-lg font-bold text-muted-foreground">
            Coordinate placements and manage your students effectively
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">
              {students.length}
            </div>
            <div className="font-black text-black uppercase">Students</div>
          </div>
          <div className="bg-yellow-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">
              {companies.length}
            </div>
            <div className="font-black text-black uppercase">Companies</div>
          </div>
          <div className="bg-green-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">
              {placedStudents}
            </div>
            <div className="font-black text-black uppercase">Placed</div>
          </div>
          <div className="bg-pink-300 border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] p-6 text-center">
            <div className="text-4xl font-black text-black">
              {placementRate}%
            </div>
            <div className="font-black text-black uppercase">Rate</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-orange-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Students
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Manage department students
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  fetchAllStudents();
                }}
                disabled={studentsLoading}
                className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm disabled:opacity-50"
              >
                {studentsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "MANAGE"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-purple-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Building2 className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Companies
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Track visiting companies
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  fetchAllCompanies();
                }}
                disabled={companiesLoading}
                className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm disabled:opacity-50"
              >
                {companiesLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "VIEW"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] bg-red-300 hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-2 border-2 border-black">
                  <Send className="h-5 w-5" />
                </div>
                <CardTitle className="font-black text-black uppercase">
                  Announce
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black font-bold mb-4 text-sm">
                Send messages to students
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add announce functionality here
                }}
                className="w-full bg-black text-white border-2 border-black font-black uppercase text-sm"
              >
                SEND
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-black">Student Placed</h4>
                      <p className="text-sm font-bold">John Doe - Google</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-blue-100">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-black">New Company Visit</h4>
                      <p className="text-sm font-bold">Amazon - Next Week</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-yellow-100">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h4 className="font-black">Announcement Sent</h4>
                      <p className="text-sm font-bold">
                        Interview Tips - 45 students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none">
            <CardHeader>
              <CardTitle className="font-black uppercase text-xl">
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-black bg-orange-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Verify Eligibility</h4>
                      <p className="text-sm font-bold">
                        12 students - Microsoft
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-500 text-white border-2 border-black font-black text-xs"
                    >
                      DO IT
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-2 border-black bg-pink-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black">Schedule Interview</h4>
                      <p className="text-sm font-bold">8 students - Apple</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-pink-500 text-white border-2 border-black font-black text-xs"
                    >
                      SCHEDULE
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
