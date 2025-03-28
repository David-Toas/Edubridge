/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BookOpen, Users, Layers, FileText } from "lucide-react";

// // Import components
// import type { Course, Module, Lesson, User, Enrollment } from "../../lib/types";
// import StatCard from "@/components/common/StatCard";
// import NotificationAlert from "@/components/common/NotificationAlert";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import CoursesTab from "@/components/tabs/CoursesTab";
// import ModulesTab from "@/components/tabs/ModulesTab";
// import LessonsTab from "@/components/tabs/LessonsTab";
// import EnrollmentsTab from "@/components/tabs/EnrollmentsTab";
// import UsersTab from "@/components/tabs/UsersTab";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("courses");
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [notification, setNotification] = useState({
//     show: false,
//     message: "",
//     type: "" as "success" | "error",
//   });

//   const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

//   const handleRoleChange = (userId: string, newRole: string) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
//     );
//   };

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   interface UpdateUserRoleParams {
//     userId: string;
//     newRole: string;
//   }

//   const updateUserRole = async (userId: string, newRole: string): Promise<void> => {
//     const token = localStorage.getItem("token");
//     const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

//     try {
//       await axios.put(
//         `${baseURL}/user/update/?id=${userId}`,
//         { role: newRole },
//         { headers: authHeader }
//       );

//       // Update local state
//       handleRoleChange(userId, newRole);
//       showNotification("User role updated successfully", "success");

//     } catch (err) {
//       console.error("Error updating user role:", err);
//       showNotification("Failed to update user role", "error");
//     }
//   };

//   const showNotification = (
//     message: string,
//     type: "success" | "error"
//   ): void => {
//     setNotification({
//       show: true,
//       message,
//       type,
//     });
//     setTimeout(() => {
//       setNotification({
//         show: false,
//         message: "",
//         type: "" as "success" | "error",
//       });
//     }, 3000);
//   };

//   const fetchData = async () => {
//     const token = localStorage.getItem("token");
//     const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
//     setLoading(true);

//     try {
//       const results = await Promise.allSettled([
//         axios.get(`${baseURL}/course/all`, { headers: authHeader }),
//         axios.get(`${baseURL}/module/all`, { headers: authHeader }),
//         axios.get(`${baseURL}/lesson/all`, { headers: authHeader }),
//         axios.get(`${baseURL}/user/all`, { headers: authHeader }),
//         axios.get(`${baseURL}/enrollment/all`, { headers: authHeader }),
//       ]);

//       // Process courses
//       if (results[0].status === "fulfilled" && results[0].value?.data?.data) {
//         setCourses(
//           Array.isArray(results[0].value.data.data)
//             ? results[0].value.data.data
//             : []
//         );
//       }

//       // Process modules
//       if (results[1].status === "fulfilled" && results[1].value?.data?.data) {
//         setModules(
//           Array.isArray(results[1].value.data.data)
//             ? results[1].value.data.data
//             : []
//         );
//       }

//       // Process lessons
//       if (results[2].status === "fulfilled" && results[2].value?.data?.data) {
//         setLessons(
//           Array.isArray(results[2].value.data.data)
//             ? results[2].value.data.data
//             : []
//         );
//       }

//       // Process users
//       if (results[3].status === "fulfilled" && results[3].value?.data?.data) {
//         setUsers(
//           Array.isArray(results[3].value.data.data)
//             ? results[3].value.data.data.map(
//                 (user: any): User => ({
//                   ...user,
//                   role: user.role || "Student", // Default role
//                 })
//               )
//             : []
//         );
//       }

//       // Process enrollments
//       if (results[4].status === "fulfilled" && results[4].value?.data?.data) {
//         setEnrollments(
//           Array.isArray(results[4].value.data.data)
//             ? results[4].value.data.data
//             : []
//         );
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to fetch data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <p className="text-center text-red-500 mt-10">{error}</p>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//         <p className="text-gray-600">
//           Manage courses, modules, lessons and enrollments
//         </p>
//       </div>

//       {/* Notification */}
//       <NotificationAlert
//         show={notification.show}
//         message={notification.message}
//         type={notification.type}
//       />

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//         <StatCard
//           title="Courses"
//           value={courses.length}
//           icon={BookOpen}
//           color="bg-blue-500"
//         />
//         <StatCard
//           title="Modules"
//           value={modules.length}
//           icon={Layers}
//           color="bg-green-500"
//         />
//         <StatCard
//           title="Lessons"
//           value={lessons.length}
//           icon={FileText}
//           color="bg-purple-500"
//         />
//         <StatCard
//           title="Users"
//           value={users.length}
//           icon={Users}
//           color="bg-orange-500"
//         />
//       </div>

//       {/* Tabs */}
//       <div className="mt-8 bg-white p-4 rounded-lg shadow">
//         <div className="border-b border-gray-200">
//           <nav className="flex -mb-px space-x-8">
//             <button
//               onClick={() => setActiveTab("courses")}
//               className={`py-4 px-1 ${
//                 activeTab === "courses"
//                   ? "border-b-2 border-blue-500 text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Courses
//             </button>
//             <button
//               onClick={() => setActiveTab("modules")}
//               className={`py-4 px-1 ${
//                 activeTab === "modules"
//                   ? "border-b-2 border-blue-500 text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Modules
//             </button>
//             <button
//               onClick={() => setActiveTab("lessons")}
//               className={`py-4 px-1 ${
//                 activeTab === "lessons"
//                   ? "border-b-2 border-blue-500 text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Lessons
//             </button>
//             <button
//               onClick={() => setActiveTab("enrollments")}
//               className={`py-4 px-1 ${
//                 activeTab === "enrollments"
//                   ? "border-b-2 border-blue-500 text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Enrollments
//             </button>
//             <button
//               onClick={() => setActiveTab("users")}
//               className={`py-4 px-1 ${
//                 activeTab === "users"
//                   ? "border-b-2 border-blue-500 text-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Users
//             </button>
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-6">
//           {activeTab === "courses" && (
//             <CoursesTab
//               courses={courses}
//               fetchData={fetchData}
//               showNotification={showNotification}
//               baseURL={baseURL}
//             />
//           )}
//           {activeTab === "modules" && (
//             <ModulesTab
//               modules={modules}
//               courses={courses}
//               fetchData={fetchData}
//               showNotification={showNotification}
//               baseURL={baseURL}
//             />
//           )}
//           {activeTab === "lessons" && (
//             <LessonsTab
//               lessons={lessons}
//               modules={modules}
//               courses={courses}
//               fetchData={fetchData}
//               showNotification={showNotification}
//               baseURL={baseURL}
//             />
//           )}
//           {activeTab === "enrollments" && (
//             <EnrollmentsTab
//               enrollments={enrollments}
//               users={users}
//               courses={courses}
//               fetchData={fetchData}
//               showNotification={showNotification}
//               baseURL={baseURL}
//             />
//           )}
//           {activeTab === "users" && (
//             <UsersTab
//               users={users}
//               updateUserRole={updateUserRole}
//               handleRoleChange={handleRoleChange}
//               fetchData={fetchData}
//               showNotification={showNotification}
//               baseURL={baseURL}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Users, Layers, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

// Import components
import type { Course, Module, Lesson, User, Enrollment } from "../../lib/types";
import StatCard from "@/components/common/StatCard";
import NotificationAlert from "@/components/common/NotificationAlert";
import CoursesTab from "@/components/tabs/CoursesTab";
import ModulesTab from "@/components/tabs/ModulesTab";
import LessonsTab from "@/components/tabs/LessonsTab";
import EnrollmentsTab from "@/components/tabs/EnrollmentsTab";
import UsersTab from "@/components/tabs/UsersTab";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "" as "success" | "error",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  // delete user
  const deleteUser = async (userId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.delete(`${baseURL}/user/delete/${userId}`, {
        headers: authHeader,
      });

      // Update local state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      showNotification("User deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting user:", err);
      showNotification(
        err instanceof Error ? err.message : "Failed to delete user",
        "error"
      );
    }
  };

  // Check user role on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      // No token, redirect to login
      router.push("/login");
      return;
    }

    if (userRole !== "admin") {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    setIsAdmin(true);
    fetchData();
  }, [router]);
  // role change
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };
  // update users role
  const updateUserRole = async (
    userId: string,
    newRole: string
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const userToUpdate = users.find((user) => user.id === userId);
      if (!userToUpdate) {
        throw new Error("User not found");
      }
      await axios.put(
        `${baseURL}/user/update/?id=${userId}`,
        {
          ...userToUpdate,
          role: newRole,
        },
        { headers: authHeader }
      );

      // Update local state
      handleRoleChange(userId, newRole);
      showNotification("User role updated successfully", "success");
    } catch (err) {
      console.error("Error updating user role:", err);
      showNotification(
        err instanceof Error ? err.message : "Failed to update user role",
        "error"
      );
    }
  };

  // show notifications
  const showNotification = (
    message: string,
    type: "success" | "error"
  ): void => {
    setNotification({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: "" as "success" | "error",
      });
    }, 3000);
  };
  // fetch data from api
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(`${baseURL}/course/all`, { headers: authHeader }),
        axios.get(`${baseURL}/module/all`, { headers: authHeader }),
        axios.get(`${baseURL}/lesson/all`, { headers: authHeader }),
        axios.get(`${baseURL}/user/all`, { headers: authHeader }),
        axios.get(`${baseURL}/enrollment/all`, { headers: authHeader }),
      ]);

      // Process courses
      if (results[0].status === "fulfilled" && results[0].value?.data?.data) {
        setCourses(
          Array.isArray(results[0].value.data.data)
            ? results[0].value.data.data
            : []
        );
      }

      // Process modules
      if (results[1].status === "fulfilled" && results[1].value?.data?.data) {
        setModules(
          Array.isArray(results[1].value.data.data)
            ? results[1].value.data.data
            : []
        );
      }

      // Process lessons
      if (results[2].status === "fulfilled" && results[2].value?.data?.data) {
        setLessons(
          Array.isArray(results[2].value.data.data)
            ? results[2].value.data.data
            : []
        );
      }

      // Process users
      if (results[3].status === "fulfilled" && results[3].value?.data?.data) {
        setUsers(
          Array.isArray(results[3].value.data.data)
            ? results[3].value.data.data.map(
                (user: any): User => ({
                  ...user,
                  role: user.role || "Student", // Default role
                })
              )
            : []
        );
      }

      // Process enrollments
      if (results[4].status === "fulfilled" && results[4].value?.data?.data) {
        setEnrollments(
          Array.isArray(results[4].value.data.data)
            ? results[4].value.data.data
            : []
        );
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-pulse w-16 h-16 bg-purple-500 rounded-full"></div>
          <p className="text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700 mb-6">
            You don&rsquo;t have permission to access this page. Only
            administrators can view the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage courses, modules, lessons and enrollments
        </p>
      </div>

      {/* Notification */}
      <NotificationAlert
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Modules"
          value={modules.length}
          icon={Layers}
          color="bg-green-500"
        />
        <StatCard
          title="Lessons"
          value={lessons.length}
          icon={FileText}
          color="bg-purple-500"
        />
        <StatCard
          title="Users"
          value={users.length}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab("courses")}
              className={`py-4 px-1 ${
                activeTab === "courses"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`py-4 px-1 ${
                activeTab === "modules"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Modules
            </button>
            <button
              onClick={() => setActiveTab("lessons")}
              className={`py-4 px-1 ${
                activeTab === "lessons"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Lessons
            </button>
            <button
              onClick={() => setActiveTab("enrollments")}
              className={`py-4 px-1 ${
                activeTab === "enrollments"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Enrollments
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 ${
                activeTab === "users"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Users
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "courses" && (
            <CoursesTab
              courses={courses}
              fetchData={fetchData}
              showNotification={showNotification}
              baseURL={baseURL}
            />
          )}
          {activeTab === "modules" && (
            <ModulesTab
              modules={modules}
              courses={courses}
              fetchData={fetchData}
              showNotification={showNotification}
              baseURL={baseURL}
            />
          )}
          {activeTab === "lessons" && (
            <LessonsTab
              lessons={lessons}
              modules={modules}
              courses={courses}
              fetchData={fetchData}
              showNotification={showNotification}
              baseURL={baseURL}
            />
          )}
          {activeTab === "enrollments" && (
            <EnrollmentsTab
              enrollments={enrollments}
              users={users}
              courses={courses}
              fetchData={fetchData}
              showNotification={showNotification}
              baseURL={baseURL}
            />
          )}
          {activeTab === "users" && (
            <UsersTab
              users={users}
              updateUserRole={updateUserRole}
              handleRoleChange={handleRoleChange}
              fetchData={fetchData}
              showNotification={showNotification}
              baseURL={baseURL}
              deleteUser={deleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
