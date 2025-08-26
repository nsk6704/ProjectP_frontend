const API_BASE_URL = "https://4557b9959d2b.ngrok-free.app";

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true", // Required for ngrok
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${errorData.detail || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Student API functions
export const studentAPI = {
  create: (studentData) =>
    apiRequest("/students/", {
      method: "POST",
      body: JSON.stringify(studentData),
    }),

  getAll: () => apiRequest("/students/"),

  getById: (studentId) => apiRequest(`/students/${studentId}`),

  update: (studentId, studentData) =>
    apiRequest(`/students/${studentId}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    }),

  delete: (studentId) =>
    apiRequest(`/students/${studentId}`, {
      method: "DELETE",
    }),
};

// Department API functions
export const departmentAPI = {
  getAll: () => apiRequest("/departments/"),

  create: (departmentData) =>
    apiRequest("/departments/", {
      method: "POST",
      body: JSON.stringify(departmentData),
    }),
};

// Company API functions
export const companyAPI = {
  getAll: () => apiRequest("/companies/"),

  getById: (companyId) => apiRequest(`/companies/${companyId}`),

  create: (companyData) =>
    apiRequest("/companies/", {
      method: "POST",
      body: JSON.stringify(companyData),
    }),
};

// Application API functions
export const applicationAPI = {
  getAll: () => apiRequest("/applications/"),

  getByStudentId: (studentId) =>
    apiRequest(`/applications/student/${studentId}`),

  create: (applicationData) =>
    apiRequest("/applications/", {
      method: "POST",
      body: JSON.stringify(applicationData),
    }),

  updateStatus: (applicationId, status) =>
    apiRequest(`/applications/${applicationId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};
