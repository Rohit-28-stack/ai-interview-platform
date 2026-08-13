import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "../../services/auth.service";
import { getDashboardData } from "../../services/interview.service";
const Profile = () => {
    const [dashboard, setDashboard] = useState({
    totalInterviews: 0,
    averageScore: 0,
    totalQuestions: 0,
    totalSubmissions: 0,
});
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [targetCompanies, setTargetCompanies] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const response = await getProfile();

            setProfile(response.data);

            setName(response.data.name || "");

            setSkills(
                response.data.skills?.join(", ") || ""
            );

            setTargetCompanies(
                response.data.targetCompanies?.join(", ") || ""
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateProfile = async () => {
        try {
            setSaving(true);

            const data = {
                name,
                skills: skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),

                targetCompanies: targetCompanies
                    .split(",")
                    .map((company) => company.trim())
                    .filter(Boolean),
            };

            const response = await updateProfile(data);

            setProfile(response.data);

            setEditing(false);

            toast.success("Profile updated successfully");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };
    const fetchDashboard = async () => {
    try {
        const response = await getDashboardData();

        setDashboard(response.data);
    } catch (error) {
        console.error("Failed to load dashboard stats", error);
    }
};

    useEffect(() => {
        fetchProfile();
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-slate-400 py-20">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-slate-400 py-20">
                Profile not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-bold text-white">
        My Profile
    </h1>

    {!editing && (
        <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
        >
            Edit Profile
        </button>
    )}
</div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">

                {/* Avatar */}

                <div className="flex items-center gap-5 mb-8">

                    <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-3xl font-bold text-white">
                        {profile.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            {profile.name}
                        </h2>

                        <p className="text-slate-400">
                            {profile.email}
                        </p>
                    </div>

                </div>
                {editing && (
    <div className="mt-8 border-t border-slate-700 pt-8">

        <h2 className="text-xl font-semibold text-white mb-6">
            Edit Profile
        </h2>

        <div className="space-y-5">

            {/* Name */}

            <div>
                <label className="block text-sm text-slate-400 mb-2">
                    Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                />
            </div>

            {/* Skills */}

            <div>
                <label className="block text-sm text-slate-400 mb-2">
                    Skills
                </label>

                <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Java, React, Node.js, SQL"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                />

                <p className="text-xs text-slate-500 mt-1">
                    Separate skills with commas
                </p>
            </div>

            {/* Target Companies */}

            <div>
                <label className="block text-sm text-slate-400 mb-2">
                    Target Companies
                </label>

                <input
                    type="text"
                    value={targetCompanies}
                    onChange={(e) =>
                        setTargetCompanies(e.target.value)
                    }
                    placeholder="TCS, Infosys, Accenture"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                />

                <p className="text-xs text-slate-500 mt-1">
                    Separate companies with commas
                </p>
            </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

            <button
                onClick={handleUpdateProfile}
                disabled={saving}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg"
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
                onClick={() => setEditing(false)}
                disabled={saving}
                className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
            >
                Cancel
            </button>

        </div>

    </div>
)}

                {/* Interview Statistics */}

                <div className="mt-8">
    <h2 className="text-xl font-semibold text-white mb-4">
        Interview Statistics
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-slate-900 rounded-lg p-5">
            <p className="text-sm text-slate-500">
                Total Interviews
            </p>

            <p className="text-2xl font-bold text-cyan-400 mt-2">
                {dashboard.totalInterviews}
            </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-5">
            <p className="text-sm text-slate-500">
                Average Score
            </p>

            <p className="text-2xl font-bold text-green-400 mt-2">
                {dashboard.averageScore}%
            </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-5">
            <p className="text-sm text-slate-500">
                Questions
            </p>

            <p className="text-2xl font-bold text-purple-400 mt-2">
                {dashboard.totalQuestions}
            </p>
        </div>

        <div className="bg-slate-900 rounded-lg p-5">
            <p className="text-sm text-slate-500">
                Submissions
            </p>

            <p className="text-2xl font-bold text-orange-400 mt-2">
                {dashboard.totalSubmissions||0}
            </p>
        </div>

    </div>
</div>
                {/* Skills */}

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {profile.skills?.length > 0 ? (
                            profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-slate-500">
                                No skills added yet.
                            </p>
                        )}

                    </div>
                </div>
                {/* Target Companies */}

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Target Companies
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {profile.targetCompanies?.length > 0 ? (
                            profile.targetCompanies.map((company, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
                                >
                                    {company}
                                </span>
                            ))
                        ) : (
                            <p className="text-slate-500">
                                No target companies added yet.
                            </p>
                        )}

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Profile;