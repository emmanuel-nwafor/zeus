import React, { useRef, useState } from 'react';

'use client';


const defaultProfile = '/default-profile.png'; // Replace with your default image path

export default function SettingsPage() {
    const [profileImage, setProfileImage] = useState<string>(defaultProfile);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement update logic (API call)
        alert('Profile updated!');
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center">
                    <div
                        className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                        onClick={handleImageClick}
                        title="Change profile image"
                    >
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <span className="text-sm text-gray-500 mt-2">Click image to change</span>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>
                {/* Add more settings fields here as needed */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}